import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import useFormStore from '../store/formStore';

const FormField = ({ field, index }) => {
  const { removeField, updateField, reorderFields } = useFormStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    label: field.label,
    placeholder: field.placeholder,
    required: field.required,
    options: field.options || []
  });

  // Drag functionality for reordering
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FORM_FIELD',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: 'FORM_FIELD',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        reorderFields(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  }));

  const handleSave = () => {
    updateField(field.id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      label: field.label,
      placeholder: field.placeholder,
      required: field.required,
      options: field.options || []
    });
    setIsEditing(false);
  };

  const addOption = () => {
    setEditData({
      ...editData,
      options: [...editData.options, `Option ${editData.options.length + 1}`]
    });
  };

  const updateOption = (optionIndex, value) => {
    const newOptions = [...editData.options];
    newOptions[optionIndex] = value;
    setEditData({ ...editData, options: newOptions });
  };

  const removeOption = (optionIndex) => {
    setEditData({
      ...editData,
      options: editData.options.filter((_, i) => i !== optionIndex)
    });
  };

  const renderFieldPreview = () => {
    const baseClasses = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent";
    
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            placeholder={field.placeholder}
            className={`${baseClasses} h-24 resize-none`}
            disabled
          />
        );
      case 'select':
        return (
          <select className={baseClasses} disabled>
            <option>{field.placeholder}</option>
            {field.options?.map((option, i) => (
              <option key={i} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option, i) => (
              <label key={i} className="flex items-center space-x-2">
                <input type="radio" name={field.id} disabled className="text-primary-600" />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );
      case 'checkbox':
        return (
          <label className="flex items-center space-x-2">
            <input type="checkbox" disabled className="text-primary-600" />
            <span>{field.placeholder}</span>
          </label>
        );
      default:
        return (
          <input
            type={field.type}
            placeholder={field.placeholder}
            className={baseClasses}
            disabled
          />
        );
    }
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`form-field group ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        </div>
        
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
            title="Edit field"
          >
            ✏️
          </button>
          <button
            onClick={() => removeField(field.id)}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
            title="Delete field"
          >
            🗑️
          </button>
          <div className="cursor-move p-1 text-gray-400 hover:text-gray-600" title="Drag to reorder">
            ⋮⋮
          </div>
        </div>
      </div>

      {renderFieldPreview()}

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Edit Field</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Label
                </label>
                <input
                  type="text"
                  value={editData.label}
                  onChange={(e) => setEditData({ ...editData, label: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Placeholder
                </label>
                <input
                  type="text"
                  value={editData.placeholder}
                  onChange={(e) => setEditData({ ...editData, placeholder: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editData.required}
                    onChange={(e) => setEditData({ ...editData, required: e.target.checked })}
                    className="text-primary-600"
                  />
                  <span className="text-sm font-medium text-gray-700">Required field</span>
                </label>
              </div>

              {(field.type === 'select' || field.type === 'radio') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Options
                  </label>
                  <div className="space-y-2">
                    {editData.options.map((option, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => updateOption(i, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                        <button
                          onClick={() => removeOption(i)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                          disabled={editData.options.length <= 1}
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addOption}
                      className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary-500 hover:text-primary-600 transition-colors"
                    >
                      + Add Option
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button onClick={handleCancel} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleSave} className="btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormField;