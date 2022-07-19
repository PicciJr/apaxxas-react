import { Expense } from '../domain/expense';

export function useGetExpenses() {
  function getExpensesByUser(expenses: Expense[]) {
    let uniqueExpenses: any[] = [];
    expenses.forEach(({ debtors, total, isSettled, payer, subject }) => {
      debtors.forEach((debtor) => {
        const { id, email, alias } = debtor;
        const totalForDebtor = total / (debtors.length + 1);
        if (!uniqueExpenses.some((item) => item.id === debtor.id) && !isSettled)
          uniqueExpenses.push({
            id,
            email,
            alias,
            payer,
            subject,
            total: totalForDebtor,
          });
        else if (uniqueExpenses.length)
          uniqueExpenses.find((item) => item.id === debtor.id).total +=
            totalForDebtor;
      });
    });
    uniqueExpenses.forEach(
      (expense) => (expense.total = parseFloat(expense.total.toFixed(2)))
    );
    return uniqueExpenses;
  }
  return { getExpensesByUser };
}
