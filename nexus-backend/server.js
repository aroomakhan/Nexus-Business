// const path = require('path');
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const http = require('http');
// const { Server } = require('socket.io');

// require('dotenv').config();

// const app = express();
// const server = http.createServer(app);

// // 1. Initialize Socket.io (Updated CORS for Production)
// const io = new Server(server, {
//     cors: {
//         origin: "*", 
//         methods: ["GET", "POST"]
//     }
// });

// // 2. Middleware
// app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
//   next();
// });

// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // 3. Route Imports
// const authRoutes = require('./routes/authRoutes');
// const projectRoutes = require('./routes/projectRoutes');
// const connectionRoutes = require('./routes/connectionRoutes');
// const meetingRoutes = require('./routes/meetingRoutes');
// const documentRoutes = require('./routes/documentRoutes');
// const paymentRoutes = require('./routes/paymentRoutes');

// // 4. Use Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/meetings', meetingRoutes);
// app.use('/api/connections', connectionRoutes);
// app.use('/api/documents', documentRoutes);
// app.use('/api/payments', paymentRoutes);

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Main Route (Is se confirm hoga ke server chal raha hai)
// app.get('/', (req, res) => {
//     res.send('Nexus Backend with Video Signaling is Running!');
// });

// // --- SOCKET.IO SIGNALING LOGIC ---
// io.on("connection", (socket) => {
//     console.log("⚡ New User Connected:", socket.id);
//     socket.on("join-room", (roomId) => {
//         socket.join(roomId);
//         socket.to(roomId).emit("user-connected", socket.id);
//     });
//     socket.on("signal", (data) => {
//         io.to(data.to).emit("signal", { from: socket.id, signal: data.signal });
//     });
//     socket.on("disconnect", () => console.log("User disconnected"));
// });

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log('✅ Connected to MongoDB'))
//     .catch(err => console.log('❌ DB Connection Error:', err));

// // Port Logic
// const PORT = process.env.PORT || 8000;

// // Ye hissa local machine par chalne ke liye hai aur Vercel par error nahi dega
// server.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
// });

// // Vercel ke liye export
// module.exports = app;

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

require('dotenv').config();

const app = express();
const server = http.createServer(app);

// 1. Initialize Socket.io
const io = new Server(server, {

    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

// 2. Middleware
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

// IMPORTANT: JSON parser must come BEFORE routes

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 3. Route Imports

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const connectionRoutes = require('./routes/connectionRoutes');
const meetingRoutes = require('./routes/meetingRoutes');
const documentRoutes = require('./routes/documentRoutes');
const paymentRoutes = require('./routes/paymentRoutes'); // Added this

// 4. Use Routes

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/meetings', meetingRoutes);
app.use('/api/connections', connectionRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/payments', paymentRoutes); // Registered here

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send('Nexus Backend with Video Signaling is Running!');
});



// --- SOCKET.IO SIGNALING LOGIC ---

io.on("connection", (socket) => {
    console.log("⚡ New User Connected:", socket.id);
    socket.on("join-room", (roomId) => {
        socket.join(roomId);
        socket.to(roomId).emit("user-connected", socket.id);
    });
    socket.on("signal", (data) => {
        io.to(data.to).emit("signal", { from: socket.id, signal: data.signal });
    });
    socket.on("disconnect", () => console.log("User disconnected"));
});

// const PORT = process.env.PORT || 5000;
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URI)

    .then(() => {
        console.log('✅ Connected to MongoDB');
        // server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
        server.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
    })
    .catch(err => console.log('❌ DB Connection Error:', err));

module.exports = app;