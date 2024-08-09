import { useDrag, useDrop } from 'react-dnd';
import { Box, Text, Image, Button } from '@chakra-ui/react';

// Define ItemTypes within the same file
const ItemTypes = {
  ITEM: 'item',
};

const DraggableItem = ({ item, isSelected, onSelect, moveItem }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: ItemTypes.ITEM,
    item: { id: item.id, type: item.type, left: item.left, top: item.top },
    canDrag: isSelected, // Only allow dragging if the item is selected
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: ItemTypes.ITEM,
    hover: (draggedItem) => {
      if (isSelected && draggedItem.id !== item.id) {
        moveItem(draggedItem.id, item.left, item.top);
      }
    },
  });

  return (
    <Box
      ref={(node) => dragRef(dropRef(node))}
      position="absolute"
      style={{ 
        left: item.left, 
        top: item.top,
        opacity: isDragging ? 1 : 1, // Ensure opacity is 1
      }}
      cursor={isSelected ? 'move' : 'pointer'}
      onClick={() => onSelect()}
    >
      {item.type === 'text' && (
        <Text
          borderWidth={isSelected ? '1px' : '0'}
          borderColor={isSelected ? 'purple' : 'transparent'}
          borderStyle={isSelected ? 'dotted' : 'none'}
          color={item.color}
          fontFamily={item.font}
          fontSize={`${item.size}px`}
        >
          {item.content}
        </Text>
      )}
      {item.type === 'image' && (
        <Image
          borderWidth={isSelected ? '1px' : '0'}
          borderColor={isSelected ? 'purple' : 'transparent'}
          borderStyle={isSelected ? 'dotted' : 'none'}
          src={item.src}
          alt='image'
          objectFit='cover'
          width={`${item.width}px`}
          height={`${item.height}px`}
        />
      )}
      {item.type === 'video' && (
        <video
          borderWidth={isSelected ? '1px' : '0'}
          borderColor={isSelected ? 'purple' : 'transparent'}
          borderStyle={isSelected ? 'dotted' : 'none'}
          src={item.src}
          controls
          width={`${item.width}px`}
          height={`${item.height}px`}
        />
      )}
      {item.type === 'button' && (
        <Button
          borderWidth={isSelected ? '1px' : '0'}
          borderColor={isSelected ? 'purple' : 'transparent'}
          borderStyle={isSelected ? 'dotted' : 'none'}
          colorScheme='blue' // Disable default color scheme
          bg={item.color}
          color={item.textColor}
          size={item.size}
          textAlign='center'
          width={`${item.width}px`} // Apply width
          height={`${item.height}px`} // Apply height
          _hover={{ bg: `${item.color}cc` }} // Hover state color
          _active={{ bg: `${item.color}99` }} // Active state color
        >
          {item.content}
        </Button>
      )}
    </Box>
  );
};

export default DraggableItem;
