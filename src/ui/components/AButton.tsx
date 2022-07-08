import { Button } from '@chakra-ui/react';

import IColor from '../../types/icolor';

function AButton({ color, text, clickHandler, size }: any) {
  return (
    <Button colorScheme={color} onClick={clickHandler} size={size}>
      {text}
    </Button>
  );
}

export default AButton;
