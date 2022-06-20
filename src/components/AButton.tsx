import { Button } from '@chakra-ui/react';

import IColor from '../types/icolor';

function AButton({ color, tone, text = 'Click here' }: IColor | any) {
  return <Button>{text}</Button>;
}

export default AButton;
