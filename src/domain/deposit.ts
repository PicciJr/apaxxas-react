import { Expense } from './expense';
import { User } from './user';

export type Deposit = {
  id: string;
  userId: string;
  title: string;
  members: User[];
  expenses: Expense[];
};
