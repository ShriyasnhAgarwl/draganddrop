import React, { useState } from 'react';
import useFormStore from '../store/formStore';
import { saveSchema, loadSchema } from '../services/api';
import toast from 'react-hot-toast';

const Header = () => {
  const {
    formName,
    setFormName,
    isPreviewMode,
    togglePreviewMode,
    generateSchema,
    loadSchema: loadSchemaToStore,
    clearForm,
    savedSchemas,
    addSavedSchema,
    currentSchemaId
  } = useFormStore();

  const [showLoadModal, setShowLoadModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!formName.trim()) {
      toast.error('Please enter a form name');
      return;
    }

    setIsSaving(true);
    try {
      const schema = generateSchema();
      const result = await saveSchema(formName, schema);
      addSavedSchema(result.schema);
      toast.success('Form saved successfully!');
    } catch (error) {
      toast.error('Failed to save form');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLoad = async (schemaId) => {
    try {
      const schema = await loadSchema(schemaId);
      loadSchemaToStore(schema);
      setShowLoadModal(false);
      toast.success('Form loaded successfully!');
    } catch (error) {
      toast.error('Failed to load form');
    }
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the form? This action cannot be undone.')) {
      clearForm();
      toast.success('Form cleared');
    }
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">
              🧩 Form Builder
            </h1>
            {!isPreviewMode && (
              <input
                type="text"
                placeholder="Enter form name..."
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            )}
          </div>

          <div className="flex items-center space-x-3">
            {!isPreviewMode && (
              <>
                <button
                  onClick={() => setShowLoadModal(true)}
                  className="btn-secondary"
                  disabled={savedSchemas.length === 0}
                >
                  📂 Load
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="btn-primary"
                >
                  {isSaving ? '💾 Saving...' : '💾 Save'}
                </button>
                <button
                  onClick={handleClear}
                  className="btn-secondary text-red-600 hover:bg-red-50"
                >
                  🗑️ Clear
                </button>
              </>
            )}
            
            <button
              onClick={togglePreviewMode}
              className={`font-medium py-2 px-4 rounded-lg transition-colors duration-200 ${
                isPreviewMode
                  ? 'bg-gray-600 hover:bg-gray-700 text-white'
                  : 'bg-primary-600 hover:bg-primary-700 text-white'
              }`}
            >
              {isPreviewMode ? '✏️ Edit' : '👁️ Preview'}
            </button>
          </div>
        </div>
      </header>

      {/* Load Modal */}
      {showLoadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Load Saved Form</h3>
            
            {savedSchemas.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No saved forms found</p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {savedSchemas.map((schema) => (
                  <div
                    key={schema.id}
                    className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                      currentSchemaId === schema.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                    }`}
                    onClick={() => handleLoad(schema.id)}
                  >
                    <div className="font-medium">{schema.name}</div>
                    <div className="text-sm text-gray-500">
                      Created: {new Date(schema.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowLoadModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;