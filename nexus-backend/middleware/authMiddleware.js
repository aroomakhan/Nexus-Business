const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Add user id from payload to request object
            req.user = decoded.id;
            return next(); // Use return to ensure we stop here
        } catch (error) {
            console.error("JWT Verification Error:", error.message);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };

// const jwt = require('jsonwebtoken');
// const protect = (req, res, next) => {

//     let token;
//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         try {
//             // Get token from header
//             token = req.headers.authorization.split(' ')[1];

//             // Verify token
//             const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

//             // Add user id from payload to request object
//             req.user = decoded.id;
//             next();
//         } catch (error) {
//             res.status(401).json({ message: 'Not authorized, token failed' });
//         }
//     }
//     if (!token) {
//         res.status(401).json({ message: 'Not authorized, no token' });
//     }
// };

// module.exports = { protect };