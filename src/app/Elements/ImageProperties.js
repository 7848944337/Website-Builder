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

  const handleUpdate = () => {
    onUpdate({
      ...selectedItem,
      src: imageSrc,
      width: imageWidth,
      height: imageHeight,
    });
  };

  return (
    <>
      <TextInput value={imageSrc} onChange={(e) => setImageSrc(e.target.value)} label="Image Source" type="url" placeholder="Enter image URL" />
      {imageSrc && (
        <Box mb={4}>
          <AspectRatio ratio={imageWidth / imageHeight}>
            <img src={imageSrc} alt="Preview" style={{ width: '100%', height: '100%' }} />
          </AspectRatio>
        </Box>
      )}
      <SliderControl value={imageWidth} onChange={(value) => setImageWidth(value)} min={50} max={1000} label="Image Width" />
      <SliderControl value={imageHeight} onChange={(value) => setImageHeight(value)} min={50} max={1000} label="Image Height" />
      <Flex justifyContent="flex-end">
        <Button colorScheme="blue" mt={4} onClick={handleUpdate}>Apply</Button>
      </Flex>
    </>
  );
};

export default ImageProperties;
