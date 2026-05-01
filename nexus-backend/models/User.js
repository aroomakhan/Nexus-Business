const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true }, // Added lowercase for safer logins
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['investor', 'entrepreneur'],
        required: true,
        default: 'entrepreneur'
    },
    bio: String,

    // --- PAYMENTS BALANCE ---
    balance: {
        type: Number,
        default: 5000 // Good for testing!
    },
    history: [String], 
    preferences: [String]
}, { timestamps: true });

// Prevent model overwrite error on Vercel hot-reloads
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);



// const mongoose = require('mongoose');
// const UserSchema = new mongoose.Schema({

//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: {
//         type: String,
//         enum: ['investor', 'entrepreneur'],
//         required: true,
//         default: 'entrepreneur'
//     },
//     bio: String,

//     // --- PAYMENTS BALANCE ---
//     balance: {
//         type: Number,
//         default: 5000
//     },
//     history: [String], // Startup or Investment history
//     preferences: [String]
// }, { timestamps: true });

// module.exports = mongoose.model('User', UserSchema);