import { Deposit } from '../domain/deposit';
import { User } from '../domain/user';
import { useStorage } from '../services/firebaseAdapter';
import { Collections } from '../services/firebaseAdapter';

export function useGetDeposits() {
  async function getDeposits(user: User) {
    try {
      const { getDocuments } = useStorage();
      const deposits = await getDocuments<Deposit>(user, Collections.DEPOSITS);
      return deposits;
    } catch (err) {
      console.log('ERROR getDeposits', err);
    }
  }

  return { getDeposits };
}
