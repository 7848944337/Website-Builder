// src/app/VideoProperties.js
import React, { useState, useEffect } from 'react';
import SliderControl from '../Components/SliderControl';
import TextInput from '../Components/TextInput';
import { Button, Flex } from '@chakra-ui/react';

const VideoProperties = ({ selectedItem, onUpdate }) => {
  const [videoSrc, setVideoSrc] = useState(selectedItem.src || '');
  const [videoWidth, setVideoWidth] = useState(selectedItem.width || 400);
  const [videoHeight, setVideoHeight] = useState(selectedItem.height || 300);

  useEffect(() => {
    setVideoSrc(selectedItem.src || '');
    setVideoWidth(selectedItem.width || 400);
    setVideoHeight(selectedItem.height || 300);
  }, [selectedItem]);

  const handleUpdate = (property, value) => {
    onUpdate({
      ...selectedItem,
      [property]: value,
    });
  };

  return (
    <>
      <TextInput value={videoSrc} onChange={(e) =>{ setVideoSrc(e.target.value);  handleUpdate('src', e.target.value)}} label="Video Source" type="url" placeholder="Enter video URL" />
      <SliderControl value={videoWidth} onChange={(value) => {setVideoWidth(value);handleUpdate('width', value)}} min={200} max={1000} label="Video Width" />
      <SliderControl value={videoHeight} onChange={(value) => {setVideoHeight(value);handleUpdate('height', value)}} min={200} max={1000} label="Video Height" />

    </>
  );
};

export default VideoProperties;
