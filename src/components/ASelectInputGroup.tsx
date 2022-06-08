import { Select } from '@chakra-ui/react';
import React from 'react';

function ASelectInputGroup() {
  return (
    <div>
      <Select placeholder="Select option">
        <option value="@PicciJr">@PicciJr</option>
        <option value="@BegoQ">@BegoQ</option>
      </Select>
    </div>
  );
}

export default ASelectInputGroup;
