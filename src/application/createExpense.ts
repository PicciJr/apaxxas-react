import { createExpense } from '../domain/expense';
import { useUuidGenerator } from '../services/uuidGenerator';
import { useStorage } from '../services/firebaseAdapter';

export function useCreateExpense() {
  async function newExpense({ total, debtors, payer, isSettled, subject }) {
    try {
      const uuidGenerator = useUuidGenerator();
      const id = uuidGenerator.generateUuid();
      const expense = createExpense(
        id,
        Number(total),
        debtors,
        payer,
        isSettled,
        subject,
        false, // TODO: dinamizar
        Date.now()
      );
      const { insertExpense } = useStorage();
      await insertExpense(expense);
      return expense;
    } catch (err) {
      console.error('ERROR createExpense', err);
    }
  }
  return { newExpense };
}
