import React, { useEffect } from 'react';
import useFormStore from './store/formStore';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import FormBuilder from './components/FormBuilder';
import FormPreview from './components/FormPreview';
import { fetchSchemas } from './services/api';
import toast from 'react-hot-toast';

function App() {
  const { isPreviewMode, setSavedSchemas } = useFormStore();

  useEffect(() => {
    // Load saved schemas on app start
    const loadSchemas = async () => {
      try {
        const schemas = await fetchSchemas();
        setSavedSchemas(schemas);
      } catch (error) {
        console.error('Failed to load schemas:', error);
        toast.error('Failed to load saved forms');
      }
    };

    loadSchemas();
  }, [setSavedSchemas]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar - only show in builder mode */}
        {!isPreviewMode && (
          <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
            <Sidebar />
          </div>
        )}
        
        {/* Main content area */}
        <div className={`flex-1 overflow-y-auto ${isPreviewMode ? 'w-full' : ''}`}>
          {isPreviewMode ? <FormPreview /> : <FormBuilder />}
        </div>
      </div>
    </div>
  );
}

export default App;