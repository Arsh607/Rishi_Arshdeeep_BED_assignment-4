export type LoanStatus = "pending" | "under_review" | "flagged" | "approved";

export interface Loan {
    id: number;
    applicant: string;
    amount: number;
    status: LoanStatus;
    createdAt: string;
}