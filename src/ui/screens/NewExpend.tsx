import React, { useState, useEffect } from 'react';
import ATextInput from '../components/ATextInput';
import ASelectInputGroup from '../components/ASelectInputGroup';
import AButton from '../components/AButton';
import { User } from '../../domain/user';
import { Deposit } from '../../domain/deposit';
import { useGetDeposit } from '../../application/getDeposit';
import { useGlobalContext } from '../../services/globalContext';
import { useParams } from 'react-router-dom';
import { useUpdateDeposit } from '../../application/updateDeposit';
import { Expense } from '../../domain/expense';
import { useCreateExpense } from '../../application/createExpense';
import { useNavigate } from 'react-router-dom';

function NewExpend() {
  const navigate = useNavigate();
  const { user: loggedInUser } = useGlobalContext();
  const [deposit, setDeposit] = useState<Deposit | null>();
  const [cost, setCost] = useState(0.0);
  const [payer, setPayer] = useState<User | null>(null);
  const [debtor, setDebtor] = useState<User | null>(null);
  const [subject, setSubject] = useState('');
  const params = useParams();

  const handleDebtorSelected = (debtor) => {
    setDebtor(deposit?.members.find((user) => user.name === debtor) || null);
  };

  const handlePayerSelected = (payer) => {
    setPayer(deposit?.members.find((user) => user.name === payer) || null);
  };

  const addNewExpenseToDeposit = async () => {
    const { updateDeposit } = useUpdateDeposit();
    const { newExpense } = useCreateExpense();
    try {
      if (!deposit) return;
      const expenseToAdd = await newExpense({
        total: cost,
        subject,
        payer,
        debtors: [debtor],
        isSettled: false,
      });
      if (!expenseToAdd) return;
      const updatedDeposit: Deposit = {
        ...deposit,
        expenses: [...deposit.expenses, expenseToAdd],
      };
      await updateDeposit(updatedDeposit);
      navigate('/resumen');
    } catch (err) {
      console.error('ERROR updateDeposit', err);
    }
  };

  useEffect(() => {
    if (!params.depositId) return;
    const { getDeposit } = useGetDeposit();
    getDeposit(params.depositId).then((deposit) => {
      setDeposit(deposit);
      if (loggedInUser) setDefaultMembersToExpend(deposit);
    });
  }, []);

  const setDefaultMembersToExpend = (deposit) => {
    const foundPayer = deposit?.members.find(
      (member) => member.email === loggedInUser.email
    );
    if (foundPayer) setPayer(foundPayer);

    const foundDebtor = deposit?.members.filter(
      (member) => member.email !== foundPayer?.email
    );
    if (foundDebtor) setDebtor(foundDebtor[0]);
  };

  const hasFormInvalidFields = () => {
    return !payer || !debtor || !cost || !subject;
  };

  return (
    <div className="px-4 pt-1 pb-24 overflow-scroll sm:overflow-hidden">
      <h2 className="mb-3 text-2xl font-bold text-center text-gray-500">
        Añadir nuevo gasto
      </h2>
      <div className="flex flex-col space-y-3">
        <label>Coste asociado</label>
        <ATextInput
          placeholder="€"
          width="30%"
          onInputHandler={setCost}
          type="number"
        />
        {deposit?.members.length && (
          <>
            <label>Pagador</label>
            <ASelectInputGroup
              options={deposit?.members.map((member) => member.name)}
              onSelectHandler={handlePayerSelected}
              defaultValue={payer?.name}
            />
            <label>Deudor</label>
            <ASelectInputGroup
              options={deposit?.members.map((member) => member.name)}
              onSelectHandler={handleDebtorSelected}
              defaultValue={debtor?.name}
            />
          </>
        )}
        <label>Concepto</label>
        <ATextInput
          placeholder="Compra Mercadona"
          htmlSize={8}
          onInputHandler={setSubject}
        />
        <AButton
          color="purple"
          text="Añadir nuevo gasto"
          clickHandler={addNewExpenseToDeposit}
          disabled={hasFormInvalidFields()}
        />
      </div>
    </div>
  );
}

export default NewExpend;
