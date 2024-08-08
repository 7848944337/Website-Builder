// src/app/VideoProperties.js
import React, { useState, useEffect } from 'react';
import SliderControl from '../Components/SliderControl';
import TextInput from '../Components/TextInput';
import { Box, AspectRatio, Button, Flex } from '@chakra-ui/react';

const VideoProperties = ({ selectedItem, onUpdate }) => {
  const [videoSrc, setVideoSrc] = useState(selectedItem.src || '');
  const [videoWidth, setVideoWidth] = useState(selectedItem.width || 400);
  const [videoHeight, setVideoHeight] = useState(selectedItem.height || 300);

  useEffect(() => {
    setVideoSrc(selectedItem.src || '');
    setVideoWidth(selectedItem.width || 400);
    setVideoHeight(selectedItem.height || 300);
  }, [selectedItem]);

  const handleUpdate = () => {
    onUpdate({
      ...selectedItem,
      src: videoSrc,
      width: videoWidth,
      height: videoHeight,
    });
  };

  return (
    <>
      <TextInput value={videoSrc} onChange={(e) => setVideoSrc(e.target.value)} label="Video Source" type="url" placeholder="Enter video URL" />
      {videoSrc && (
        <Box mb={4}>
          <AspectRatio ratio={videoWidth / videoHeight}>
            <video src={videoSrc} controls style={{ width: '100%', height: '100%' }} />
          </AspectRatio>
        </Box>
      )}
      <SliderControl value={videoWidth} onChange={(value) => setVideoWidth(value)} min={200} max={1000} label="Video Width" />
      <SliderControl value={videoHeight} onChange={(value) => setVideoHeight(value)} min={150} max={800} label="Video Height" />
      <Flex justifyContent="flex-end">
        <Button colorScheme="blue" mt={4} onClick={handleUpdate}>Apply</Button>
      </Flex>
    </>
  );
};

export default VideoProperties;
