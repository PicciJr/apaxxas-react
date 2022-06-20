import { Box } from '@chakra-ui/react';

import AButton from '../components/AButton';
import ASelectInputGroup from '../components/ASelectInputGroup';
import ATextInput from '../components/ATextInput';
import { Color, ColorTone } from '../types/icolor';

export default function NewDepositScreen() {
  return (
    <div className="px-4 py-2">
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
          <AButton color={Color.purple} tone={ColorTone.dark} text="Crear depósito" />
        </div>
      </div>
    </div>
  );
}
