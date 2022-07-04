import React, { useState, useEffect } from 'react';

import { FaHandshake, FaUserAlt, FaPlusCircle } from 'react-icons/fa';
import { Deposit } from '../../domain/deposit';
import { Color, ColorTone } from '../../types/icolor';

function DepositCard({
  title = 'deposito-prueba',
  members = [],
  id,
  expenses = [],
}: Deposit) {
  // TODO: calcular el balance de los depositos una vez tengo sus datos
  const [depositBalance, setDepositBalance] = useState(20.5);
  const [depositTextStyle, setDepositTextStyle] = useState('');

  return (
    <div className={`rounded-md bg-apxpurple-100 w-full text-white`}>
      <p className="font-bold text-center">#{title}</p>
      <div className="px-4 mb-4">
        {expenses.length ? (
          <>
            {members.map((user) => {
              return (
                <li className="my-2 text-white list-none" key={user.id}>
                  {user.alias}
                </li>
              );
            })}
            <div className="flex mt-2 space-x-2">
              <p>Balance actual:</p>
              <p className={`${depositTextStyle} font-bold px-1`}>
                {depositBalance}$
              </p>
            </div>
          </>
        ) : (
          <div className="flex items-center h-24 text-center">
            No hay cuentas pendientes pendientes
          </div>
        )}
      </div>
      <div className={`w-full bg-apxpurple-500 rounded-b-md py-2`}>
        <div className="flex justify-between px-4">
          <FaPlusCircle size={24} color="white" />
          <FaHandshake size={24} color="white" />
          <FaUserAlt size={24} color="white" />
        </div>
      </div>
    </div>
  );
}

export default DepositCard;
