import { Expense } from './expense';
import { User } from './user';

export type Deposit = {
  id: string;
  title: string;
  members: User[];
  expenses: Expense[];
};

export function addExpense(deposit: Deposit, expense: Expense): Deposit {
  return { ...deposit, expenses: [...deposit.expenses, expense] };
}

export function removeExpense(deposit: Deposit, expense: Expense): Deposit {
  return {
    ...deposit,
    expenses: deposit.expenses.filter(({ id }) => id === expense.id),
  };
}

export function addMember(deposit: Deposit, user: User): Deposit {
  return { ...deposit, members: [...deposit.members, user] };
}

export function removeMember(deposit: Deposit, user: User): Deposit {
  return {
    ...deposit,
    members: deposit.members.filter(({ id }) => id === user.id),
  };
}

export function settleAllExpenses(deposit: Deposit): Deposit {
  return {
    ...deposit,
    expenses: deposit.expenses.map(({ isSettled, ...rest }) => ({
      isSettled: true,
      ...rest,
    })),
  };
}

export function createDeposit(
  members: User[],
  expenses: Expense[],
  depositId: string,
  title: string
): Deposit {
  return {
    id: depositId,
    expenses,
    members,
    title,
  };
}
