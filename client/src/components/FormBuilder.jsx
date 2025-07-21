import React from 'react';
import { useDrop } from 'react-dnd';
import useFormStore from '../store/formStore';
import FormField from './FormField';
import DropZone from './DropZone';

const FormBuilder = () => {
  const { formFields, addField } = useFormStore();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'FIELD_TYPE',
    drop: (item) => {
      addField(item.fieldType);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Form Builder
          </h2>
          <p className="text-gray-600">
            Drag form elements from the sidebar to build your form
          </p>
        </div>

        <div
          ref={drop}
          className={`min-h-96 border-2 border-dashed rounded-lg p-6 transition-colors duration-200 ${
            isOver
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-300 bg-white'
          }`}
        >
          {formFields.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Start Building Your Form
              </h3>
              <p className="text-gray-500">
                Drag form elements from the sidebar to this area
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {formFields.map((field, index) => (
                <div key={field.id}>
                  <FormField field={field} index={index} />
                  <DropZone index={index + 1} />
                </div>
              ))}
            </div>
          )}
        </div>

        {formFields.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">
                  Form Summary
                </h3>
                <p className="text-sm text-gray-600">
                  {formFields.length} field{formFields.length !== 1 ? 's' : ''} added
                </p>
              </div>
              <div className="text-sm text-gray-500">
                Required fields: {formFields.filter(f => f.required).length}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormBuilder;