import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { ServiceError } from "../errors/errors";

export const signIn = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new ServiceError(
                "Email and password are required",
                "INVALID_CREDENTIALS_INPUT",
                HTTP_STATUS.BAD_REQUEST
            );
        }

        const apiKey = 'AIzaSyAJMoUlfy5JqzwDwDvwSDAB7Q0ni2lU0Xs';

        if (!apiKey) {
            throw new ServiceError(
                "Firebase Web API key is missing",
                "MISSING_FIREBASE_API_KEY",
                HTTP_STATUS.INTERNAL_SERVER_ERROR
            );
        }

        const firebaseResponse = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true,
                }),
            }
        );

        const data = await firebaseResponse.json();

        if (!firebaseResponse.ok) {
            throw new ServiceError(
                "Invalid email or password",
                "SIGN_IN_FAILED",
                HTTP_STATUS.UNAUTHORIZED
            );
        }

        res.status(HTTP_STATUS.OK).json({
            message: "Sign in successful",
            data: {
                idToken: data.idToken,
                email: data.email,
                localId: data.localId,
                expiresIn: data.expiresIn,
                refreshToken: data.refreshToken
            },
        });
    } catch (error) {
        next(error);
    }
};