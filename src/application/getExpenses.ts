import { Expense } from '../domain/expense';

export function useGetExpenses() {
  function getExpensesByUser(expenses: Expense[]) {
    let uniqueExpenses: any[] = [];
    let unSettledExpenses = expenses.filter((expense) => !expense.isSettled);
    unSettledExpenses.forEach(({ debtors, total, payer, subject }) => {
      debtors.forEach((debtor) => {
        const { id, email, alias } = debtor;
        const totalForDebtor = total / (debtors.length + 1);
        const hasDebtorAlreadyBeenAdded = uniqueExpenses.some(
          (item) => item?.id === debtor?.id ?? false
        );
        if (!hasDebtorAlreadyBeenAdded)
          uniqueExpenses.push({
            id,
            email,
            alias,
            payer,
            subject,
            total: totalForDebtor,
          });
        else {
          const debtorToUpdate = uniqueExpenses.findIndex(
            (item) => item.id === id
          );
          uniqueExpenses[debtorToUpdate].total += totalForDebtor;
        }
      });
    });
    uniqueExpenses.forEach(
      (expense) => (expense.total = parseFloat(expense.total.toFixed(2)))
    );
    return uniqueExpenses;
  }
  return { getExpensesByUser };
}
