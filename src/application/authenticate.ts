import { useAuth } from '../services/firebaseAdapter';

export function useAuthenticate() {
  async function login(email: string, password: string) {
    try {
      const { login } = useAuth();
      const user = await login(email, password);
      return user;
    } catch (err) {
      console.log('ERROR login user', err);
    }
  }
  return { login };
}
