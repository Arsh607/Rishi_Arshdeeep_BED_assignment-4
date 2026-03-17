import { Request, Response, NextFunction } from "express";
import { AuthorizationError } from "../errors/errors";

interface AuthorizeOptions {
    hasRole: string[];
}

export const isAuthorized =
    ({ hasRole }: AuthorizeOptions) =>
    (req: Request, res: Response, next: NextFunction): void => {
        const userRole = res.locals.role;

        if (!userRole) {
            next(
                new AuthorizationError(
                    "Forbidden: No role found",
                    "ROLE_NOT_FOUND"
                )
            );
            return;
        }

        if (!hasRole.includes(userRole)) {
            next(
                new AuthorizationError(
                    "Forbidden: Insufficient role",
                    "INSUFFICIENT_ROLE"
                )
            );
            return;
        }

        next();
    };

