import { Button } from '@chakra-ui/react';

function AButton({
  color,
  text,
  clickHandler,
  size,
  variant,
  disabled = false,
}: any) {
  return (
    <Button
      colorScheme={color}
      onClick={clickHandler}
      size={size}
      disabled={disabled}
      variant={variant}>
      {text}
    </Button>
  );
}

export default AButton;
