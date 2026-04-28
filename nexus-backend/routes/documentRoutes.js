const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs'); 
const Document = require('../models/Document');

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, '-');
    cb(null, Date.now() + '-' + safeName);
  }
});
const upload = multer({ storage });

// API: Upload Document
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file provided" });

    const isPdf = req.file.originalname.toLowerCase().endsWith('.pdf');
    const newDoc = new Document({
      name: req.file.originalname,
      fileUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
      size: (req.file.size / 1024).toFixed(2) + ' KB',
      type: isPdf ? 'PDF' : 'DOCX',
      status: 'Pending'
    });

    await newDoc.save();
    res.status(201).json(newDoc);
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// API: Update Signature
router.put('/sign/:id', async (req, res) => {
  try {
    const { signatureImage } = req.body;
    const updated = await Document.findByIdAndUpdate(
      req.params.id, 
      { signatureData: signatureImage, status: 'Signed' },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Document not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to save signature" });
  }
});

// API: Delete Document (FIXED PATH LOGIC)
// API: Delete Document
router.delete('/:id', async (req, res) => {
  try {
    console.log("Delete request received for ID:", req.params.id);
    
    const doc = await Document.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ message: "Document not found in database" });
    }

    // 1. Attempt to delete physical file
    try {
      const fileName = doc.fileUrl.split('/').pop();
      const filePath = path.join(process.cwd(), 'uploads', fileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log("File removed from disk");
      }
    } catch (fileErr) {
      console.log("Note: Physical file could not be deleted or already missing.");
    }

    // 2. THE FIX: Changed findByIdAndRemove to findByIdAndDelete
    await Document.findByIdAndDelete(req.params.id); 
    
    console.log("Document record removed from MongoDB");
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete Route Error:", err);
    res.status(500).json({ error: "Server Error during deletion" });
  }
});

// GET all documents
router.get('/', async (req, res) => {
  try {
    const docs = await Document.find().sort({ uploadedAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching documents" });
  }
});

// GET a single document by ID
router.get('/:id', async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: "Error fetching document details" });
  }
});

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const Document = require('../models/Document');

// // Multer Storage Configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => {
//     // Sanitize filename: replace spaces with dashes to prevent URL breaks
//     const safeName = file.originalname.replace(/\s+/g, '-');
//     cb(null, Date.now() + '-' + safeName);
//   }
// });
// const upload = multer({ storage });

// // API: Upload Document
// router.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file provided" });
//     }

//     // Determine type (PDF or DOCX) based on extension
//     const isPdf = req.file.originalname.toLowerCase().endsWith('.pdf');

//     const newDoc = new Document({
//       name: req.file.originalname,
//       fileUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
//       size: (req.file.size / 1024).toFixed(2) + ' KB',
//       type: isPdf ? 'PDF' : 'DOCX', // CRITICAL: This fixes the alert on DocumentsPage
//       status: 'Pending'
//     });

//     await newDoc.save();
//     res.status(201).json(newDoc);
//   } catch (err) {
//     console.error("Upload Error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // API: Update Signature (THE FIX IS HERE)
// router.put('/sign/:id', async (req, res) => {
//   try {
//     const { signatureImage } = req.body; // Getting the Base64 string from frontend

//     const updated = await Document.findByIdAndUpdate(
//       req.params.id, 
//       { 
//         signatureData: signatureImage, // Mapping frontend 'signatureImage' to backend 'signatureData'
//         status: 'Signed' 
//       },
//       { new: true }
//     );

//     if (!updated) return res.status(404).json({ message: "Document not found" });
    
//     res.json(updated);
//   } catch (err) {
//     console.error("Signing Error:", err);
//     res.status(500).json({ error: "Failed to save signature" });
//   }
// });

// // GET all documents
// router.get('/', async (req, res) => {
//   try {
//     const docs = await Document.find().sort({ uploadedAt: -1 });
//     res.json(docs);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching documents" });
//   }
// });

// // GET a single document by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const doc = await Document.findById(req.params.id);
//     if (!doc) return res.status(404).json({ message: "Document not found" });
//     res.json(doc);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching document details" });
//   }
// });

// module.exports = router;

