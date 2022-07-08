import React, { useEffect, useState } from 'react';
import { Deposit } from '../../domain/deposit';
import { useGetDeposit } from '../../application/getDeposit';
import { useParams } from 'react-router-dom';

function DepositDetail() {
  const [deposit, setDeposit] = useState<Deposit | null>(null);
  const params = useParams();
  useEffect(() => {
    if (!params.id) return;
    const { getDeposit } = useGetDeposit();
    getDeposit(params?.id).then((data) => {
      if (!data) return;
      setDeposit(data);
    });
  }, []);

  return (
    <div className="h-screen px-4 py-2 overflow-scroll">DepositDetail</div>
  );
}

export default DepositDetail;
