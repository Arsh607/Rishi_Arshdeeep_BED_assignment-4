import { Loan } from "../models/loanModel";

export const loans: Loan[] = [
    {
        id: 1,
        applicant: 'John Smith',
        amount: 50000,
        status: 'pending',
        createdAt: '2025-01-10T10:00:00.000Z'
    },
    {
        id: 2,
        applicant: 'Sarah Johnson',
        amount: 150000,
        status: 'under_review',
        createdAt: '2025-01-08T10:00:00.000Z'
    },
    {
        id: 3,
        applicant: 'Michael Chen',
        amount: 500000,
        status: 'pending',
        createdAt: '025-01-05T10:00:00.000Z'
    },
    {
        id: 4,
        applicant: 'Emily Williams',
        amount: 1000000,
        status: 'flagged',
        createdAt: '2025-01-03T10:00:00.000Z'
    }
]