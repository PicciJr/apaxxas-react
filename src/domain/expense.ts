import { User } from './user';

export type Expense = {
  id: string;
  total: number;
  debtors: User[];
  payer: User;
  isSettled: boolean;
  subject: string;
  isSharedWithPayer: boolean;
  createdAt: number;
};
export function createExpense(
  id: string,
  total: number,
  debtors: User[],
  payer: User,
  isSettled: boolean,
  subject: string,
  isSharedWithPayer: boolean,
  createdAt: number
): Expense {
  return {
    id,
    total,
    debtors,
    payer,
    isSettled,
    subject,
    isSharedWithPayer,
    createdAt,
  };
}
