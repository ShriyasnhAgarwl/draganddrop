import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableFieldType = ({ fieldType }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FIELD_TYPE',
    item: { fieldType: fieldType.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`drag-item p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ${
        isDragging ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{fieldType.icon}</span>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{fieldType.label}</h3>
          <p className="text-sm text-gray-500">{fieldType.description}</p>
        </div>
      </div>
    </div>
  );
};

export default DraggableFieldType;