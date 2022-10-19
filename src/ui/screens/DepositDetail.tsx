import React, { useEffect, useState } from 'react';
import { Stack } from '@chakra-ui/react';
import { Deposit } from '../../domain/deposit';
import { Expense } from '../../domain/expense';
import { useGetDeposit } from '../../application/getDeposit';
import { useParams, Link } from 'react-router-dom';
import { useGlobalContext } from '../../services/globalContext';
import { useUpdateExpense } from '../../application/updateExpense';
import { useUpdateDeposit } from '../../application/updateDeposit';
import ACheckbox from '../components/ACheckbox';
import { FaList, FaCommentDollar } from 'react-icons/fa';

function DepositDetail() {
  const { user: loggedInUser } = useGlobalContext();
  const [deposit, setDeposit] = useState<Deposit | null>(null);
  const [depositWithPendingItems, setDepositWithPendingItems] =
    useState<Deposit | null>(null);
  const params = useParams();
  useEffect(() => {
    if (!params.id) return;
    const { getDeposit } = useGetDeposit();
    getDeposit(params?.id).then((data) => {
      if (!data) return;
      setDeposit(data);
      const { expenses, id, members, title } = data;
      setDepositWithPendingItems({
        id,
        title,
        members,
        expenses: sortedExpensesByDate(expenses).filter(
          (expense) => !expense.isSettled
        ),
      });
    });
  }, [loggedInUser]);

  const sortedExpensesByDate = (expenses) => {
    return expenses.sort((expenseA, expenseB) => {
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
    });
  };

  const handleExpenseChecked = async (item: Expense, isChecked) => {
    if (!deposit) return;
    try {
      item.isSettled = isChecked;
      const { updateExpenseStatus } = useUpdateExpense();
      const updatedDeposit = updateExpenseStatus(deposit, item);
      const { updateDeposit } = useUpdateDeposit();
      if (!updatedDeposit) return;
      await updateDeposit(updatedDeposit);
    } catch (err) {
      console.error('ERROR handleExpenseChecked', err);
    }
  };

  return (
    <div className="px-4 pt-1 pb-24 overflow-scroll sm:overflow-hidden">
      <div className="w-full text-white rounded-md bg-apxpurple-100">
        {deposit && depositWithPendingItems && (
          <>
            <ul className="px-2 py-4">
              <p className="mb-4 font-bold text-center">
                #{depositWithPendingItems.title}
              </p>

              {depositWithPendingItems.expenses.map((expense) => {
                return expense.debtors.map((debtor) => {
                  if (debtor.email !== loggedInUser.email)
                    return (
                      <Stack className="mb-4" key={expense.id}>
                        <ACheckbox
                          item={expense}
                          handleCheck={handleExpenseChecked}>
                          <li>
                            <span className="font-bold">{debtor.alias}</span> me
                            debe{' '}
                            {(
                              expense.total /
                              depositWithPendingItems.members.length
                            ).toFixed(2)}
                            €
                            <ul className="px-8 list-disc">
                              <li>
                                <span className="italic">
                                  {expense.subject}
                                </span>
                                : {expense.total}€
                                {expense.createdAt && (
                                  <span className="px-2 text-xs text-gray-600">
                                    {new Date(
                                      expense?.createdAt
                                    ).toLocaleDateString()}
                                  </span>
                                )}
                              </li>
                            </ul>
                          </li>
                        </ACheckbox>
                      </Stack>
                    );
                  return (
                    <Stack className="mb-4" key={debtor.id}>
                      <ACheckbox
                        item={expense}
                        handleCheck={handleExpenseChecked}>
                        <li>
                          <span className="font-bold text-apxred-500">
                            {debtor.alias} (Yo)
                          </span>{' '}
                          debe{' '}
                          {(
                            expense.total /
                            depositWithPendingItems.members.length
                          ).toFixed(2)}
                          € a{' '}
                          <span className="font-bold">
                            {expense.payer.alias}
                          </span>
                          <ul className="px-8 list-disc">
                            <li>
                              <span className="italic">{expense.subject}</span>:{' '}
                              {expense.total}€
                              {expense.createdAt && (
                                <span className="px-2 text-xs text-gray-600">
                                  {new Date(
                                    expense?.createdAt
                                  ).toLocaleDateString()}
                                </span>
                              )}
                            </li>
                          </ul>
                        </li>
                      </ACheckbox>
                    </Stack>
                  );
                });
              })}
            </ul>
            <div className={`w-full bg-apxpurple-500 rounded-b-md py-2`}>
              <div className="flex justify-between px-4">
                <Link to={`/nuevo-gasto/${deposit.id}`}>
                  <FaCommentDollar size={24} color="white" />
                </Link>
                {/** TODO: ajustar todos los gastos pendientes de un click */}
                {/* <FaHandshake size={24} color="white" /> */}
                {/** TODO: acceder a un listado de todos los gatos */}
                <Link to={`/historial/${deposit.id}`}>
                  <FaList size={24} color="white" />
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DepositDetail;
