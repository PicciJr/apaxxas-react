import React, { useEffect, useState } from 'react';
import { Deposit } from '../../domain/deposit';
import { useGetDeposit } from '../../application/getDeposit';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../../services/globalContext';

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
  }, []);

  return (
    <div className="h-screen px-4 py-2 overflow-scroll">
      <div className="w-full text-white rounded-md bg-apxpurple-100">
        {deposit && (
          <ul className="px-2 py-4">
            <>
              {deposit.expenses.map((expense) => {
                return expense.debtors.map((debtor) => {
                  return (
                    debtor.id !== loggedInUser.id && (
                      <li>
                        <span className="font-bold">{debtor.alias}</span> me
                        debe {expense.total}$
                        <ul className="px-8 list-disc">
                          <li>
                            <span className="italic">{expense.subject}</span>:{' '}
                            {expense.total}$
                          </li>
                        </ul>
                      </li>
                    )
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
