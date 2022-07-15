import { Select } from '@chakra-ui/react';
import React from 'react';

function ASelectInputGroup({
  options,
  onSelectHandler,
  placeholder = 'Selecciona una opción',
}) {
  const selectHandler = (event) => {
    onSelectHandler(event.target.value);
  };
  return (
    <Select placeholder={placeholder} onChange={selectHandler}>
      {options.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </Select>
  );
}

export default ASelectInputGroup;
