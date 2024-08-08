// src/app/PreviewPage.js

import React, { useState } from 'react';

import { Box, Text, Image, Button,IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter, } from '@chakra-ui/react';
  import { MdVisibility } from 'react-icons/md';

const PreviewPage = ({ pages, currentPageId }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const currentPage = pages.find((page) => page.id === currentPageId);
  const closePreview = () => {
    setIsPreviewOpen(false);
  };
  const previewItem = () => {
    setIsPreviewOpen(true);
  };
  return (
   <>
   <IconButton
            icon={<MdVisibility />}
            onClick={previewItem}
            colorScheme="teal"
            aria-label="Preview Item"
            ml={2}
            isRound={true}
            size="md"
          />
    <Modal isOpen={isPreviewOpen} onClose={closePreview} size="full">
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Preview</ModalHeader>
      <Box>
        <ModalCloseButton />
      </Box>
      <ModalBody>
    <Box maxwidth='100%' height='720' border='1px' borderColor='black'
    position="relative"
    overflow="auto"

    transition="margin-left 0.3s ease">
      {currentPage.items.map((item) => (
        <Box
          key={item.id}
          position="absolute"
          left={`${item.left}px`}
          top={`${item.top}px`}
        >
          {item.type === 'text' && (
            <Text
              fontFamily={item.font}
              fontSize={`${item.size}px`}
              color={item.color}
            >
              {item.content}
            </Text>
          )}
          {item.type === 'image' && (
            <Image
              src={item.src}
              alt="preview"
              objectFit="cover"
              width={`${item.width}px`}
              height={`${item.height}px`}
            />
          )}
          {item.type === 'video' && (
            <video
              src={item.src}
              controls
              width={`${item.width}px`}
              height={`${item.height}px`}
            />
          )}
          {item.type === 'button' && (
            <Button
              bg={item.color}
              color={item.textColor}
              size={item.size}
              width={`${item.width}px`}
              height={`${item.height}px`}
              _hover={{ bg: `${item.color}cc` }}
              _active={{ bg: `${item.color}99` }}
            >
              {item.content}
            </Button>
          )}
        </Box>
      ))}
    </Box>
    </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={closePreview}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
        </>
  );
};

export default PreviewPage;
