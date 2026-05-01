const express = require('express');
const router = express.Router();
const multer = require('multer');
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const Document = require('../models/Document');

// 1. AWS S3 Configuration
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    },
});

// 2. Multer Memory Storage (Required for Serverless/Vercel)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// --- API: Upload Document ---
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file provided" });

        const file = req.file;
        const safeName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;

        // Upload to S3
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `uploads/${safeName}`,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        await s3.send(new PutObjectCommand(uploadParams));

        // Construct permanent S3 URL
        const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${safeName}`;

        const newDoc = new Document({
            name: file.originalname,
            fileUrl: fileUrl,
            size: (file.size / 1024).toFixed(2) + ' KB',
            type: file.originalname.toLowerCase().endsWith('.pdf') ? 'PDF' : 'DOCX',
            status: 'Pending'
        });

        await newDoc.save();
        res.status(201).json(newDoc);
    } catch (err) {
        console.error("S3 Upload Error:", err);
        res.status(500).json({ error: "Cloud upload failed: " + err.message });
    }
});

// --- API: Update Signature ---
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

// --- API: Delete Document (S3 Version) ---
router.delete('/:id', async (req, res) => {
    try {
        const doc = await Document.findById(req.params.id);
        if (!doc) return res.status(404).json({ message: "Document not found" });

        // Extract S3 Key from the URL
        const fileKey = doc.fileUrl.split('.com/')[1];

        // 1. Delete from S3
        try {
            await s3.send(new DeleteObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: fileKey
            }));
        } catch (s3Err) {
            console.log("S3 file already gone or error:", s3Err.message);
        }

        // 2. Delete from MongoDB
        await Document.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Deleted from cloud and database" });
    } catch (err) {
        res.status(500).json({ error: "Server Error during deletion" });
    }
});

// --- API: GET All Documents ---
router.get('/', async (req, res) => {
    try {
        const docs = await Document.find().sort({ uploadedAt: -1 });
        res.json(docs);
    } catch (err) {
        res.status(500).json({ message: "Error fetching documents" });
    }
});

// --- API: GET Single Document ---
router.get('/:id', async (req, res) => {
    try {
        const doc = await Document.findById(req.params.id);
        if (!doc) return res.status(404).json({ message: "Document not found" });
        res.json(doc);
    } catch (err) {
        res.status(500).json({ message: "Error fetching document" });
    }
});

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs'); 
// const Document = require('../models/Document');

// // Multer Storage Configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => {
//     const safeName = file.originalname.replace(/\s+/g, '-');
//     cb(null, Date.now() + '-' + safeName);
//   }
// });
// const upload = multer({ storage });

// // API: Upload Document
// router.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ message: "No file provided" });

//     const isPdf = req.file.originalname.toLowerCase().endsWith('.pdf');
//     const newDoc = new Document({
//       name: req.file.originalname,
//       fileUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
//       size: (req.file.size / 1024).toFixed(2) + ' KB',
//       type: isPdf ? 'PDF' : 'DOCX',
//       status: 'Pending'
//     });

//     await newDoc.save();
//     res.status(201).json(newDoc);
//   } catch (err) {
//     console.error("Upload Error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // API: Update Signature
// router.put('/sign/:id', async (req, res) => {
//   try {
//     const { signatureImage } = req.body;
//     const updated = await Document.findByIdAndUpdate(
//       req.params.id, 
//       { signatureData: signatureImage, status: 'Signed' },
//       { new: true }
//     );
//     if (!updated) return res.status(404).json({ message: "Document not found" });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to save signature" });
//   }
// });

// // API: Delete Document (FIXED PATH LOGIC)
// // API: Delete Document
// router.delete('/:id', async (req, res) => {
//   try {
//     console.log("Delete request received for ID:", req.params.id);
    
//     const doc = await Document.findById(req.params.id);
//     if (!doc) {
//       return res.status(404).json({ message: "Document not found in database" });
//     }

//     // 1. Attempt to delete physical file
//     try {
//       const fileName = doc.fileUrl.split('/').pop();
//       const filePath = path.join(process.cwd(), 'uploads', fileName);
//       if (fs.existsSync(filePath)) {
//         fs.unlinkSync(filePath);
//         console.log("File removed from disk");
//       }
//     } catch (fileErr) {
//       console.log("Note: Physical file could not be deleted or already missing.");
//     }

//     // 2. THE FIX: Changed findByIdAndRemove to findByIdAndDelete
//     await Document.findByIdAndDelete(req.params.id); 
    
//     console.log("Document record removed from MongoDB");
//     res.status(200).json({ message: "Deleted successfully" });
//   } catch (err) {
//     console.error("Delete Route Error:", err);
//     res.status(500).json({ error: "Server Error during deletion" });
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



