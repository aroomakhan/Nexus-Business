const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper to generate Token
const generateToken = (id) => {
    // Ensure JWT_SECRET is defined in your Vercel Environment Variables
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // 1. Check if user exists
        let user = await User.findOne({ email: email.toLowerCase() });
        if (user) return res.status(400).json({ message: "User already exists" });

        // 2. Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create User
        user = new User({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            role: role ? role.toLowerCase() : 'entrepreneur'
        });

        await user.save();

        // 4. Generate Token for immediate login
        const token = generateToken(user._id);

        res.status(201).json({ 
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error("Registration Error:", err.message);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password, role } = req.body; 
        
        // 1. Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 2. Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 3. Role check
        if (role && user.role.toLowerCase() !== role.toLowerCase()) {
            return res.status(400).json({ 
                message: `This account is registered as a ${user.role}. Please use the correct portal.` 
            });
        }

        // 4. Create Token
        const token = generateToken(user._id);

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                balance: user.balance // Added balance so frontend can display it immediately
            }
        });

    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).json({ message: "Server Error" });
    }
};

// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');


// exports.registerUser = async (req, res) => {
//     try {
//         const { name, email, password, role } = req.body;

//         // 1. Check if user exists
//         let user = await User.findOne({ email });
//         if (user) return res.status(400).json({ message: "User already exists" });

//         // 2. Hash Password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // 3. Create User
//         user = new User({
//             name,
//             email: email.toLowerCase(), // Fix 1: Force email to lowercase
//             password: hashedPassword,
//             role: role.toLowerCase()    // Fix 2: Force role to lowercase
//         });

//         // await user.save();
//         // res.status(201).json({ message: "User registered successfully" });
//         // At the end of registerUser in authController.js
// await user.save();

// // Create a token so they are logged in immediately
// const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });

// res.status(201).json({ 
//     message: "User registered successfully",
//     token,
//     user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//     }
// });
//     } catch (err) {
//         res.status(500).json({ message: "Server Error", error: err.message });
//     }
// };

// exports.loginUser = async (req, res) => {
//     try {
//         // 1. Destructure all three fields from the request body
//         const { email, password, role } = req.body; 
        
//         console.log(`Login attempt for: ${email} with role: ${role}`);

//         // 2. Find user by email (force lowercase to match DB)
//         const user = await User.findOne({ email: email.toLowerCase() });
//         if (!user) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }

//         // 3. Compare the typed password with the hashed password in DB
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }

//         // 4. Role check: Ensures the user is logging in through the correct portal
//         // We use .toLowerCase() to prevent "Investor" vs "investor" mismatch
//         if (role && user.role.toLowerCase() !== role.toLowerCase()) {
//             return res.status(400).json({ 
//                 message: `This account is registered as a ${user.role}. Please select the correct role.` 
//             });
//         }

//         // 5. Create a JWT Token for the session
//         const token = jwt.sign(
//             { id: user._id }, 
//             process.env.JWT_SECRET || 'secret', 
//             { expiresIn: '1d' }
//         );

//         // 6. Send success response with user data for the frontend
//         res.json({
//             token,
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role
//             }
//         });

//     } catch (err) {
//         console.error("Login Error:", err.message);
//         res.status(500).json({ message: "Server Error", error: err.message });
//     }
// };
