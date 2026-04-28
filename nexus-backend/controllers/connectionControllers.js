const Connection = require('../models/Connection');

exports.sendConnectionRequest = async (req, res) => {
    try {
        const { entrepreneurId, projectId, message } = req.body;
        const investorId = req.user.id; // This comes from your Auth Middleware (JWT)

        // 1. Check if a connection already exists to avoid duplicates
        const existingConnection = await Connection.findOne({
            investor: investorId,
            entrepreneur: entrepreneurId,
            project: projectId
        });

        if (existingConnection) {
            return res.status(400).json({ message: "Request already sent for this project." });
        }

        // 2. Create the new connection
        const newConnection = new Connection({
            investor: investorId,
            entrepreneur: entrepreneurId,
            project: projectId,
            message: message || "I am interested in your project!"
        });

        await newConnection.save();
        res.status(201).json({ message: "Connection request sent successfully!" });

    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};