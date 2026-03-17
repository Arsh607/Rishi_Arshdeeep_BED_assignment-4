import { Loan } from "../models/loanModel";
import { ServiceError } from "../errors/errors";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import {
    getAllLoansFromDB,
    getLoanByIdFromDB,
    getNextLoanIdFromDB,
    createLoanInDB,
    updateLoanInDB,
    deleteLoanFromDB,
} from "../repositories/loanRepository";

interface CreateLoanInput {
    applicant: string;
    amount: number;
}

interface UpdateLoanInput {
    applicant?: string;
    amount?: number;
    status?: string;
}

export const getAllLoans = async (): Promise<Loan[]> => {
    return await getAllLoansFromDB();
};

export const getLoanById = async (id: number): Promise<Loan> => {
    const foundLoan = await getLoanByIdFromDB(id);

    if (!foundLoan) {
        throw new ServiceError(
            "Loan application not found",
            "LOAN_NOT_FOUND",
            HTTP_STATUS.NOT_FOUND
        );
    }

    return foundLoan;
};

export const createLoan = async (data: CreateLoanInput): Promise<Loan> => {
    const { applicant, amount } = data;

    if (!applicant || amount === undefined) {
        throw new ServiceError(
            "Applicant and amount are required",
            "INVALID_LOAN_DATA",
            HTTP_STATUS.BAD_REQUEST
        );
    }

    const nextId = await getNextLoanIdFromDB();

    const newLoan: Loan = {
        id: nextId,
        applicant,
        amount,
        status: "pending",
        createdAt: new Date().toISOString(),
    };

    return await createLoanInDB(newLoan);
};

export const updateLoan = async (
    id: number,
    data: UpdateLoanInput
): Promise<Loan> => {
    const updatedLoan = await updateLoanInDB(id, data);

    if (!updatedLoan) {
        throw new ServiceError(
            "Loan application not found",
            "LOAN_NOT_FOUND",
            HTTP_STATUS.NOT_FOUND
        );
    }

    return updatedLoan;
};

export const deleteLoan = async (id: number): Promise<Loan> => {
    const deletedLoan = await deleteLoanFromDB(id);

    if (!deletedLoan) {
        throw new ServiceError(
            "Loan application not found",
            "LOAN_NOT_FOUND",
            HTTP_STATUS.NOT_FOUND
        );
    }

    return deletedLoan;
};