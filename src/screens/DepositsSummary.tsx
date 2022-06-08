import React from 'react';

import DepositContainer from '../components/DepositCard';
import { IUser } from '../types/iuser';

function DepositsSummary() {
  const users: IUser[] = [
    {
      name: 'Bego Q.',
      alias: '@Begoquereda',
      id: '1',
    },
    {
      name: 'Andres P.',
      alias: '@PicciJr',
      id: '2',
    },
  ];
  return (
    <div className="px-8">
      <DepositContainer
        id="1ABCDEF1"
        title="deposito-conejitos"
        users={users}
      />
    </div>
  );
}

export default DepositsSummary;
