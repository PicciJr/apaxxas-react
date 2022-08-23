import React, { useState, useEffect } from 'react';
import { useGetExpenses } from '../../application/getExpenses';

import { Deposit } from '../../domain/deposit';
import { useGlobalContext } from '../../services/globalContext';
import { calculateTotalBalance } from '../../domain/deposit';

function DepositCard({
  title = 'deposito-prueba',
  members = [],
  id,
  expenses = [],
}: Deposit) {
  const { user } = useGlobalContext();

  const depositBalance = calculateTotalBalance(
    { title, members, id, expenses },
    user
  );

  const [uniqueExpenses, setUniqueExpenses] = useState<any>([]);

  useEffect(() => {
    const { getExpensesByUser } = useGetExpenses();
    setUniqueExpenses(getExpensesByUser(expenses));
  }, []);

  return (
    <div className={`rounded-md bg-apxpurple-100 w-full text-white pb-2`}>
      <p className="font-bold text-center">#{title}</p>
      <div className="px-4 mb-4">
        {uniqueExpenses.length ? (
          <>
            {uniqueExpenses.map((expense) => {
              if (user.email !== expense.email)
                return (
                  <li className="my-2 text-white list-none" key={expense.id}>
                    <span className="font-bold">{expense.alias}</span> me debe{' '}
                    {expense.total}€
                  </li>
                );
              return (
                <li className="my-2 text-white list-none" key={expense.id}>
                  <span className="font-bold text-apxred-500">
                    {expense.alias} (Yo)
                  </span>{' '}
                  debe {expense.total}€ a{' '}
                  <span className="font-bold0">{expense.payer.alias}</span>
                </li>
              );
            })}
            <div className="flex mt-8 space-x-2">
              <p>Balance actual:</p>
              <p
                className={`${
                  (depositBalance > 0 && 'text-apxgreen-500') ||
                  (depositBalance < 0 && 'text-apxred-500')
                } font-bold px-1`}>
                {depositBalance}€
              </p>
            </div>
          </>
        ) : (
          <div className="flex items-center h-24 text-center">
            No hay cuentas pendientes pendientes
          </div>
        )}
      </div>
    </div>
  );
}

export default DepositCard;
