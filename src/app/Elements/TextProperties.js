// src/app/TextProperties.js
import React, { useState, useEffect } from 'react';
import SliderControl from '../Components/SliderControl';
import ColorInput from '../Components/ColorInput';
import TextInput from '../Components/TextInput';
import { Button, Flex,Select } from '@chakra-ui/react';

const TextProperties = ({ selectedItem, onUpdate }) => {
  const [textContent, setTextContent] = useState(selectedItem.content || '');
  const [textColor, setTextColor] = useState(selectedItem.color || 'black');
  const [textFont, setTextFont] = useState(selectedItem.font || 'Arial');
  const [textSize, setTextSize] = useState(selectedItem.size || 16);

  useEffect(() => {
    setTextContent(selectedItem.content || '');
    setTextColor(selectedItem.color || 'black');
    setTextFont(selectedItem.font || 'Arial');
    setTextSize(selectedItem.size || 16);
  }, [selectedItem]);

  const handleUpdate = () => {
    onUpdate({
      ...selectedItem,
      content: textContent,
      color: textColor,
      font: textFont,
      size: textSize,
    });
  };

  return (
    <>
      <TextInput value={textContent} onChange={(e) => setTextContent(e.target.value)} label="Text Content" />
      <ColorInput value={textColor} onChange={(e) => setTextColor(e.target.value)} label="Text Color" />
      <Select value={textFont} onChange={(e) => setTextFont(e.target.value)}>
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          
        </Select>
      <SliderControl value={textSize} onChange={(value) => setTextSize(value)} min={8} max={72} label="Text Size" />
      <Flex justifyContent="flex-end">
        <Button colorScheme="blue" mt={4} onClick={handleUpdate}>Apply</Button>
      </Flex>
    </>
  );
};

export default TextProperties;
