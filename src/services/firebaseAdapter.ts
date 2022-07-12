import { AuthService, StorageService } from '../application/ports';
import { Deposit } from '../domain/deposit';
import { User } from '../domain/user';
import { Expense } from '../domain/expense';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
  getDoc,
  query,
  where,
} from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAXYIZc9Hc3ObbvsLdZzBZPLxuTnuF3Vnc',
  authDomain: 'apaxxas-v2.firebaseapp.com',
  projectId: 'apaxxas-v2',
  storageBucket: 'apaxxas-v2.appspot.com',
  messagingSenderId: '934835627511',
  appId: '1:934835627511:web:99f58cac72c1522ce5faf2',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Firebase collections
export enum Collections {
  DEPOSITS = 'deposits',
  USERS = 'users',
  EXPENSES = 'expenses',
}

export function useStorage(): StorageService {
  return {
    async insertDeposit(deposit: Deposit) {
      await setDoc(doc(db, Collections.DEPOSITS, deposit.title), deposit);
    },
    async getDepositById(id: string): Promise<Deposit> {
      const q = query(
        collection(db, Collections.DEPOSITS),
        where('id', '==', id)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs[0].data() as Deposit;
    },
    async getDepositsByUser(user: User): Promise<Deposit[]> {
      const q = query(
        collection(db, Collections.DEPOSITS),
        where('members', 'array-contains', user)
      );
      const querySnapshot = await getDocs(q);
      const docs = Array<Deposit>();
      querySnapshot.forEach((doc) => {
        docs.push(doc.data() as Deposit);
      });
      return docs;
    },
    async updateDeposit(deposit: Deposit) {
      await setDoc(doc(db, Collections.DEPOSITS, deposit.title), {
        ...deposit,
      });
    },
    async insertExpense(expense: Expense) {
      await setDoc(doc(db, Collections.EXPENSES, expense.id), expense);
    },
    async findUsers() {
      const querySnapshot = await getDocs(collection(db, Collections.USERS));
      const docs = Array<User>();
      querySnapshot.forEach((doc) => {
        docs.push(doc.data() as User);
      });
      return docs;
    },
  };
}

export function useAuth(): AuthService {
  return {
    async login(email, password): Promise<User> {
      const auth = getAuth();
      const response = await signInWithEmailAndPassword(auth, email, password);
      const user = response.user;
      return {
        id: user?.providerData?.[0]?.uid ?? 'unknown ID',
        alias: user?.providerData?.[0]?.email ?? 'unknown email',
        name: user?.providerData?.[0]?.displayName ?? 'unknown name',
        deposits: [],
      };
    },
    logOut() {
      // TODO
    },
  };
}
