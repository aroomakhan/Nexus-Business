import React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export const DocumentViewer: React.FC<{ fileUrl: string }> = ({ fileUrl }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    /* FIX: Changed min-h-[600px] to h-full. 
       This ensures the viewer matches the 85vh height of the DocumentChamber.
    */
    <div className="h-full w-full bg-gray-100 flex flex-col overflow-hidden">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <div className="flex-grow h-full overflow-hidden">
          <Viewer 
            fileUrl={fileUrl} 
            plugins={[defaultLayoutPluginInstance]} 
            // Theme can be light or dark to match your UI
            theme="light"
          />
        </div>
      </Worker>
    </div>
  );
};