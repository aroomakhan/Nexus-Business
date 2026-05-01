const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

require('dotenv').config();

const app = express();
const server = http.createServer(app);

/**
 * 1. CORS & DOMAIN CONFIGURATION
 * Add your actual Vercel frontend URL here.
 */
const allowedOrigins = [
    'http://localhost:5173', 
    'https://nexus-business-samh.vercel.app' // Updated with your full Vercel URL
];

// 2. INITIALIZE SOCKET.IO
const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"],
        credentials: true
    }
});

// 3. MIDDLEWARE
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or local scripts)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('CORS policy violation: Unauthorized origin'), false);
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 4. ROUTE IMPORTS
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const connectionRoutes = require('./routes/connectionRoutes');
const meetingRoutes = require('./routes/meetingRoutes');
const documentRoutes = require('./routes/documentRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// 5. USE ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/meetings', meetingRoutes);
app.use('/api/connections', connectionRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/payments', paymentRoutes);

// Static file hosting for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send('Nexus Backend is Running!');
});

// 6. MONGODB CONNECTION
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.log('❌ DB Connection Error:', err));

// 7. SOCKET LOGIC (Basic implementation)
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

/**
 * 8. SERVER STARTUP
 * On Vercel, the server is managed as a serverless function.
 * We only run server.listen for local development.
 */
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
        console.log(`🚀 Local Server running on port ${PORT}`);
    });
}

// 9. EXPORT FOR VERCEL
module.exports = app;

// const path = require('path');
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const http = require('http');
// const { Server } = require('socket.io');

// require('dotenv').config();

// const app = express();
// const server = http.createServer(app);

// // 1. Initialize Socket.io
// const io = new Server(server, {

//     cors: {
//         origin: "https://nexus-business-34kg.vercel.app",
//         methods: ["GET", "POST"]
//     }
// });



// // 2. Middleware
// app.use(cors({
//   origin: ["http://localhost:5173", "https://nexus-business-34kg.vercel.app"],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));
// app.use((req, res, next) => {
//   res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
//   next();
// });

// // IMPORTANT: JSON parser must come BEFORE routes

// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // 3. Route Imports

// const authRoutes = require('./routes/authRoutes');
// const projectRoutes = require('./routes/projectRoutes');
// const connectionRoutes = require('./routes/connectionRoutes');
// const meetingRoutes = require('./routes/meetingRoutes');
// const documentRoutes = require('./routes/documentRoutes');
// const paymentRoutes = require('./routes/paymentRoutes'); // Added this

// // 4. Use Routes

// app.use('/api/auth', authRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/meetings', meetingRoutes);
// app.use('/api/connections', connectionRoutes);
// app.use('/api/documents', documentRoutes);
// app.use('/api/payments', paymentRoutes); // Registered here

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

// // const PORT = process.env.PORT || 5000;
// const PORT = process.env.PORT || 5000;

// mongoose.connect(process.env.MONGO_URI)

//     .then(() => {
//         console.log('✅ Connected to MongoDB');
//         // server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//         server.listen(PORT, "0.0.0.0", () => {
//     console.log(`🚀 Server running on port ${PORT}`);
// });
//     })
//     .catch(err => console.log('❌ DB Connection Error:', err));

// module.exports = app;