import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

interface SignaturePadProps {
  onSave: (signatureData: string) => void;
}

export const SignaturePad: React.FC<SignaturePadProps> = ({ onSave }) => {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clear = () => {
    sigCanvas.current?.clear();
    setIsSubmitting(false);
  };

  const save = () => {
    if (sigCanvas.current) {
      // 1. Check if the canvas is empty
      if (sigCanvas.current.isEmpty()) {
        alert("Please provide a signature before confirming.");
        return;
      }

      setIsSubmitting(true);

      try {
        // 2. Capture the signature using the raw canvas to avoid the TypeError
        // getCanvas() is more stable than getTrimmedCanvas() in certain React environments
        const canvas = sigCanvas.current.getCanvas();
        const dataURL = canvas.toDataURL('image/png');
        
        // 3. Send to parent
        onSave(dataURL);
      } catch (err) {
        console.error("Signature capture failed:", err);
        alert("Failed to capture signature. Please try again.");
        setIsSubmitting(false); // Reset button so they can try again
      }
    }
  };

  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm">
      <h3 className="text-sm font-bold mb-2 text-gray-700">Draw your signature below:</h3>
      <div className="border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
        <SignatureCanvas
          ref={sigCanvas}
          penColor="black"
          velocityFilterWeight={0.7}
          canvasProps={{
            width: 500,
            height: 200,
            className: 'signature-canvas w-full h-full cursor-crosshair'
          }}
        />
      </div>
      <div className="flex gap-2 mt-4">
        <button 
          type="button"
          onClick={clear}
          disabled={isSubmitting}
          className="px-4 py-2 text-xs font-semibold text-gray-600 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Clear
        </button>
        <button 
          type="button"
          onClick={save}
          disabled={isSubmitting}
          className="flex-1 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700 disabled:bg-indigo-400 transition-colors"
        >
          {isSubmitting ? "Verifying..." : "Confirm Signature"}
        </button>
      </div>
      <p className="mt-2 text-[10px] text-gray-400 text-center uppercase tracking-widest">
        Secure Electronic Signature
      </p>
    </div>
  );
};