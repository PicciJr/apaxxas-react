import { useStorage } from '../services/firebaseAdapter';

export function useGetUsers() {
  async function getUsers() {
    try {
      const { findUsers } = useStorage();
      const users = await findUsers();
      return users;
    } catch (err) {
      console.log('ERROR getUsers', err);
    }
  }

  return { getUsers };
}
