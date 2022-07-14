import { useStorage } from '../services/firebaseAdapter';

export function useGetDeposit() {
  async function getDeposit(id: string) {
    try {
      const { getDepositById } = useStorage();
      const deposit = await getDepositById(id);
      return deposit;
    } catch (err) {
      console.error('ERROR getDeposit by ID', err);
    }
  }

  return { getDeposit };
}
