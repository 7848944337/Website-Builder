// src/app/DragDropPage.js
import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import DragDropContainer from '../app/Main/DragDropContainer'; // Adjust the import as needed
import { useRouter } from 'next/router';

const DragDropPage = () => {
  const router = useRouter();
  const { template } = router.query;
  const [initialItems, setInitialItems] = useState([]);

  useEffect(() => {
    if (template) {
      try {
        // Parse the template data from the query parameters
        const selectedTemplate = JSON.parse(template);

        // Extract and set the initial items for the DragDropContainer
        setInitialItems(selectedTemplate.items || []);
      } catch (error) {
        console.error("Failed to parse template data", error);
      }
    }
  }, [template]);

  return (
    <Box p={4}>
      {/* Pass the initialItems as a prop to DragDropContainer */}
      <DragDropContainer initialItems={initialItems} />
    </Box>
  );
};

export default DragDropPage;
