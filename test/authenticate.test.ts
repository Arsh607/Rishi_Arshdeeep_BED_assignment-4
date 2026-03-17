import { Request, Response, NextFunction } from "express";
import { authenticate } from "../src/api/v1/middleware/authenticate";
import { auth } from "../src/config/firebaseConfig";

jest.mock("../src/config/firebaseConfig", () => ({
    auth: {
        verifyIdToken: jest.fn(),
    },
}));

describe("authenticate middleware", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            headers: {},
        };

        res = {
            locals: {},
        };

        next = jest.fn();
        jest.clearAllMocks();
    });

    it("should return TOKEN_NOT_FOUND when Authorization header is missing", async () => {
        // Arrange
        req.headers = {};

        // Act
        await authenticate(req as Request, res as Response, next);

        // Assert
        expect(next).toHaveBeenCalledWith(
            expect.objectContaining({
                message: "Unauthorized: No token provided",
                code: "TOKEN_NOT_FOUND",
                statusCode: 401,
            })
        );
        expect(auth.verifyIdToken).not.toHaveBeenCalled();
    });

    it("should return TOKEN_NOT_FOUND when Bearer token is empty", async () => {
        // Arrange
        req.headers = {
            authorization: "Bearer ",
        };

        // Act
        await authenticate(req as Request, res as Response, next);

        // Assert
        expect(next).toHaveBeenCalledWith(
            expect.objectContaining({
                message: "Unauthorized: No token provided",
                code: "TOKEN_NOT_FOUND",
                statusCode: 401,
            })
        );
        expect(auth.verifyIdToken).not.toHaveBeenCalled();
    });

    it("should return TOKEN_INVALID when token verification fails", async () => {
        // Arrange
        req.headers = {
            authorization: "Bearer invalid-token",
        };

        (auth.verifyIdToken as jest.Mock).mockRejectedValue(
            new Error("firebase error")
        );

        // Act
        await authenticate(req as Request, res as Response, next);

        // Assert
        expect(auth.verifyIdToken).toHaveBeenCalledWith("invalid-token");
        expect(next).toHaveBeenCalledWith(
            expect.objectContaining({
                message: "Unauthorized: Invalid token",
                code: "TOKEN_INVALID",
                statusCode: 401,
            })
        );
    });

    it("should store uid and role in res.locals when token is valid", async () => {
        // Arrange
        req.headers = {
            authorization: "Bearer valid-token",
        };

        (auth.verifyIdToken as jest.Mock).mockResolvedValue({
            uid: "user-123",
            role: "admin",
        });

        // Act
        await authenticate(req as Request, res as Response, next);

        // Assert
        expect(auth.verifyIdToken).toHaveBeenCalledWith("valid-token");
        expect(res.locals?.uid).toBe("user-123");
        expect(res.locals?.role).toBe("admin");
        expect(next).toHaveBeenCalledWith();
    });
});