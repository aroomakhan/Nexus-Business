import React, { useRef, useState, useEffect } from 'react';
import { FileText, Upload, Download, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const DocumentsPage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/documents');
      setDocuments(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching documents", err);
      setLoading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    
    try {
      await axios.post('http://localhost:5000/api/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("File uploaded successfully!");
      fetchDocs(); 
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed.");
    }
  };

  // --- NEW: DOWNLOAD LOGIC ---
  const handleDownload = (url: string, name: string) => {
    const link = document.createElement('a');
    link.href = url;
    // This tells the browser to download instead of navigate
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  
  // --- NEW: DELETE LOGIC ---
  const handleDelete = async (id: string) => {
  if (!id) return;
  if (!window.confirm("Delete this document?")) return;

  try {
    // 1. Double check your backend port (is it 5000 or 5173?)
    const response = await axios.delete(`http://localhost:5000/api/documents/${id}`);
    
    if (response.status === 200) {
      // 2. Update the UI state immediately
      setDocuments((prev) => prev.filter((doc) => doc._id !== id));
    }
  } catch (err: any) {
    console.error("Full Error Object:", err);
    // This will tell us if it's a 404, 500, or Network Error
    alert(`Delete failed: ${err.response?.data?.message || err.message}`);
  }
};

  return (
    <div className="space-y-6 animate-fade-in">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept=".pdf,.docx,.xlsx"
      />

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600">Manage your startup's important files</p>
        </div>
        
        <Button 
          leftIcon={<Upload size={18} />} 
          onClick={handleUploadClick}
        >
          Upload Document
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900">Vault Overview</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="p-3 bg-indigo-50 rounded-lg">
               <p className="text-xs text-indigo-600 font-bold uppercase">Total Files</p>
               <p className="text-2xl font-black text-indigo-900">{documents.length}</p>
            </div>
          </CardBody>
        </Card>
        
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="flex justify-between items-center border-b">
              <h2 className="text-lg font-medium text-gray-900">All Documents</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-2">
                {loading ? (
                  <p className="text-center py-4">Scanning Vault...</p>
                ) : documents.length === 0 ? (
                  <p className="text-center py-10 text-gray-500">No documents in the chamber.</p>
                ) : (
                  documents.map(doc => {
                    const isActualPdf = doc.type === 'PDF' || doc.name.toLowerCase().endsWith('.pdf');

                    return (
                      <div
                        key={doc._id}
                        className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-all border border-transparent hover:border-gray-200 cursor-pointer group"
                        onClick={() => {
                          if (isActualPdf) {
                            navigate(`/documents/chamber/${doc._id}`);
                          } else {
                            alert("Chamber viewing is restricted to PDF files.");
                          }
                        }}
                      >
                        <div className="p-2 bg-primary-50 rounded-lg mr-4 group-hover:bg-primary-100">
                          <FileText size={24} className="text-primary-600" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-medium text-gray-900 truncate group-hover:text-primary-600 transition-colors">
                              {doc.name}
                            </h3>
                            {doc.status === 'Signed' && (
                              <Badge variant="success" size="sm">Signed</Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                            <span className="uppercase font-semibold tracking-tighter">{doc.type || 'FILE'}</span>
                            <span>{doc.size}</span>
                            <span className="capitalize px-2 py-0.5 bg-gray-100 rounded">{doc.status || 'Pending'}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 ml-4" onClick={(e) => e.stopPropagation()}> 
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="hover:bg-blue-50 text-blue-600"
                            onClick={() => handleDownload(doc.fileUrl, doc.name)}
                          >
                            <Download size={18} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="hover:bg-red-50 text-red-600"
                            onClick={() => handleDelete(doc._id)}
                          >
                            <Trash2 size={18} />
                          </Button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

// import React, { useRef, useState, useEffect } from 'react';
// import { FileText, Upload, Download, Trash2 } from 'lucide-react';
// import { Card, CardHeader, CardBody } from '../../components/ui/Card';
// import { Button } from '../../components/ui/Button';
// import { Badge } from '../../components/ui/Badge';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export const DocumentsPage: React.FC = () => {
//   const navigate = useNavigate();
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [documents, setDocuments] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDocs();
//   }, []);

//   const fetchDocs = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/documents');
//       setDocuments(res.data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching documents", err);
//       setLoading(false);
//     }
//   };

//   const handleUploadClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file);
    
//     const isPdf = file.name.toLowerCase().endsWith('.pdf');
//     formData.append('type', isPdf ? 'PDF' : 'DOCX');

//     try {
//       await axios.post('http://localhost:5000/api/documents/upload', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       alert("File uploaded successfully!");
//       fetchDocs(); 
//     } catch (err) {
//       console.error("Upload failed", err);
//       alert("Upload failed. Check console.");
//     }
//   };

//   return (
//     <div className="space-y-6 animate-fade-in">
//       <input 
//         type="file" 
//         ref={fileInputRef} 
//         onChange={handleFileChange} 
//         className="hidden" 
//         accept=".pdf,.docx,.xlsx"
//       />

//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
//           <p className="text-gray-600">Manage your startup's important files</p>
//         </div>
        
//         <Button 
//           leftIcon={<Upload size={18} />} 
//           onClick={handleUploadClick}
//         >
//           Upload Document
//         </Button>
//       </div>
      
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         <Card className="lg:col-span-1">
//           <CardHeader>
//             <h2 className="text-lg font-medium text-gray-900">Storage</h2>
//           </CardHeader>
//           <CardBody className="space-y-4">
//             <div className="space-y-2">
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-600">Used</span>
//                 <span className="font-medium text-gray-900">12.5 GB</span>
//               </div>
//               <div className="h-2 bg-gray-200 rounded-full">
//                 <div className="h-2 bg-primary-600 rounded-full" style={{ width: '65%' }}></div>
//               </div>
//             </div>
//           </CardBody>
//         </Card>
        
//         <div className="lg:col-span-3">
//           <Card>
//             <CardHeader className="flex justify-between items-center">
//               <h2 className="text-lg font-medium text-gray-900">All Documents</h2>
//             </CardHeader>
//             <CardBody>
//               <div className="space-y-2">
//                 {loading ? (
//                   <p className="text-center py-4">Loading your vault...</p>
//                 ) : documents.length === 0 ? (
//                   <p className="text-center py-4 text-gray-500">No documents found.</p>
//                 ) : (
//                   documents.map(doc => {
//                     // FIX: Smart check for PDF (database type OR file extension)
//                     const isActualPdf = doc.type === 'PDF' || doc.name.toLowerCase().endsWith('.pdf');

//                     return (
//                       <div
//                         key={doc._id}
//                         className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer group"
//                         onClick={() => {
//                           if (isActualPdf) {
//                             navigate(`/documents/chamber/${doc._id}`);
//                           } else {
//                             alert("Currently, only PDF files can be viewed in the Chamber.");
//                           }
//                         }}
//                       >
//                         <div className="p-2 bg-primary-50 rounded-lg mr-4 group-hover:bg-primary-100">
//                           <FileText size={24} className="text-primary-600" />
//                         </div>
                        
//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-center gap-2">
//                             <h3 className="text-sm font-medium text-gray-900 truncate group-hover:text-primary-600 transition-colors">
//                               {doc.name}
//                             </h3>
//                             {doc.status === 'Signed' && (
//                               <Badge variant="success" size="sm">Signed</Badge>
//                             )}
//                           </div>
                          
//                           <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
//                             <span className="uppercase">{doc.type || (isActualPdf ? 'PDF' : 'FILE')}</span>
//                             <span>{doc.size}</span>
//                             <span className="capitalize">{doc.status || 'Pending'}</span>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-center gap-2 ml-4" onClick={(e) => e.stopPropagation()}> 
//                           <Button variant="ghost" size="sm" className="p-2"><Download size={18} /></Button>
//                           <Button variant="ghost" size="sm" className="p-2 text-red-600"><Trash2 size={18} /></Button>
//                         </div>
//                       </div>
//                     );
//                   })
//                 )}
//               </div>
//             </CardBody>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };