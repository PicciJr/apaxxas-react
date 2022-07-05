import { Box } from '@chakra-ui/react';
import { useState } from 'react';

import AButton from '../components/AButton';
import ASelectInputGroup from '../components/ASelectInputGroup';
import ATextInput from '../components/ATextInput';
import { useCreateDeposit } from '../../application/createDeposit';
import { User } from '../../domain/user';
import { Expense } from '../../domain/expense';
import { useCreateExpense } from '../../application/createExpense';

export default function NewDepositScreen() {
  // TODO: datos dinamicos de usuarios, obtener de alguna collection
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

  // New deposit data
  const [depositPayer, setDepositPayer] = useState<User | null>(null);
  const [depositDebtor, setDepositDebtor] = useState<User | null>(null);
  // const [depositExpense, setDepositExpense] = useState<Expense | null>();
  const [expenseAmout, setExpenseAmount] = useState(0.0);
  const [expenseSubject, setExpenseSubject] = useState('');
  const [depositTitle, setDepositTitle] = useState<string>('');

  const createNewDeposit = async () => {
    // await newDeposit(users, [], 'deposito-conejitos');
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
          total: expenseAmout,
        });
        if (expense) {
          expenses.push(expense);
          const { newDeposit } = useCreateDeposit();
          await newDeposit(members, expenses, depositTitle);
        }
      } catch (err) {
        console.log('ERROR ui createNewDeposit', err);
      }
    }
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
            <ASelectInputGroup
              options={users.map((user) => user.name)}
              onSelectHandler={setDepositDebtor}
            />
          </Box>
          <p className="pl-4">le debe a</p>
        </div>
        <ASelectInputGroup
          options={users.map((user) => user.name)}
          onSelectHandler={setDepositPayer}
        />
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
