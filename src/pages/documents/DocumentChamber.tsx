import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ShieldCheck, FileText, Loader2, AlertCircle } from 'lucide-react';
import { DocumentViewer } from '../../components/DocumentViewer';
import { SignaturePad } from '../../components/SignaturePad';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import API from '../../api/axios'; // Import the new middleman

export const DocumentChamber: React.FC = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  
  const [isSigned, setIsSigned] = useState(false);
  const [documentData, setDocumentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        setLoading(true);
        const response = await API.get(`${API_BASE_URL}/api/documents/${docId}`);
        
        let data = response.data;

        if (data.fileUrl && !data.fileUrl.startsWith('http')) {
            const fileName = data.fileUrl.split(/[\\/]/).pop();
            data.fileUrl = `${API_BASE_URL}/uploads/${fileName}`;
        }

        setDocumentData(data);
        
        if (data.status === 'Signed') {
          setIsSigned(true);
        }
        setError(null);
      } catch (err) {
        console.error("Could not load document:", err);
        setError("Failed to load document. Please check if your backend is running.");
      } finally {
        setLoading(false);
      }
    };

    if (docId) fetchDocument();
  }, [docId]);

  const handleSignatureSave = async (signatureData: string) => {
    try {
      const response = await API.put(`${API_BASE_URL}/api/documents/sign/${docId}`, {
        signatureImage: signatureData,
      });

      if (response.status === 200 || response.status === 201) {
        setIsSigned(true);
        alert("Document Signed & Verified Successfully!");
      }
    } catch (error) {
      console.error("Signature save failed:", error);
      alert("Error: Could not save signature to the server.");
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-primary-600" size={48} />
        <p className="text-gray-600 font-medium">Decrypting Secure Document...</p>
      </div>
    );
  }

  if (error || !documentData) {
    return (
      <div className="p-10 text-center flex flex-col items-center">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <p className="text-red-500 font-bold">{error || "Document not found"}</p>
        <Button className="mt-4" onClick={() => navigate('/documents')}>Back to Vault</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ChevronLeft size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Document Processing Chamber</h1>
            <p className="text-sm text-gray-500">Secure Verification Environment</p>
          </div>
        </div>
        {isSigned && (
          <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold border border-green-200">
            <ShieldCheck size={16} />
            Verified & Signed
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        <div className="lg:col-span-3">
          {/* FIX: Changed h-[800px] to h-[85vh] for better responsiveness.
              Added overflow-hidden to ensure the internal PDF scrollbar takes over.
          */}
          <Card className="h-[85vh] flex flex-col shadow-xl overflow-hidden">
            <CardHeader className="border-b bg-gray-50 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-primary-600" />
                <span className="font-medium text-gray-700 truncate">{documentData.name}</span>
              </div>
            </CardHeader>
            <CardBody className="p-0 flex-grow relative bg-gray-200 overflow-hidden">
              {documentData.fileUrl ? (
                <DocumentViewer fileUrl={documentData.fileUrl} />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">No PDF content available.</p>
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">Action Required</h2>
            </CardHeader>
            <CardBody>
              {isSigned ? (
                <div className="text-center space-y-4 py-4">
                  <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <ShieldCheck size={32} />
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-gray-900">Document Verified</p>
                    <p className="text-xs text-gray-600 px-2">E-signature timestamped and linked.</p>
                  </div>
                  <Button className="w-full" variant="outline" onClick={() => navigate('/documents')}>
                    Return to Vault
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs text-gray-500 leading-relaxed">Please review and sign below.</p>
                  <SignaturePad onSave={handleSignatureSave} />
                </div>
              )}
            </CardBody>
          </Card>

          <Card className="bg-gray-900 text-white border-none shadow-lg">
            <CardBody className="p-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">Audit Log</h3>
              <ul className="text-[10px] space-y-2 text-gray-300">
                <li className="flex justify-between border-b border-gray-800 pb-1">
                  <span>Accessed:</span> <span className="text-white">{new Date().toLocaleTimeString()}</span>
                </li>
                <li className="flex justify-between border-b border-gray-800 pb-1">
                  <span>Status:</span>
                  <span className={isSigned ? "text-green-400" : "text-yellow-400"}>
                    {isSigned ? "SIGNED" : "PENDING"}
                  </span>
                </li>
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};