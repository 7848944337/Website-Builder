// src/app/ImageProperties.js
import React, { useState, useEffect } from 'react';
import SliderControl from '../Components/SliderControl';
import TextInput from '../Components/TextInput';
import { Box, AspectRatio, Button, Flex } from '@chakra-ui/react';

const ImageProperties = ({ selectedItem, onUpdate }) => {
  const [imageSrc, setImageSrc] = useState(selectedItem.src || '');
  const [imageWidth, setImageWidth] = useState(selectedItem.width || 200);
  const [imageHeight, setImageHeight] = useState(selectedItem.height || 200);

  useEffect(() => {
    setImageSrc(selectedItem.src || '');
    setImageWidth(selectedItem.width || 200);
    setImageHeight(selectedItem.height || 200);
  }, [selectedItem]);

  const handleUpdate = (property, value) => {
    onUpdate({
      ...selectedItem,
      [property]: value,
    });
  };

  return (
    <>
      <TextInput value={imageSrc} onChange={(e) => {setImageSrc(e.target.value);  handleUpdate('src', e.target.value)}} label="Image Source" type="url" placeholder="Enter image URL" />
      <SliderControl value={imageWidth} onChange={(value) => {setImageWidth(value);handleUpdate('width', value)}} min={50} max={1000} label="Image Width" />
      <SliderControl value={imageHeight} onChange={(value) => {setImageHeight(value);handleUpdate('height', value)}} min={50} max={1000} label="Image Height" />
     
    </>
  );
};

export default ImageProperties;
