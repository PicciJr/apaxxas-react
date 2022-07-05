import { Input } from '@chakra-ui/react';
import React, { useState } from 'react';

function ATextInput({
  placeholder = 'Email',
  width = '100%',
  size = 'md',
  htmlSize = 0,
  onInputHandler,
}) {
  const [value, setValue] = useState('');
  const handleInput = (event) => {
    setValue(event?.target.value);
    onInputHandler(value);
  };
  return (
    <div>
      <Input
        w={width}
        size={size}
        placeholder={placeholder}
        htmlSize={htmlSize}
        onChange={handleInput}
        value={value}
      />
    </div>
  );
}

export default ATextInput;
