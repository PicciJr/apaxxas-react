import { Select } from '@chakra-ui/react';
import React from 'react';

function ASelectInputGroup({
  options,
  onSelectHandler,
  placeholder = 'Selecciona una opción',
  defaultValue = '',
}) {
  const selectHandler = (event) => {
    onSelectHandler(event.target.value);
  };
  return (
    <Select onChange={selectHandler}>
      {options.map((option) => (
        <option value={option} key={option}>
          {defaultValue ? defaultValue : option}
        </option>
      ))}
    </Select>
  );
}

export default ASelectInputGroup;
