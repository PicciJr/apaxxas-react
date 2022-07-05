import { createDeposit, Deposit } from '../domain/deposit';
import { Expense } from '../domain/expense';
import { User } from '../domain/user';
import { useUuidGenerator } from '../services/uuidGenerator';
import { useStorage, Collections } from '../services/firebaseAdapter';

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
      const { createDocument } = useStorage();
      await createDocument(deposit, deposit.title, Collections.DEPOSITS);
    } catch (err) {
      console.log('ERROR createDeposit', err);
    }
  }
  return { newDeposit };
}
