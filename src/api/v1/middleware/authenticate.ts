import {auth} from '../../../config/firebaseConfig';
import { Response, Request, NextFunction } from 'express';
import { HTTP_STATUS } from '../../../constants/httpConstants';
import { AuthenticationError } from "../errors/errors";
import { getErrorMessage, getErrorCode } from "../utils/errorUtils";



export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new AuthenticationError(
                "Unauthorized: No token provided",
                "TOKEN_NOT_FOUND"
            );
        }

        if (!authHeader.startsWith("Bearer ")) {
            throw new AuthenticationError(
                "Unauthorized: Invalid token format",
                "TOKEN_INVALID"
            );
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            throw new AuthenticationError(
                "Unauthorized: No token provided",
                "TOKEN_NOT_FOUND"
            );
        }

        const decodedToken = await auth.verifyIdToken(token);

        res.locals.uid = decodedToken.uid;
        res.locals.role = (decodedToken as any).role;

        next();
    } catch (error: unknown) {
        if (error instanceof AuthenticationError) {
            next(error);
            return;
        }

        if (error instanceof Error) {
            next(
                new AuthenticationError(
                    "Unauthorized: Invalid token",
                    "TOKEN_INVALID" 
                )
            );
            return;
        }

        next(
            new AuthenticationError(
                "Unauthorized: Invalid token",
                "TOKEN_INVALID"
            )
        );
    }
};