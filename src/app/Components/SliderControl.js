// src/app/SliderControl.js
import React from 'react';
import {FormLabel, FormControl,Slider, SliderTrack, SliderFilledTrack, SliderThumb, Box, Flex } from '@chakra-ui/react';

const SliderControl = ({ value, onChange, min, max, label }) => (
  <FormControl mb={4}>
    <FormLabel>{label}</FormLabel>
    <Flex direction="column" align="center">
      <Box mb={2}>{value}px</Box>
      <Slider
        aria-label={label}
        value={value}
        min={min}
        max={max}
        onChange={onChange}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Flex>
  </FormControl>
);

export default SliderControl;
