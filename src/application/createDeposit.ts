import { createDeposit, Deposit } from '../domain/deposit';
import { Expense } from '../domain/expense';
import { User } from '../domain/user';
import { useUuidGenerator } from '../services/uuidGenerator';
import { useStorage, Collections } from '../services/firebaseAdapter';

export function useCreateDeposit() {
  function newDeposit(members: User[], expenses: Expense[], title: string) {
    try {
      const uuidGenerator = useUuidGenerator();
      const id = uuidGenerator.generateUuid();
      const deposit = createDeposit(members, expenses, id, title);
      const { createDocument } = useStorage();
      createDocument(deposit, Collections.DEPOSITS);
    } catch (err) {
      console.log('ERROR createDeposit', err);
    }
  }
  return { newDeposit };
}
