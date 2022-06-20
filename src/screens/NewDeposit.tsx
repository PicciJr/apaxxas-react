import { Flex, Box } from '@chakra-ui/react';

import AButton from '../components/AButton';
import ASelectInputGroup from '../components/ASelectInputGroup';
import ATextInput from '../components/ATextInput';
import { Color, ColorTone } from '../types/icolor';

export default function NewDepositScreen() {
  return (
    <div className="px-4 py-2">
      <Flex direction="column">
        <p className="mb-2">Nombre deposito</p>
        <ATextInput placeholder="#deposito-conejos" width="150" />
        <Flex direction="row" alignItems="center">
          <Box my={2}>
            <ASelectInputGroup />
          </Box>
          <p className="pl-4">le debe a</p>
        </Flex>
        <ASelectInputGroup />
        <Flex my={2}>
          <p className="pr-2 my-2">la cantidad de</p>
          <ATextInput placeholder="$" htmlSize={4} />
        </Flex>
        <Flex my={2}>
          <p className="pr-2 my-2">por concepto de</p>
          <ATextInput placeholder="Compras mercadona..." />
        </Flex>
        <div className="w-40 my-2">
          <AButton color={Color.purple} tone={ColorTone.dark} text="Crear depósito" />
        </div>
      </Flex>
    </div>
  );
}
