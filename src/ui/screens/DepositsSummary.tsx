import React from 'react';

import DepositCard from '../components/DepositCard';
import { User } from '../../domain/user';
import { Deposit } from '../../domain/deposit';
import { useGetDeposits } from '../../application/getDeposits';
import { useEffect, useState } from 'react';

function DepositsSummary() {
  // TODO: datos dinamicos
  const user: User = {
    name: 'Andres P.',
    alias: '@PicciJr',
    id: '2',
    deposits: [],
  };

  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const getDeposits = async () => {
    const { getDeposits } = useGetDeposits();
    const deposits = await getDeposits(user);
    if (!deposits) return [];
    return deposits;
  };

  useEffect(() => {
    getDeposits()
      .then((deposits) => setDeposits(deposits))
      .catch((err) => {
        console.log('ERROR useEffect getDeposits');
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
