import { Box } from '@chakra-ui/react';

import AButton from '../components/AButton';
import ASelectInputGroup from '../components/ASelectInputGroup';
import ATextInput from '../components/ATextInput';
import { Color, ColorTone } from '../../types/icolor';
import { useCreateDeposit } from '../../application/createDeposit';
import { User } from '../../domain/user';

export default function NewDepositScreen() {
  const createNewDeposit = async () => {
    const { newDeposit } = useCreateDeposit();
    // TODO: datos dinamicos
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
    await newDeposit(users, [], 'deposito-conejitos');
  };

  return (
    <div className="h-screen px-4 py-2 overflow-scroll">
      <div className="flex flex-col">
        <p className="mb-2">Nombre deposito</p>
        <ATextInput placeholder="#deposito-conejos" width="150" />
        <div className="flex items-center">
          <Box my={2}>
            <ASelectInputGroup />
          </Box>
          <p className="pl-4">le debe a</p>
        </div>
        <ASelectInputGroup />
        <div className="flex space-y-1">
          <p className="pr-2 my-2">la cantidad de</p>
          <ATextInput placeholder="$" htmlSize={4} />
        </div>
        <div className="flex space-y-1">
          <p className="pr-2 my-2">por concepto de</p>
          <ATextInput placeholder="Compras mercadona..." />
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
