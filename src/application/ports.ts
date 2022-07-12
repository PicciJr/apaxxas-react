import { User } from '../domain/user';
import { Deposit } from '../domain/deposit';
import { Expense } from '../domain/expense';

export interface StorageService {
  getDepositsByUser(user: User): Promise<Deposit[]>;
  getDepositById(id: string): Promise<Deposit>;
  updateDeposit(deposit: Deposit): void;
  insertDeposit(deposit: Deposit): void;
  insertExpense(expense: Expense): void;
  findUsers(): Promise<User[]>;
}

export interface UuidService {
  generateUuid(): string;
}

export interface AuthService {
  login(email: string, password: string): Promise<User>;
  googleSignIn(): Promise<User>;
  logOut(): void;
}
