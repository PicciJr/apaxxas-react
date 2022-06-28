import { StorageService } from '../application/ports';
import { Deposit } from '../domain/deposit';
import { User } from '../domain/user';

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
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDYmAW_Tjy8FhIR3I6Y4Zhce2sQtGS2Nnc',
  authDomain: 'apaxxas.firebaseapp.com',
  projectId: 'apaxxas',
  storageBucket: 'apaxxas.appspot.com',
  messagingSenderId: '603077638946',
  appId: '1:603077638946:web:995ac3689b068e7659837b',
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
    async createDocument(document, collection) {
      await setDoc(doc(db, collection, document.title), document);
    },
    getDocument(id: string, collection: string) {
      return new Promise(() => {});
    },
    getDocuments(user: User, collection: string) {
      return new Promise(() => {});
    },
    updateDocument(document: any, collection: string) {
      return new Promise(() => {});
    },
  };
}
