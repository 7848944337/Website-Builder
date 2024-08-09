// src/app/PropertiesPanel.js
import React from 'react';
import { Box, IconButton, Text, Flex } from '@chakra-ui/react';
import { MdClose } from 'react-icons/md';
import TextProperties from '../Elements/TextProperties';
import ImageProperties from '../Elements/ImageProperties';
import VideoProperties from '../Elements/VideoProperties';
import ButtonProperties from '../Elements/ButtonProperties';

const PropertiesPanel = ({ selectedItem, onClose, onUpdate }) => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      height="100vh"
      width="300px"
      bg="white"
      p={4}
      borderRightWidth={1}
      borderRightColor="gray.300"
      boxShadow="md"
      zIndex="1000"
      overflowY="auto"
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="lg" fontWeight="bold">Edit Properties</Text>
        <IconButton
          icon={<MdClose />}
          aria-label="Close Panel"
          onClick={onClose}
          variant="ghost"
        />
      </Flex>
      {selectedItem?.type === 'text' && (
        <TextProperties selectedItem={selectedItem} onUpdate={onUpdate} />
      )}
      {selectedItem?.type === 'image' && (
        <ImageProperties selectedItem={selectedItem} onUpdate={onUpdate} />
      )}
      {selectedItem?.type === 'video' && (
        <VideoProperties selectedItem={selectedItem} onUpdate={onUpdate} />
      )}
      {selectedItem?.type === 'button' && (
        <ButtonProperties selectedItem={selectedItem} onUpdate={onUpdate} />
      )}
    </Box>
  );
};

export default PropertiesPanel;
