import { Flex } from "@chakra-ui/react";

import AButton from "../components/AButton";
import ASelectInputGroup from "../components/ASelectInputGroup";
import ATextInput from "../components/ATextInput";
import { Color, ColorTone } from "../types/icolor";

export default function NewDepositScreen() {
  return (
    <div className={`px-4 py-2`}>
      <Flex>
        <p className={`mb-2`}>Nombre deposito</p>
        <ATextInput placeholder="#deposito-conejos" width="150" />
        <Flex direction="row" alignItems="center">
          <ASelectInputGroup />
          <p className={`pl-4`}>le debe a</p>
        </Flex>
        <ASelectInputGroup />
        <p className={`my-2`}>la cantidad de</p>
        <ATextInput placeholder="$" width="100" />
        <p className={`my-2`}>por concepto de</p>
        <ATextInput placeholder="Compras mercadona..." />
        <div className={`w-40 my-2`}>
          <AButton color={Color.purple} tone={ColorTone.dark} />
        </div>
      </Flex>
    </div>
  );
}
