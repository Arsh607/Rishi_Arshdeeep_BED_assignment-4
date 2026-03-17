import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as loanService from '../services/loanService';

export const getAllLoans = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const allLoans = await loanService.getAllLoans();

        res.status(HTTP_STATUS.OK).json({
            message: "Loan applications retrieved",
            count: allLoans.length,
            data: allLoans,
        });
    } catch (error) {
        next(error);
    }
};

export const getById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const loan = await loanService.getLoanById(id);

        res.status(HTTP_STATUS.OK).json({
            message: "Loan application retrieved",
            data: loan,
        });
    } catch (error) {
        next(error);
    }
};

export const createLoan = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { applicant, amount } = req.body;
        const newLoan = await loanService.createLoan({ applicant, amount });

        res.status(HTTP_STATUS.CREATED).json({
            message: "Loan application created",
            data: newLoan,
        });
    } catch (error) {
        next(error);
    }
};

export const updateLoan = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const updatedLoan = await loanService.updateLoan(id, req.body);

        res.status(HTTP_STATUS.OK).json({
            message: "Loan application updated",
            data: updatedLoan,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteLoan = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const deletedLoan = await loanService.deleteLoan(id);

        res.status(HTTP_STATUS.OK).json({
            message: "Loan application deleted",
            data: deletedLoan,
        });
    } catch (error) {
        next(error);
    }
};