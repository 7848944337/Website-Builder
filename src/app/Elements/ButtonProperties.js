// src/app/ButtonProperties.js
import React, { useState, useEffect } from 'react';
import SliderControl from '../Components/SliderControl';
import ColorInput from '../Components/ColorInput';
import TextInput from '../Components/TextInput';
import { Button, Flex } from '@chakra-ui/react';

const ButtonProperties = ({ selectedItem, onUpdate }) => {
  const [buttonContent, setButtonContent] = useState(selectedItem.content || '');
  const [buttonWidth, setButtonWidth] = useState(selectedItem.width || 100);
  const [buttonHeight, setButtonHeight] = useState(selectedItem.height || 80);
  const [buttonColor, setButtonColor] = useState(selectedItem.color || '#000000');
  const [buttonTextColor, setButtonTextColor] = useState(selectedItem.textColor || '#ffffff');

  useEffect(() => {
    setButtonContent(selectedItem.content || '');
    setButtonWidth(selectedItem.width || 100);
    setButtonHeight(selectedItem.height || 80);
    setButtonColor(selectedItem.color || '#000000');
    setButtonTextColor(selectedItem.textColor || '#ffffff');
  }, [selectedItem]);

  const handleUpdate = () => {
    onUpdate({
      ...selectedItem,
      content: buttonContent,
      width: buttonWidth,
      height: buttonHeight,
      color: buttonColor,
      textColor: buttonTextColor,
    });
  };

  return (
    <>
      <TextInput value={buttonContent} onChange={(e) => setButtonContent(e.target.value)} label="Button Content" />
      <SliderControl value={buttonWidth} onChange={(value) => setButtonWidth(value)} min={50} max={500} label="Button Width" />
      <SliderControl value={buttonHeight} onChange={(value) => setButtonHeight(value)} min={20} max={200} label="Button Height" />
      <ColorInput value={buttonColor} onChange={(e) => setButtonColor(e.target.value)} label="Button Background Color" />
      <ColorInput value={buttonTextColor} onChange={(e) => setButtonTextColor(e.target.value)} label="Button Text Color" />
      <Flex justifyContent="flex-end">
        <Button colorScheme="blue" mt={4} onClick={handleUpdate}>Apply</Button>
      </Flex>
    </>
  );
};

export default ButtonProperties;
