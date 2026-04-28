const express = require('express');
const router = express.Router();
const Meeting = require('../models/Meeting');

// 1. SCHEDULE a new meeting with Conflict Detection
router.post('/schedule', async (req, res) => {
  try {
    const { entrepreneur, investor, title, description, startTime, endTime } = req.body;

    // --- CONFLICT DETECTION LOGIC ---
    // Check if the investor has any 'accepted' meeting that overlaps with this time
    const existingMeeting = await Meeting.findOne({
      investor,
      status: 'accepted',
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
      ]
    });

    if (existingMeeting) {
      return res.status(400).json({ 
        message: "Investor is already booked at this time! Please choose a different slot." 
      });
    }

    const newMeeting = new Meeting({
      entrepreneur,
      investor,
      title,
      description,
      startTime,
      endTime,
      status: 'pending'
    });

    const savedMeeting = await newMeeting.save();
    res.status(201).json(savedMeeting);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error scheduling meeting" });
  }
});

// 2. GET meetings for a specific user (Entrepreneur or Investor)
router.get('/user/:userId', async (req, res) => {
  try {
    const meetings = await Meeting.find({
      $or: [
        { entrepreneur: req.params.userId },
        { investor: req.params.userId }
      ]
    })
    .populate('entrepreneur', 'name email')
    .populate('investor', 'name email')
    .sort({ startTime: 1 });

    res.json(meetings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching meetings" });
  }
});

// 3. ACCEPT Meeting
router.patch('/:id/accept', async (req, res) => {
  try {
    const updatedMeeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      { status: 'accepted' },
      { new: true }
    );
    res.json(updatedMeeting);
  } catch (err) {
    res.status(500).json({ message: "Error accepting meeting" });
  }
});

// 4. REJECT Meeting
router.patch('/:id/reject', async (req, res) => {
  try {
    const updatedMeeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );
    res.json(updatedMeeting);
  } catch (err) {
    res.status(500).json({ message: "Error rejecting meeting" });
  }
});

module.exports = router;