import { Select } from '@chakra-ui/react';
import React, { useState } from 'react';

function ASelectInputGroup({ options, onSelectHandler }) {
  const [value, setValue] = useState('');
  const selectHandler = (event) => {
    setValue(event.target.value);
    onSelectHandler(event.target.value);
  };
  return (
    <div>
      <Select placeholder="Selecciona a una persona" onChange={selectHandler}>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </Select>
    </div>
  );
}

export default ASelectInputGroup;
