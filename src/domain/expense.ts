import { User } from './user';

export type Expense = {
  id: string;
  total: number;
  debtors: User[];
  payer: User;
  isSettled: boolean;
  subject: string;
  isSharedWithPayer: boolean;
};
export function createExpense(
  id: string,
  total: number,
  debtors: User[],
  payer: User,
  isSettled: boolean,
  subject: string,
  isSharedWithPayer: boolean
): Expense {
  return {
    id,
    total,
    debtors,
    payer,
    isSettled,
    subject,
    isSharedWithPayer,
  };
}
