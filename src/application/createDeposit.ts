import { createDeposit, Deposit } from '../domain/deposit';
import { Expense } from '../domain/expense';
import { User } from '../domain/user';
import { useUuidGenerator } from '../services/uuidGenerator';
import { useStorage } from '../services/firebaseAdapter';

export function useCreateDeposit() {
  async function newDeposit(
    members: User[],
    expenses: Expense[],
    title: string
  ) {
    try {
      const uuidGenerator = useUuidGenerator();
      const id = uuidGenerator.generateUuid();
      const deposit = createDeposit(members, expenses, id, title);
      const { insertDeposit } = useStorage();
      await insertDeposit(deposit);
    } catch (err) {
      console.log('ERROR createDeposit', err);
    }
  }
  return { newDeposit };
}
