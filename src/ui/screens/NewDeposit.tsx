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

  const hasFormInvalidFields = () => {
    return (
      !depositPayer ||
      !depositDebtor ||
      !depositTitle ||
      !expenseAmount ||
      !expenseSubject
    );
  };

  return (
    <div className="px-4 pt-1 pb-24 overflow-scroll">
      <h2 className="mb-3 text-2xl font-bold text-center text-gray-500">
        Crear nuevo deposito
      </h2>
      <div className="flex flex-col">
        <div className="flex items-center mb-3 space-x-3">
          <span>Nombre</span>
          <ATextInput
            placeholder="deposito-conejos"
            width="150"
            onInputHandler={setDepositTitle}
          />
        </div>
        <div className="flex items-center">
          <div className="my-3">
            {users && (
              <ASelectInputGroup
                options={users.map((user) => user.name)}
                onSelectHandler={handleDepositDebtorSelected}
                placeholder="¿Quién debe?"
              />
            )}
          </div>
          <p className="pl-4 font-bold text-apxred-500">le debe a</p>
        </div>
        {users && (
          <ASelectInputGroup
            options={users.map((user) => user.name)}
            onSelectHandler={handleDepositPayerSelected}
            placeholder="¿Quién ha pagado?"
          />
        )}
        <div className="flex my-3">
          <p className="pr-2 my-2">la cantidad de</p>
          <ATextInput
            placeholder="€"
            width="50%"
            type="number"
            onInputHandler={setExpenseAmount}
          />
        </div>
        <div className="flex items-center mb-12">
          <p className="pr-2">por concepto de</p>
          <ATextInput
            placeholder="Compras mercadona..."
            onInputHandler={setExpenseSubject}
          />
        </div>
        <AButton
          color="purple"
          text="Crear depósito"
          clickHandler={createNewDeposit}
          disabled={hasFormInvalidFields()}
        />
      </div>
    </div>
  );
}
