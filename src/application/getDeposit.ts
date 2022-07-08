import { useStorage } from '../services/firebaseAdapter';

export function useGetDeposit() {
  async function getDeposit(id: string) {
    try {
      const { getDepositById } = useStorage();
      const deposit = await getDepositById(id);
      return deposit;
    } catch (err) {
      console.log('ERROR getDeposit by ID', err);
    }
  }

  return { getDeposit };
}
