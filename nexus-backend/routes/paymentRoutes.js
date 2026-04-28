const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const User = require('../models/User');

// --- 1. DEPOSIT ---
router.post('/mock-deposit', async (req, res) => {
  try {
    const { userId, amount, description } = req.body;

    const newTransaction = new Transaction({
      userId,
      amount,
      type: 'deposit',
      status: 'Completed',
      description: description || 'Funds added to wallet'
    });

    await newTransaction.save();

    await User.findByIdAndUpdate(userId, {
      $inc: { balance: amount }
    });

    res.status(201).json(newTransaction);
  } catch (err) {
    console.error("Payment Error:", err);
    res.status(500).json({ error: "Failed to process mock deposit" });
  }
});

// --- 2. WITHDRAW ---
router.post('/withdraw', async (req, res) => {
  try {
    const { userId, amount, description } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    const newTransaction = new Transaction({
      userId,
      amount,
      type: 'withdrawal',
      status: 'Completed',
      description: description || 'Withdrawal to bank account'
    });

    await newTransaction.save();

    await User.findByIdAndUpdate(userId, {
      $inc: { balance: -amount }
    });

    res.status(201).json(newTransaction);
  } catch (err) {
    console.error("Withdrawal Error:", err);
    res.status(500).json({ error: "Failed to process withdrawal" });
  }
});

// ✅ NEW: 3. INTERNAL TRANSFER
router.post('/transfer', async (req, res) => {
  try {
    const { senderId, recipientEmail, amount, description } = req.body;

    // A. Find and validate sender
    const sender = await User.findById(senderId);
    if (!sender || sender.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance for transfer" });
    }

    // B. Find and validate recipient
    const recipient = await User.findOne({ email: recipientEmail });
    if (!recipient) {
      return res.status(404).json({ error: "Recipient email not found" });
    }

    // C. Prevent self-transfers
    if (sender._id.toString() === recipient._id.toString()) {
      return res.status(400).json({ error: "Cannot transfer to yourself" });
    }

    // D. Create Debit Record for Sender
    const senderTx = new Transaction({
      userId: senderId,
      amount,
      type: 'transfer',
      status: 'Completed',
      description: `Transfer to ${recipient.name}: ${description || 'Investment'}`
    });
    await senderTx.save();

    // E. Create Credit Record for Recipient
    const recipientTx = new Transaction({
      userId: recipient._id,
      amount,
      type: 'payment',
      status: 'Completed',
      description: `Received from ${sender.name}: ${description || 'Investment'}`
    });
    await recipientTx.save();

    // F. Update Balances
    await User.findByIdAndUpdate(senderId, { $inc: { balance: -amount } });
    await User.findByIdAndUpdate(recipient._id, { $inc: { balance: amount } });

    res.status(201).json({ message: "Transfer successful" });
  } catch (err) {
    console.error("Transfer Error:", err);
    res.status(500).json({ error: "Failed to process transfer" });
  }
});

// --- 4. HISTORY ---
router.get('/history/:userId', async (req, res) => {
  try {
    const history = await Transaction.find({ userId: req.params.userId })
      .sort({ createdAt: -1 }); 
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

module.exports = router;