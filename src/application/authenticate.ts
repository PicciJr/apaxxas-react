import { useAuth } from '../services/firebaseAdapter';

export function useAuthenticate() {
  async function login(email: string, password: string) {
    try {
      const { login } = useAuth();
      const user = await login(email, password);
      return user;
    } catch (err) {
      console.error('ERROR login user', err);
    }
  }
  async function googleLogin() {
    try {
      const { googleSignIn } = useAuth();
      const user = await googleSignIn();
      return user;
    } catch (err) {
      console.error('ERROR google login', err);
    }
  }
  return { login, googleLogin };
}
