import { Deposit } from '../domain/deposit';
import { Expense } from '../domain/expense';
import { settleExpense, unsettleExpense } from '../domain/deposit';

export function useUpdateExpense() {
  function updateExpenseStatus(
    deposit: Deposit,
    expense: Expense
  ): Deposit | void {
    try {
      return expense.isSettled
        ? settleExpense(deposit, expense)
        : unsettleExpense(deposit, expense);
    } catch (err) {
      console.error('ERROR updateExpense', err);
    }
  }
  return { updateExpenseStatus };
}
