const express = require('express');
const router = express.Router();
const Connection = require('../models/Connection');


// @route   POST /api/connections
// @desc    Send a connection request from Investor to Entrepreneur
router.post('/', async (req, res) => {
  try {
    const { investorId, entrepreneurId, projectId, message } = req.body;

    // Check if a request already exists
    const existing = await Connection.findOne({ investor: investorId, project: projectId });
    if (existing) {
      return res.status(400).json({ message: 'Request already sent for this project' });
    }

    const newConnection = new Connection({
      investor: investorId,
      entrepreneur: entrepreneurId,
      project: projectId,
      message
    });

    await newConnection.save();
    res.json(newConnection);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/connections/entrepreneur/:id
// @desc    Get all requests for a specific entrepreneur
router.get('/entrepreneur/:id', async (req, res) => {
  try {
    const requests = await Connection.find({ entrepreneur: req.params.id })
      .populate('investor', 'name email')
      .populate('project', 'title');
    res.json(requests);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Update connection status (Accept/Decline)
// router.put('/:id', async (req, res) => {
//   try {
//     const { status } = req.body;
    
//     // Validate status
//     if (!['accepted', 'rejected', 'pending'].includes(status)) {
//       return res.status(400).json({ message: "Invalid status" });
//     }

//     const updatedConnection = await Connection.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true } // Returns the updated document
//     );

//     if (!updatedConnection) {
//       return res.status(404).json({ message: "Connection request not found" });
//     }

//     res.json(updatedConnection);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// });



router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    
    // Use findByIdAndUpdate with the ID from the URL (req.params.id)
    const updatedConnection = await Connection.findByIdAndUpdate(
      req.params.id, 
      { status: status }, 
      { new: true }
    );

    if (!updatedConnection) {
      return res.status(404).json({ message: "Connection not found" });
    }

    res.json(updatedConnection);
  } catch (err) {
    console.error("PUT Error:", err); // This prints the REAL error to your terminal
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;