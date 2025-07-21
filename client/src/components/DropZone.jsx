import React from 'react';
import { useDrop } from 'react-dnd';
import useFormStore from '../store/formStore';

const DropZone = ({ index }) => {
  const { addField } = useFormStore();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'FIELD_TYPE',
    drop: (item) => {
      addField(item.fieldType, index);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`h-8 transition-all duration-200 ${
        isOver
          ? 'bg-primary-100 border-2 border-dashed border-primary-400 rounded-lg'
          : 'border-2 border-transparent'
      }`}
    >
      {isOver && (
        <div className="flex items-center justify-center h-full">
          <span className="text-sm text-primary-600 font-medium">
            Drop here to insert
          </span>
        </div>
      )}
    </div>
  );
};

export default DropZone;