import React, { useEffect, useState } from 'react';

import DepositCard from '../components/DepositCard';
import { User } from '../../domain/user';
import { Link } from 'react-router-dom';
import { Deposit } from '../../domain/deposit';
import { useGetDeposits } from '../../application/getDeposits';
import { useGlobalContext } from '../../services/globalContext';
import AButton from '../components/AButton';
import { Spinner } from '@chakra-ui/react';

function DepositsSummary() {
  // Get user from Context API
  const { user: loggedInUser, isPending, setIsPending } = useGlobalContext();

  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const getDeposits = async () => {
    setIsPending(true);
    const { getDeposits } = useGetDeposits();
    const deposits = await getDeposits(loggedInUser);
    setIsPending(false);
    if (!deposits) return [];
    return deposits;
  };

  useEffect(() => {
    getDeposits()
      .then((deposits) => {
        setDeposits(deposits);
      })
      .catch((err) => {
        console.error('ERROR useEffect getDeposits', err);
      });
  }, [loggedInUser]);
  return (
    <div className="h-screen px-8 overflow-scroll">
      {isPending ? (
        <div className="flex flex-col items-center space-y-3">
          <span>Obteniendo depositos...</span>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div>
      ) : deposits.length ? (
        <ul>
          {deposits.map((deposit) => (
            <Link to={`/deposito/${deposit.id}`} key={deposit.id}>
              <div className="mb-4">
                <DepositCard
                  id={deposit.id}
                  title={deposit.title}
                  members={deposit.members}
                  expenses={deposit.expenses}
                />
              </div>
            </Link>
          ))}
        </ul>
      ) : !isPending && loggedInUser ? (
        // TODO: loader cuando estoy obteniendo depositos
        <div className="flex flex-col items-center justify-center space-y-3">
          <span>No tienes depósitos disponibles</span>
          <Link to="/nuevo-deposito">
            <AButton color="purple" text="Crear depósito" />
          </Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default DepositsSummary;
