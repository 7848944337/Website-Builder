// src/app/Template.js
import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Box, Text, Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Template = ({ isOpen, onClose }) => {
  const router = useRouter();

  const templates = [
    {
      id: 1,
      name: 'New',
      items: [], // No items in this template
    },
    {
      id: 2,
      name: 'Template 1',
      items: [
        { id: 1, type: 'text', content: 'Welcome to My Website', left: 350, top: 50 },
        { id: 2, type: 'image', src: 'https://via.placeholder.com/150', left: 375, top: 100 },
        { id: 3, type: 'button', content: 'Click Me', left: 400, top: 300 },
      ],
    },
    {
      id: 3,
      name: 'Template 2',
      items: [
        { id: 4, type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4', left: 300, top: 50 },
        { id: 5, type: 'text', content: 'Amazing Video!', left: 380, top: 250 },
        { id: 6, type: 'button', content: 'Learn More', left: 380, top: 300 },
      ],
    },
    // Add more templates as needed
  ];

  const handleSelectTemplate = (template) => {
    // Navigate to DragDropPage with template data
    router.push({
      pathname: '/drag-drop',
      query: { template: JSON.stringify(template) },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select a Template</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {templates.map((template) => (
            <Box
              key={template.id}
              p={4}
              mb={4}
              borderWidth={1}
              borderRadius="md"
              cursor="pointer"
              onClick={() => handleSelectTemplate(template)}
            >
              <Text fontSize="lg" fontWeight="bold">{template.name}</Text>
              <Box mt={2} display="flex" flexDirection="column">
                {template.items.length === 0 ? (
                  <Text>No items in this template</Text>
                ) : (
                  template.items.map((item) => (
                    <Box key={item.id} mb={2} position="relative" p={2}>
                      {item.type === 'text' && (
                        <Text>{item.content}</Text>
                      )}
                      {item.type === 'image' && (
                        <Image src={item.src} boxSize="100px" objectFit="cover" />
                      )}
                      {item.type === 'video' && (
                        <Box width="100px">
                          <video width="100%" controls>
                            <source src={item.src} type="video/mp4" />
                          </video>
                        </Box>
                      )}
                      {item.type === 'button' && (
                        <Button>{item.content}</Button>
                      )}
                    </Box>
                  ))
                )}
              </Box>
            </Box>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Template;
