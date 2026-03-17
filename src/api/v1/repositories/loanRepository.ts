import { db } from "../../../config/firebaseConfig";
import { Loan } from "../models/loanModel";

const LOANS_COLLECTION = "loans";
const COUNTERS_COLLECTION = "counters";
const LOANS_COUNTER_DOC = "loans";

export const getAllLoansFromDB = async (): Promise<Loan[]> => {
    const snapshot = await db
        .collection(LOANS_COLLECTION)
        .orderBy("id")
        .get();

    return snapshot.docs.map((doc) => doc.data() as Loan);
};

export const getLoanByIdFromDB = async (id: number): Promise<Loan | null> => {
    const doc = await db.collection(LOANS_COLLECTION).doc(String(id)).get();

    if (!doc.exists) {
        return null;
    }

    return doc.data() as Loan;
};

export const getNextLoanIdFromDB = async (): Promise<number> => {
    const counterRef = db
        .collection(COUNTERS_COLLECTION)
        .doc(LOANS_COUNTER_DOC);

    const nextId = await db.runTransaction(async (transaction) => {
        const counterDoc = await transaction.get(counterRef);

        if (!counterDoc.exists) {
            transaction.set(counterRef, { currentId: 1 });
            return 1;
        }

        const currentId = counterDoc.data()?.currentId || 0;
        const newId = currentId + 1;

        transaction.update(counterRef, { currentId: newId });

        return newId;
    });

    return nextId;
};

export const createLoanInDB = async (loan: Loan): Promise<Loan> => {
    await db
        .collection(LOANS_COLLECTION)
        .doc(String(loan.id))
        .set(loan);

    return loan;
};

export const updateLoanInDB = async (
    id: number,
    data: Partial<Loan>
): Promise<Loan | null> => {
    const docRef = db.collection(LOANS_COLLECTION).doc(String(id));
    const doc = await docRef.get();

    if (!doc.exists) {
        return null;
    }

    const existingLoan = doc.data() as Loan;

    const updatedLoan: Loan = {
        ...existingLoan,
        ...data,
        id: existingLoan.id,
        createdAt: existingLoan.createdAt,
    };

    await docRef.set(updatedLoan);

    return updatedLoan;
};

export const deleteLoanFromDB = async (id: number): Promise<Loan | null> => {
    const docRef = db.collection(LOANS_COLLECTION).doc(String(id));
    const doc = await docRef.get();

    if (!doc.exists) {
        return null;
    }

    const deletedLoan = doc.data() as Loan;

    await docRef.delete();

    return deletedLoan;
};