import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Text,
  Flex,
  IconButton,
  Divider,
  Tooltip,
  Input,
} from '@chakra-ui/react';
import { MdDelete, MdEdit, MdAdd, MdSave, MdUndo, MdRedo } from 'react-icons/md';
import DraggableItem from '../Elements/DraggableItem';
import PropertiesPanel from './PropertiesPanel';
import PreviewPage from './PreviewPage';
import { useDrop } from 'react-dnd';

const ItemTypes = {
  ITEM: 'item',
};

const DragDropContainer = ({ initialItems = [] }) => {
  const [pages, setPages] = useState([{ id: 0, name: 'Page 1', items: initialItems }]);
  const [currentPageId, setCurrentPageId] = useState(0);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [editingPageId, setEditingPageId] = useState(null);
  const [newPageName, setNewPageName] = useState('');

  // Undo/Redo stacks
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const currentPage = pages.find((page) => page.id === currentPageId);

  const [, drop] = useDrop({
    accept: ItemTypes.ITEM,
    drop: (item, monitor) => {
      if (selectedItemId === item.id) {
        const delta = monitor.getDifferenceFromInitialOffset();
        if (delta) {
          const left = Math.round(item.left + delta.x);
          const top = Math.round(item.top + delta.y);
          if (!checkCollision(item.id, left, top)) {
            moveItem(item.id, left, top);
          }
        }
      }
    },
  });

  useEffect(() => {
    if (initialItems.length > 0) {
      updatePageItems(initialItems);
    }
  }, [initialItems]);

  // Update the undo stack and clear the redo stack
  const updateUndoRedoStacks = (newPages) => {
    setUndoStack([...undoStack, pages]);
    setRedoStack([]); // Clear redo stack on new action
    setPages(newPages);
  };

  const moveItem = (id, left, top) => {
    const updatedItems = currentPage.items.map((item) =>
      item.id === id ? { ...item, left, top } : item
    );
    updateUndoRedoStacks(pages.map((page) =>
      page.id === currentPageId ? { ...page, items: updatedItems } : page
    ));
  };

  const addItem = (type) => {
    const newItem = {
      id: Date.now(),
      type,
      content: 'TEXT',
      left: 100,
      top: 100,
    };
    updateUndoRedoStacks(pages.map((page) =>
      page.id === currentPageId ? { ...page, items: [...currentPage.items, newItem] } : page
    ));
  };

  const removeItem = () => {
    updateUndoRedoStacks(pages.map((page) =>
      page.id === currentPageId ? { ...page, items: currentPage.items.filter((item) => item.id !== selectedItemId) } : page
    ));
    setSelectedItemId(null);
    setIsPanelVisible(false);
  };

  const editItem = () => {
    setIsPanelVisible(true);
  };


  const selectItem = (id) => {
    setSelectedItemId(id);
  };

  const deselectItem = () => {
    setSelectedItemId(null);
    setIsPanelVisible(false);
  };

  const checkCollision = (id, left, top) => {
    return currentPage.items.some(
      (item) =>
        item.id !== id &&
        Math.abs(item.left - left) < 0 &&
        Math.abs(item.top - top) < 0
    );
  };

  const handleContainerClick = (event) => {
    if (event.target.classList.contains('drag-drop-container')) {
      deselectItem();
    }
  };

  const addPage = () => {
    const newPageId = pages.length;
    updateUndoRedoStacks([...pages, { id: newPageId, name: `Page ${newPageId + 1}`, items: [] }]);
    setCurrentPageId(newPageId);
    setSelectedItemId(null);
    setIsPanelVisible(false);
  };

  const deletePage = () => {
    if (pages.length > 1) {
      const remainingPages = pages.filter((page) => page.id !== currentPageId);
      updateUndoRedoStacks(remainingPages);
      setCurrentPageId(remainingPages[0].id);
      setSelectedItemId(null);
      setIsPanelVisible(false);
    }
  };

  const switchPage = (pageId) => {
    setCurrentPageId(pageId);
    setSelectedItemId(null);
    setIsPanelVisible(false);
  };

  const updatePageItems = (items) => {
    setPages((prevPages) =>
      prevPages.map((page) =>
        page.id === currentPageId ? { ...page, items } : page
      )
    );
  };

  const handleEditPageName = (pageId) => {
    setEditingPageId(pageId);
    const page = pages.find((p) => p.id === pageId);
    setNewPageName(page.name);
  };

  const handlePageNameChange = (e) => {
    setNewPageName(e.target.value);
  };

  const savePageName = (pageId) => {
    updateUndoRedoStacks(pages.map((page) =>
      page.id === pageId ? { ...page, name: newPageName } : page
    ));
    setEditingPageId(null);
  };

  // Undo and Redo functions
  const undo = () => {
    setSelectedItemId(null)
    const lastState = undoStack.pop();
    if (lastState) {
      setRedoStack([...redoStack, pages]);
      setPages(lastState);
    }
  };

  const redo = () => {
    setSelectedItemId(null)
    const lastRedoState = redoStack.pop();
    if (lastRedoState) {
      setUndoStack([...undoStack, pages]);
      setPages(lastRedoState);
    }
  };

  return (
    <Flex direction="column" height="100vh">
      <Box
        mb={4}
        p={4}
        bg="white"
        borderBottomWidth={1}
        borderBottomColor="gray.300"
        boxShadow="sm"
        display="flex"
        flexDirection="column"
        alignItems="center"
        ml={isPanelVisible ? '300px' : '0'}
        transition="margin-left 0.3s ease"
      >
        <Flex mb={4} alignItems="center">
          <Button onClick={() => addItem('text')} m={2}>
            Add Text
          </Button>
          <Button onClick={() => addItem('image')} m={2}>
            Add Image
          </Button>
          <Button onClick={() => addItem('video')} m={2}>
            Add Video
          </Button>
          <Button onClick={() => addItem('button')} m={2}>
            Add Button
          </Button>
        </Flex>
        
        <Divider my={4} />
        <Flex>
          {selectedItemId && (
            <>
              <IconButton
                icon={<MdEdit />}
                onClick={editItem}
                colorScheme="blue"
                aria-label="Edit Item"
                ml={2}
                isRound={true}
                size="md"
              />
              <IconButton
                icon={<MdDelete />}
                onClick={removeItem}
                colorScheme="red"
                aria-label="Remove Item"
                ml={2}
                isRound={true}
                size="md"
              />
              <Box borderRight="1px" ml={2} mt={1} h={8} borderColor="gray.300" />
            </>
          )}
         
          <IconButton
            icon={<MdUndo />}
            onClick={undo}
            colorScheme="yellow"
            aria-label="Undo"
            ml={2}
            isRound={true}
            size="md"
          />
          <IconButton
            icon={<MdRedo />}
            onClick={redo}
            colorScheme="yellow"
            aria-label="Redo"
            ml={2}
            isRound={true}
            size="md"
          />
          <Box borderRight="1px" ml={2} mt={1} h={8} borderColor="gray.300" />
          <PreviewPage pages={pages} currentPageId={currentPageId} />
        </Flex>
      </Box>

      {/* Enhanced Page Navigation */}
      <Flex
        mb={4}
        p={3}
        bg="gray.300"
        borderRadius="md"
        justifyContent="center"
        alignItems="center"
        boxShadow="sm"
        ml={isPanelVisible ? '300px' : '0'}
        transition="margin-left 0.3s ease"
      >
        {pages.map((page) => (
          <Flex key={page.id} alignItems="center">
            {editingPageId === page.id ? (
              <Input
                value={newPageName}
                onChange={handlePageNameChange}
                size="sm"
                fontSize="sm"
                width="100px"
                mr={1}
              />
            ) : (
              <Button
                onClick={() => switchPage(page.id)}
                variant={page.id === currentPageId ? 'solid' : 'outline'}
                colorScheme="blue"
                mx={1}
                size="sm"
                fontSize="sm"
                _hover={{
                  transform: 'scale(1.05)',
                  transition: 'transform 0.2s',
                }}
                _active={{
                  bg: 'blue.500',
                  transform: 'scale(0.95)',
                  transition: 'transform 0.1s',
                }}
              >
                {page.name}
              </Button>
            )}
            {editingPageId === page.id ? (
              <IconButton
                icon={<MdSave />}
                onClick={() => savePageName(page.id)}
                colorScheme="green"
                aria-label="Save Page Name"
                size="xs"
                isRound={true}
                ml={1}
              />
            ) : (
              <IconButton
                icon={<MdEdit />}
                onClick={() => handleEditPageName(page.id)}
                colorScheme="gray"
                aria-label="Edit Page Name"
                size="xs"
                isRound={true}
                ml={1}
              />
            )}
            <Box borderRight="1px" ml={2} mr={1} h={6} borderColor="gray.400" />
          </Flex>
        ))}
        <Tooltip label="Add Page" aria-label="Add Page Tooltip">
          <IconButton
            icon={<MdAdd />}
            onClick={addPage}
            colorScheme="green"
            aria-label="Add Page"
            ml={1}
            size="xs"
            isRound={true}
            _hover={{
              transform: 'scale(1.1)',
              transition: 'transform 0.2s',
            }}
            _active={{
              transform: 'scale(0.95)',
              transition: 'transform 0.1s',
            }}
          />
        </Tooltip>
        {pages.length > 1 && (
          <Tooltip label="Delete Page" aria-label="Delete Page Tooltip">
            <IconButton
              icon={<MdDelete />}
              onClick={deletePage}
              colorScheme="red"
              isRound={true}
              aria-label="Delete Page"
              ml={2}
              size="xs"
              _hover={{
                transform: 'scale(1.1)',
                transition: 'transform 0.2s',
              }}
              _active={{
                transform: 'scale(0.95)',
                transition: 'transform 0.1s',
              }}
            />
          </Tooltip>
        )}
      </Flex>

      {isPanelVisible && (
        <PropertiesPanel
          selectedItem={currentPage.items.find((item) => item.id === selectedItemId)}
          onClose={() => setIsPanelVisible(false)}
          onUpdate={(updatedItem) => {
            updateUndoRedoStacks(
              pages.map((page) =>
                page.id === currentPageId
                  ? { ...page, items: page.items.map((item) =>
                      item.id === updatedItem.id ? updatedItem : item
                    )}
                  : page
              )
            );
            setIsPanelVisible(false);
          }}
        />
      )}
     
          
         
      <Box
        ref={drop}
        className="drag-drop-container"
        flex="1"
        p={4}
        bg="gray.100"
        position="relative"
        overflow="auto"
        onClick={handleContainerClick}
        ml={isPanelVisible ? '300px' : '0'}
        transition="margin-left 0.3s ease"
      >
        {currentPage.items.length === 0 && (
          <Text textAlign="center" color="gray.500">
            No items to display. Add items to start building your website.
          </Text>
        )}
        {currentPage.items.map((item) => (
          <DraggableItem
            key={item.id}
            item={item}
            isSelected={selectedItemId === item.id}
            onSelect={() => selectItem(item.id)}
            moveItem={(id, left, top) => moveItem(id, left, top)}
            findItem={(id) =>
              setPages((prevPages) =>
                prevPages.map((page) =>
                  page.id === currentPageId
                    ? {
                        ...page,
                        items: page.items.map((i) =>
                          i.id === id ? { ...i, left: i.left, top: i.top } : i
                        ),
                      }
                    : page
                )
              )
            }
          />
        ))}
      </Box>
    </Flex>
  );
};

export default DragDropContainer;
