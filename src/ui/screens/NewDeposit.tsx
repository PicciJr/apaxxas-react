import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import AButton from '../components/AButton';
import ASelectInputGroup from '../components/ASelectInputGroup';
import ATextInput from '../components/ATextInput';
import { useCreateDeposit } from '../../application/createDeposit';
import { useGetUsers } from '../../application/getUsers';
import { User } from '../../domain/user';
import { Expense } from '../../domain/expense';
import { useCreateExpense } from '../../application/createExpense';
import { useNavigate } from 'react-router-dom';

export default function NewDepositScreen() {
  // New deposit data
  const [users, setUsers] = useState<User[] | null>(null);
  const [depositPayer, setDepositPayer] = useState<User | null>(null);
  const [depositDebtor, setDepositDebtor] = useState<User | null>(null);
  const [expenseAmount, setExpenseAmount] = useState(0.0);
  const [expenseSubject, setExpenseSubject] = useState('');
  const [depositTitle, setDepositTitle] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    // Get users from DB
    const { getUsers } = useGetUsers();
    getUsers().then((users) => {
      if (users) setUsers(users);
    });
  }, []);

  const createNewDeposit = async () => {
    if (depositPayer && depositDebtor) {
      const members: User[] = [depositPayer, depositDebtor];
      const expenses: Expense[] = [];
      const { newExpense } = useCreateExpense();
      try {
        const expense = await newExpense({
          debtors: [depositDebtor],
          payer: depositPayer,
          isSettled: false,
          subject: expenseSubject,
          total: expenseAmount,
        });
        if (expense) {
          expenses.push(expense);
          const { newDeposit } = useCreateDeposit();
          await newDeposit(members, expenses, depositTitle);
          navigate('/resumen');
        }
      } catch (err) {
        console.error('ERROR ui createNewDeposit', err);
      }
    }
  };

  const handleDepositDebtorSelected = (debtor) => {
    setDepositDebtor(users?.find((user) => user.name === debtor) || null);
  };

  const handleDepositPayerSelected = (payer) => {
    setDepositPayer(users?.find((user) => user.name === payer) || null);
  };

  return (
    <div className="h-screen px-4 py-2 overflow-scroll">
      <div className="flex flex-col">
        <p className="mb-2">Nombre deposito</p>
        <ATextInput
          placeholder="#deposito-conejos"
          width="150"
          onInputHandler={setDepositTitle}
        />
        <div className="flex items-center">
          <Box my={2}>
            {users && (
              <ASelectInputGroup
                options={users.map((user) => user.name)}
                onSelectHandler={handleDepositDebtorSelected}
              />
            )}
          </Box>
          <p className="pl-4">le debe a</p>
        </div>
        {users && (
          <ASelectInputGroup
            options={users.map((user) => user.name)}
            onSelectHandler={handleDepositPayerSelected}
          />
        )}
        <div className="flex space-y-1">
          <p className="pr-2 my-2">la cantidad de</p>
          <ATextInput
            placeholder="$"
            htmlSize={8}
            onInputHandler={setExpenseAmount}
          />
        </div>
        <div className="flex space-y-1">
          <p className="pr-2 my-2">por concepto de</p>
          <ATextInput
            placeholder="Compras mercadona..."
            onInputHandler={setExpenseSubject}
          />
        </div>
        <div className="w-40 my-2">
          <AButton
            color="purple"
            text="Crear depósito"
            clickHandler={createNewDeposit}
          />
        </div>
      </div>
    </div>
  );
}
