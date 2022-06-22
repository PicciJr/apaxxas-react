import { User } from './user';

export type Expense = {
  id: string;
  depositId: string;
  total: number;
  debtors: User[];
  payer: User;
};
