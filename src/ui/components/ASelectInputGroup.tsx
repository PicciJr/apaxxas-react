import { Select } from '@chakra-ui/react';
import React from 'react';

function ASelectInputGroup() {
  return (
    <div>
      <Select placeholder="Selecciona a una persona">
        <option value="@PicciJr">@PicciJr</option>
        <option value="@BegoQ">@BegoQ</option>
      </Select>
    </div>
  );
}

export default ASelectInputGroup;
