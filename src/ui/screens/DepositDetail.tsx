import React, { useEffect, useState } from 'react';
import { Stack } from '@chakra-ui/react';
import { Deposit } from '../../domain/deposit';
import { Expense } from '../../domain/expense';
import { useGetDeposit } from '../../application/getDeposit';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../../services/globalContext';
import { useUpdateExpense } from '../../application/updateExpense';
import { useUpdateDeposit } from '../../application/updateDeposit';
import ACheckbox from '../components/ACheckbox';

function DepositDetail() {
  const { user: loggedInUser } = useGlobalContext();
  const [deposit, setDeposit] = useState<Deposit | null>(null);
  const params = useParams();
  useEffect(() => {
    if (!params.id) return;
    const { getDeposit } = useGetDeposit();
    getDeposit(params?.id).then((data) => {
      if (!data) return;
      setDeposit(data);
    });
  }, [loggedInUser]);

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
      console.log('ERROR handleExpenseChecked', err);
    }
  };

  return (
    <div className="h-screen px-4 py-2 overflow-scroll">
      <div className="w-full text-white rounded-md bg-apxpurple-100">
        {deposit && (
          <ul className="px-2 py-4">
            <p className="mb-4 font-bold text-center">#{deposit.title}</p>
            <>
              {deposit.expenses.map((expense) => {
                return expense.debtors.map((debtor) => {
                  if (debtor.id !== loggedInUser.id)
                    return (
                      <Stack className="mb-4" key={expense.id}>
                        <ACheckbox
                          item={expense}
                          handleCheck={handleExpenseChecked}>
                          <li>
                            <span className="font-bold">{debtor.alias}</span> me
                            debe {expense.total}$
                            <ul className="px-8 list-disc">
                              <li>
                                <span className="italic">
                                  {expense.subject}
                                </span>
                                : {expense.total}$
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
                          <span className="font-bold">{debtor.alias} (Yo)</span>{' '}
                          debe {expense.total}$ a{' '}
                          <span className="font-bold">
                            {expense.payer.alias}
                          </span>
                          <ul className="px-8 list-disc">
                            <li>
                              <span className="italic">{expense.subject}</span>:{' '}
                              {expense.total}$
                            </li>
                          </ul>
                        </li>
                      </ACheckbox>
                    </Stack>
                  );
                });
              })}
            </>
          </ul>
        )}
      </div>
    </div>
  );
}

export default DepositDetail;
