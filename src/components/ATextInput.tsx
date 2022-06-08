import { Input } from '@chakra-ui/react';
import React from 'react';

function ATextInput({ placeholder = 'Email', width = '100%', size = 'md' }) {
  return (
    <div>
      <Input w={width} size={size} placeholder={placeholder} />
    </div>
  );
}

export default ATextInput;
