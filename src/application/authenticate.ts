import { useAuth } from '../services/firebaseAdapter';

export function useAuthenticate() {
  async function login(email: string, password: string) {
    try {
      const { login } = useAuth();
      const user = await login(email, password);
      // TODO: create cookie
      return user;
    } catch (err) {
      console.log('ERROR login user', err);
    }
  }
  async function googleLogin() {
    try {
      const { googleSignIn } = useAuth();
      const user = await googleSignIn();
      // TODO: create cookie
      return user;
    } catch (err) {
      console.log('ERROR google login', err);
    }
  }
  return { login, googleLogin };
}
