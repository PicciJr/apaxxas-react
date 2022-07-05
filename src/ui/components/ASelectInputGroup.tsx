import { Select } from '@chakra-ui/react';
import React, { useState } from 'react';

function ASelectInputGroup({ options, onSelectHandler }) {
  const selectHandler = (event) => {
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
