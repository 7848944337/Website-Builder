// src/app/ColorInput.js
import React from 'react';
import { Input, FormControl, FormLabel } from '@chakra-ui/react';

const ColorInput = ({ value, onChange, label }) => (
  <FormControl mb={4}>
    <FormLabel>{label}</FormLabel>
    <Input
      type="color"
      value={value}
      onChange={onChange}
    />
  </FormControl>
);

export default ColorInput;
