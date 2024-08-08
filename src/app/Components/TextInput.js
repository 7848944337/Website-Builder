// src/app/TextInput.js
import React from 'react';
import { Input, FormControl, FormLabel } from '@chakra-ui/react';

const TextInput = ({ value, onChange, label, type = "text", placeholder = "" }) => (
  <FormControl mb={4}>
    <FormLabel>{label}</FormLabel>
    <Input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </FormControl>
);

export default TextInput;
