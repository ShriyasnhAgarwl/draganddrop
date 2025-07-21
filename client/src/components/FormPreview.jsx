import React, { useState } from 'react';
import useFormStore from '../store/formStore';
import { submitForm } from '../services/api';
import toast from 'react-hot-toast';

const FormPreview = () => {
  const { 
    formFields, 
    formName, 
    previewData, 
    updatePreviewData,
    currentSchemaId 
  } = useFormStore();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    formFields.forEach(field => {
      if (field.required && !previewData[field.id]) {
        newErrors[field.id] = `${field.label} is required`;
      }
      
      if (field.type === 'email' && previewData[field.id]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(previewData[field.id])) {
          newErrors[field.id] = 'Please enter a valid email address';
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitForm(currentSchemaId, previewData);
      toast.success('Form submitted successfully!');
      console.log('Submission result:', result);
      
      // Clear form data after successful submission
      formFields.forEach(field => {
        updatePreviewData(field.id, '');
      });
      setErrors({});
    } catch (error) {
      toast.error('Failed to submit form');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (fieldId, value) => {
    updatePreviewData(fieldId, value);
    // Clear error for this field when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => ({ ...prev, [fieldId]: undefined }));
    }
  };

  const renderField = (field) => {
    const value = previewData[field.id] || '';
    const hasError = errors[field.id];
    const baseClasses = `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
      hasError ? 'border-red-500' : 'border-gray-300'
    }`;

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className={`${baseClasses} h-24 resize-none`}
            required={field.required}
          />
        );

      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className={baseClasses}
            required={field.required}
          >
            <option value="">{field.placeholder}</option>
            {field.options?.map((option, i) => (
              <option key={i} value={option}>{option}</option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option, i) => (
              <label key={i} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  checked={value === option}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  className="text-primary-600 focus:ring-primary-500"
                  required={field.required}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={value === 'true' || value === true}
              onChange={(e) => handleFieldChange(field.id, e.target.checked)}
              className="text-primary-600 focus:ring-primary-500"
              required={field.required}
            />
            <span>{field.placeholder}</span>
          </label>
        );

      case 'file':
        return (
          <input
            type="file"
            onChange={(e) => handleFieldChange(field.id, e.target.files[0]?.name || '')}
            className={baseClasses}
            required={field.required}
          />
        );

      default:
        return (
          <input
            type={field.type}
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className={baseClasses}
            required={field.required}
          />
        );
    }
  };

  if (formFields.length === 0) {
    return (
      <div className="p-6">
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            No Form to Preview
          </h2>
          <p className="text-gray-600 mb-6">
            Create some form fields first to see the preview
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {formName || 'Untitled Form'}
            </h1>
            <p className="text-gray-600">
              Please fill out all required fields marked with *
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {formFields.map((field) => (
              <div key={field.id} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                
                {renderField(field)}
                
                {errors[field.id] && (
                  <p className="text-sm text-red-600">{errors[field.id]}</p>
                )}
              </div>
            ))}

            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-primary-600 hover:bg-primary-700'
                } text-white`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Form'
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Form Data Preview</h3>
            <pre className="text-sm text-gray-600 overflow-x-auto">
              {JSON.stringify(previewData, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPreview;