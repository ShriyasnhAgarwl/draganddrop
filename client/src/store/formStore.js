import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

const useFormStore = create((set, get) => ({
  // Form builder state
  formFields: [],
  formName: '',
  draggedItem: null,
  
  // Preview state
  isPreviewMode: false,
  previewData: {},
  
  // Schema state
  savedSchemas: [],
  currentSchemaId: null,
  
  // Actions
  setFormName: (name) => set({ formName: name }),
  
  addField: (fieldType, index = null) => {
    const newField = {
      id: uuidv4(),
      type: fieldType,
      label: `${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)} Field`,
      placeholder: `Enter ${fieldType}...`,
      required: false,
      options: fieldType === 'radio' || fieldType === 'select' ? ['Option 1', 'Option 2'] : undefined,
    };
    
    set((state) => {
      const newFields = [...state.formFields];
      if (index !== null) {
        newFields.splice(index, 0, newField);
      } else {
        newFields.push(newField);
      }
      return { formFields: newFields };
    });
  },
  
  removeField: (fieldId) => set((state) => ({
    formFields: state.formFields.filter(field => field.id !== fieldId)
  })),
  
  updateField: (fieldId, updates) => set((state) => ({
    formFields: state.formFields.map(field => 
      field.id === fieldId ? { ...field, ...updates } : field
    )
  })),
  
  reorderFields: (dragIndex, hoverIndex) => set((state) => {
    const newFields = [...state.formFields];
    const draggedField = newFields[dragIndex];
    newFields.splice(dragIndex, 1);
    newFields.splice(hoverIndex, 0, draggedField);
    return { formFields: newFields };
  }),
  
  setDraggedItem: (item) => set({ draggedItem: item }),
  
  // Preview mode
  togglePreviewMode: () => set((state) => ({ 
    isPreviewMode: !state.isPreviewMode,
    previewData: {}
  })),
  
  updatePreviewData: (fieldId, value) => set((state) => ({
    previewData: { ...state.previewData, [fieldId]: value }
  })),
  
  // Schema management
  generateSchema: () => {
    const { formFields, formName } = get();
    return {
      name: formName || 'Untitled Form',
      fields: formFields.map(field => ({
        id: field.id,
        type: field.type,
        label: field.label,
        placeholder: field.placeholder,
        required: field.required,
        options: field.options
      }))
    };
  },
  
  loadSchema: (schema) => set({
    formName: schema.name,
    formFields: schema.fields || schema.schema?.fields || [],
    currentSchemaId: schema.id,
    isPreviewMode: false,
    previewData: {}
  }),
  
  clearForm: () => set({
    formFields: [],
    formName: '',
    currentSchemaId: null,
    isPreviewMode: false,
    previewData: {}
  }),
  
  setSavedSchemas: (schemas) => set({ savedSchemas: schemas }),
  
  addSavedSchema: (schema) => set((state) => ({
    savedSchemas: [schema, ...state.savedSchemas]
  })),
}));

export default useFormStore;