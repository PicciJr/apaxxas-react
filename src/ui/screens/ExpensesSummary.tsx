import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Expense } from '../../domain/expense';
import { useGetDeposit } from '../../application/getDeposit';
import { Deposit } from '../../domain/deposit';

function ExpensesSummary() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const params = useParams();

  useEffect(() => {
    if (!params.depositId) return;
    const { getDeposit } = useGetDeposit();
    getDeposit(params.depositId).then((deposit: Deposit | any) => {
      const expenses = deposit.expenses;
      setExpenses(
        expenses.sort((expenseA, expenseB) => {
          if (
            typeof expenseA.createdAt === 'undefined' &&
            typeof expenseB.createdAt !== 'undefined'
          )
            return 1;
          if (
            typeof expenseA.createdAt !== 'undefined' &&
            typeof expenseB.createdAt === 'undefined'
          )
            return -1;
          if (
            typeof expenseA.createdAt !== 'undefined' &&
            typeof expenseB.createdAt !== 'undefined'
          )
            return -(expenseA.createdAt - expenseB.createdAt);
        })
      );
    });
  }, []);

  return (
    <div className="px-4 pt-1 pb-24 overflow-scroll sm:overflow-hidden">
      <h2 className="mb-3 text-2xl font-bold text-center text-gray-500">
        Historial de gastos
      </h2>
      {expenses && (
        <div className="w-full p-2 text-white rounded-md bg-apxpurple-100">
          <ul className="px-4 list-disc">
            {expenses.map((expense) => (
              <li className="flex items-baseline mb-3 space-x-1">
                <span className="italic">- {expense.subject}:</span>
                <span className="font-bold">{expense.total}€</span>
                {expense.createdAt && (
                  <span className="px-2 text-xs text-gray-600">
                    {new Date(expense?.createdAt).toLocaleDateString()}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ExpensesSummary;
