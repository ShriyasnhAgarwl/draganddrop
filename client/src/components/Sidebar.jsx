import React from 'react';
import DraggableFieldType from './DraggableFieldType';

const fieldTypes = [
  {
    type: 'text',
    label: 'Text Input',
    icon: '📝',
    description: 'Single line text input'
  },
  {
    type: 'textarea',
    label: 'Textarea',
    icon: '📄',
    description: 'Multi-line text input'
  },
  {
    type: 'email',
    label: 'Email',
    icon: '📧',
    description: 'Email address input'
  },
  {
    type: 'number',
    label: 'Number',
    icon: '🔢',
    description: 'Numeric input'
  },
  {
    type: 'select',
    label: 'Dropdown',
    icon: '📋',
    description: 'Select from options'
  },
  {
    type: 'radio',
    label: 'Radio Buttons',
    icon: '🔘',
    description: 'Single choice from options'
  },
  {
    type: 'checkbox',
    label: 'Checkbox',
    icon: '☑️',
    description: 'Multiple selections'
  },
  {
    type: 'date',
    label: 'Date',
    icon: '📅',
    description: 'Date picker'
  },
  {
    type: 'file',
    label: 'File Upload',
    icon: '📎',
    description: 'File upload input'
  }
];

const Sidebar = () => {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Form Elements
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Drag and drop elements to build your form
      </p>
      
      <div className="space-y-3">
        {fieldTypes.map((fieldType) => (
          <DraggableFieldType
            key={fieldType.type}
            fieldType={fieldType}
          />
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">💡 Tips</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Drag elements to the form area</li>
          <li>• Click on fields to edit properties</li>
          <li>• Reorder fields by dragging</li>
          <li>• Use preview to test your form</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;