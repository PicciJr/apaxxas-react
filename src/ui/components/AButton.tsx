import { Button } from '@chakra-ui/react';

import IColor from '../../types/icolor';

function AButton({ color, text, clickHandler }: any) {
  return (
    <Button colorScheme={color} onClick={clickHandler}>
      {text}
    </Button>
  );
}

export default AButton;
