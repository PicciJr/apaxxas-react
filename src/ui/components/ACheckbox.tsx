import React, { useState, useEffect } from 'react';
import { Checkbox } from '@chakra-ui/react';

function ACheckbox({ children, item, handleCheck }) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(item.isSettled);
  }, []);

  return (
    <Checkbox
      isChecked={isChecked}
      onChange={() => {
        setIsChecked(!isChecked);
        handleCheck(item, !isChecked);
      }}
      className={isChecked ? 'line-through text-gray-300' : ''}>
      {children}
    </Checkbox>
  );
}

export default ACheckbox;
