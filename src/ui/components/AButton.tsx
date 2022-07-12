import { Button } from '@chakra-ui/react';

import IColor from '../../types/icolor';

function AButton({ color, text, clickHandler, size, variant }: any) {
  return (
    <Button
      colorScheme={color}
      onClick={clickHandler}
      size={size}
      variant={variant}>
      {text}
    </Button>
  );
}

export default AButton;
