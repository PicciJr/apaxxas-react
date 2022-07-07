import React, { useEffect, useState } from 'react';

import DepositCard from '../components/DepositCard';
import { User } from '../../domain/user';
import { Deposit } from '../../domain/deposit';
import { useGetDeposits } from '../../application/getDeposits';
import { useGlobalContext } from '../../services/globalContext';

function DepositsSummary() {
  // Get user from Context API
  const { user: loggedInUser } = useGlobalContext();

  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const getDeposits = async () => {
    const { getDeposits } = useGetDeposits();
    const deposits = await getDeposits(loggedInUser);
    if (!deposits) return [];
    return deposits;
  };

  useEffect(() => {
    getDeposits()
      .then((deposits) => setDeposits(deposits))
      .catch((err) => {
        console.log('ERROR useEffect getDeposits', err);
      });
  }, []);
  return (
    <div className="h-screen px-8 overflow-scroll">
      {deposits.length ? (
        <ul>
          {deposits.map((deposit) => (
            <DepositCard
              id={deposit.id}
              title={deposit.title}
              members={deposit.members}
              expenses={deposit.expenses}
              key={deposit.id}
            />
          ))}
        </ul>
      ) : (
        <div>Obteniendo depositos...</div>
      )}
    </div>
  );
}

export default DepositsSummary;
