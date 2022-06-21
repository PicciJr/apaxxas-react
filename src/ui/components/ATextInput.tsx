import { Input } from '@chakra-ui/react';
import React from 'react';

function ATextInput({ placeholder = 'Email', width = '100%', size = 'md', htmlSize = 0 }) {
  return (
    <div>
      <Input w={width} size={size} placeholder={placeholder} htmlSize={htmlSize} />
    </div>
  );
}

export default ATextInput;
