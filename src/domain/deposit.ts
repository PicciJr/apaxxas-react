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

export function settleExpense(
  deposit: Deposit,
  expenseToSettle: Expense
): Deposit {
  return {
    ...deposit,
    expenses: deposit.expenses.map((expense) => {
      if (expenseToSettle.id === expense.id) expense.isSettled = true;
      return expense;
    }),
  };
}

export function unsettleExpense(
  deposit: Deposit,
  expenseToSettle: Expense
): Deposit {
  return {
    ...deposit,
    expenses: deposit.expenses.map((expense) => {
      if (expenseToSettle.id === expense.id) expense.isSettled = false;
      return expense;
    }),
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

export function calculateTotalBalance(
  deposit: Deposit,
  loggedInUser: User
): number {
  // TODO: un deposito debe poder tener varios deudores
  // con distintas cantidades de gastos para cada deudor
  return deposit.expenses.reduce((acc, currentExpense) => {
    if (
      !currentExpense.isSettled &&
      currentExpense.payer.email === loggedInUser.email
    )
      return acc + currentExpense.total;
    if (
      !currentExpense.isSettled &&
      currentExpense.payer.email !== loggedInUser.email
    )
      return acc - currentExpense.total;
    return acc;
  }, 0.0);
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
