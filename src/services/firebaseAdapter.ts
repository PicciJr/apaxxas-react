import { StorageService } from '../application/ports';
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
    updateDeposit(deposit: Deposit) {
      // TODO
      return new Promise(() => {});
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
