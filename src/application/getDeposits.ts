import { Deposit } from '../domain/deposit';
import { User } from '../domain/user';
import { useStorage } from '../services/firebaseAdapter';

export function useGetDeposits() {
  async function getDeposits(user: User) {
    try {
      const { getDepositsByUser } = useStorage();
      const deposits = await getDepositsByUser(user);
      return deposits;
    } catch (err) {
      console.error('ERROR getDeposits', err);
    }
  }

  return { getDeposits };
}
