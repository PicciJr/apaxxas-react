import { Input } from '@chakra-ui/react';
import React, { useState } from 'react';

function ATextInput({
  placeholder = 'Email',
  width = '100%',
  size = 'md',
  htmlSize = 0,
  onInputHandler,
  type = 'text',
}) {
  const [value, setValue] = useState('');
  const handleInput = (event) => {
    setValue(event?.target.value);
    onInputHandler(event?.target.value);
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
        type={type}
      />
    </div>
  );
}

export default ATextInput;
