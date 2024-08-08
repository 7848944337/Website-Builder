// src/app/HomePage.js
import React, { useState } from 'react';
import { Box, Button, Heading, Container } from '@chakra-ui/react';
import Link from 'next/link';
import Template from './Template'; // Import the Template component

const HomePage = () => {
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);

  const openTemplateModal = () => setIsTemplateOpen(true);
  const closeTemplateModal = () => setIsTemplateOpen(false);

  return (
    <Container maxW="container.md" centerContent>
      <Box textAlign="center" mt={10}>
        <Heading mb={6} mt={200}>Website Builder</Heading>
        <Button mt={5} colorScheme="teal" size="lg" onClick={openTemplateModal}>
          Build Website
        </Button>
      </Box>
      <Template isOpen={isTemplateOpen} onClose={closeTemplateModal} />
    </Container>
  );
};

export default HomePage;
