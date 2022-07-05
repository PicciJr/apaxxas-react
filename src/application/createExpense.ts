import { createExpense } from '../domain/expense';
import { useUuidGenerator } from '../services/uuidGenerator';
import { useStorage, Collections } from '../services/firebaseAdapter';

export function useCreateExpense() {
  async function newExpense({ total, debtors, payer, isSettled, subject }) {
    try {
      const uuidGenerator = useUuidGenerator();
      const id = uuidGenerator.generateUuid();
      const expense = createExpense(
        id,
        total,
        debtors,
        payer,
        isSettled,
        subject
      );
      const { createDocument } = useStorage();
      await createDocument(expense, expense.id, Collections.EXPENSES);
      return expense;
    } catch (err) {
      console.log('ERROR createExpense', err);
    }
  }
  return { newExpense };
}
