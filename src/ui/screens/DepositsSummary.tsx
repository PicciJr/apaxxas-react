import React from 'react';

import DepositCard from '../components/DepositCard';
import { User } from '../../domain/user';
import { useGetDeposits } from '../../application/getDeposits';
import { useEffect } from 'react';

function DepositsSummary() {
  // TODO: datos dinamicos
  const user: User = {
    name: 'Andres P.',
    alias: '@PicciJr',
    id: '2',
    deposits: [],
  };
  const getDeposits = async () => {
    const { getDeposits } = useGetDeposits();
    const deposits = await getDeposits(user);
    return deposits;
  };

  useEffect(() => {
    // TODO: pasar datos a componentes
    getDeposits().then((doc) => console.log(doc));
  });
  const users: User[] = [
    {
      name: 'Bego Q.',
      alias: '@Begoquereda',
      id: '1',
      deposits: [],
    },
    {
      name: 'Andres P.',
      alias: '@PicciJr',
      id: '2',
      deposits: [],
    },
  ];
  return (
    <div className="h-screen px-8 overflow-scroll">
      <DepositCard
        id="random"
        title="deposito-conejitos"
        members={users}
        expenses={[]}
      />
    </div>
  );
}

export default DepositsSummary;
