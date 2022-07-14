import { Deposit } from '../domain/deposit';
import { useStorage } from '../services/firebaseAdapter';

export function useUpdateDeposit() {
  async function updateDeposit(deposit: Deposit) {
    try {
      const { updateDeposit } = useStorage();
      await updateDeposit(deposit);
    } catch (err) {
      console.error('ERROR updateDeposit', err);
    }
  }
  return { updateDeposit };
}
