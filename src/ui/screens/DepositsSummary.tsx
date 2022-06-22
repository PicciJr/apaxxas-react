import React from 'react';

import DepositCard from '../components/DepositCard';
import { User } from '../../domain/user';

function DepositsSummary() {
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
