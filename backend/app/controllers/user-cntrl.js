const User = require('../models/user-model')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const usersCltr = {}
const {sendOTPEmail} = require('.././utils/otpMail')

usersCltr.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body;
    try {
        const existingUsers = await User.find();
        let role = 'user';
        let isVerified = false;

        if (existingUsers.length === 0) {
            role = 'admin';
            isVerified = true;
        } else if (body.role === 'operator') {
            role = 'operator';
        } else if (role === 'user') {
            isVerified = true;
        }

        const salt = await bcryptjs.genSalt();
        const hashPassword = await bcryptjs.hash(body.password, salt);

        const user = new User({
            username: body.username,
            email: body.email,
            password: hashPassword,
            role: role,
            phone: body.phone,
            isVerified: isVerified
        });
  
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

usersCltr.checkAdmin = async (req, res) => {
    try {
        const adminExists = await User.exists({ role: 'admin' });
        res.json({ adminExists });
    } catch (err) {
        console.error('Error checking admin existence:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
   

usersCltr.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, phone, password } = req.body;

    console.log("Login request received:", { username, email, phone, password });

    try {
        // Find the user by email, username, or phone
        const user = await User.findOne({
            $or: [
                { email: email },
                { username: username },
                { phone: phone }
            ]
        });

        console.log("User found:", user); // Debugging line to see if a user is found

        if (user) {
            const isAuth = await bcryptjs.compare(password, user.password);
            console.log("Password comparison result:", isAuth); // Debugging line for password comparison result

            if (isAuth) {
                if (user.role === 'operator' && !user.isVerified) {
                    console.log("Operator not verified:", user.username); // Debugging line for unverified operator
                    return res.status(403).json({ errors: [{ msg: 'Operator not verified by admin' }] });
                }

                const tokenData = {
                    id: user._id,
                    role: user.role
                };

                console.log("Token data:", tokenData); // Debugging line for token data

                const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '7d' });
                console.log("JWT token:", token); // Debugging line for generated JWT token

                return res.json({ token: token });
            }
            console.log("Invalid password for user:", user.username); // Debugging line for invalid password
            return res.status(400).json({ errors: [{ msg: 'Invalid email, username, phone number, or password' }] });
        }

        console.log("User not found for:", { username, email, phone }); // Debugging line when user is not found
        res.status(400).json({ errors: [{ msg: 'Invalid email, username, phone number, or password' }] });
    } catch (err) {
        console.error("Error occurred during login:", err.message); // Debugging line for error
        res.status(500).json({ errors: [{ msg: 'Something went wrong' }] });
    }
};

    usersCltr.account = async (req, res) => {  // finding the user through token+
        try{
            const user =  await User.findById(req.user.id)
            res.json(user)
        } catch(err) {
            res.status(500).json({ error: 'something went wrong'})
        }
    }

    usersCltr.checkEmail = async (req, res) => {
    const { email } = req.query;
    //const email=req.query.email
    try{
        const user=await User.findOne({email})
        if(user){
            res.json({exists:true})
        }else{
            res.json({exists:false})
        }
    }catch(err){
        res.status(500).json('something went wrong')
    }
}

    usersCltr.checkUsername = async (req, res) => {
        const {username} = req.query
        try{
            const user = await User.findOne({username})
            if(user) {
                res.json({ exists: true})
            } else {
                res.json({ exists: false})
            }
        } catch(err) {
            res.status(500).json('something went wrong')
        }
    }

    usersCltr.checkPhone = async(req, res) => {
        const {phone} = req.query
        try{
            const user = await User.findOne({phone})
            if(user) {
                res.json({ exists: true})
            } else {
                res.json({ exists: false})
            }
        } catch(err) {
            res.status(500).json('something went w')
        }
    }
    

    usersCltr.unverified = async (req, res) => {
        try {
            const unverifiedoperators = await User.find({ role: 'operator', isVerified: false, isRejected: false });
            res.json(unverifiedoperators);
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch unverified operators' });
        }
    }

    usersCltr.verified = async(req, res) => {
        try {
            const { userId } = req.body;
            await User.findByIdAndUpdate(userId, { isVerified: true });
            res.json({ message: 'Operator verified successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Failed to verify operator' });
        }
    }

    usersCltr.reject = async(req, res) => {
        try {
            const { userId } = req.body;
            await User.findByIdAndUpdate(userId, { isRejected: true });
            res.json({ message: 'Operator rejected successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Failed to reject operator' });
        }
    }
    
    usersCltr.verifiedOperators = async (req, res) => {
        try {
            // Log to check what is being passed and what the query looks like
            console.log('Fetching verified operators...');
    
            // Query to find verified operators
            const verifiedOperators = await User.find({ role: 'operator', isVerified: true });
    
            // Log the result of the query
            console.log('Verified operators found:', verifiedOperators);
    
            // Send response with the data
            res.json(verifiedOperators);
        } catch (error) {
            // Log the error for debugging purposes
            console.error('Error fetching verified operators:', error.message);
    
            // Return the error response
            res.status(500).json({ error: 'Failed to fetch verified operators' });
        }
    };
    



    usersCltr.forgotPassword = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email } = req.body; // Only email is needed
    
        try {
            const user = await User.findOne({ email });
            if (!user) {
                console.error(`No user found with email: ${email}`);
                return res.status(404).json({ message: 'No user found for this registered email' });
            }
    
            // Send OTP email and get the OTP
            const otp = await sendOTPEmail(email, user.username);
            if (!otp) {
                console.error('Failed to send OTP email');
                return res.status(500).json({ message: 'Failed to send OTP email' });
            }
    
            // Store the OTP in the user's record with an expiration time (e.g., 10 minutes)
            user.resetPasswordToken = otp;
            user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
            await user.save();
    
            res.status(200).json({ message: 'OTP sent to email' });
        } catch (error) {
            console.error('Server error', error);
            res.status(500).json({ message: 'Server error' });
        }
    };
    
      

  //reset password
  usersCltr.resetPassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, otp, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if OTP is valid and not expired
        if (user.resetPasswordToken !== otp) {
            console.log('Invalid OTP');
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        if (user.resetPasswordExpires < Date.now()) {
            console.log('Expired OTP');
            return res.status(400).json({ message: 'Expired OTP' });
        }

        // Hash the new password and save it
        const hashedPassword = await bcryptjs.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined; // Clear the OTP fields
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = usersCltr



/*
usersCltr.register = async (req, res) => {
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array()})
    } 
    const body = req.body 
    try { 
        const salt = await bcryptjs.genSalt() 
        const hashPassword = await bcryptjs.hash(body.password, salt) 
        const user = new User(body)
        user.password = hashPassword
        await user.save() 
        res.status(201).json(user) 
    } catch(err) {
        res.status(500).json({ error: 'something went wrong'})
    }
}

usersCltr.login = async (req, res) => {
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }
    const body = req.body 
    try { 
        const user = await User.findOne({email: body.email }) 
        if(user) {
            const isAuth = await bcryptjs.compare(body.password, user.password)
            if(isAuth) {
                const tokenData = {
                    id: user._id,
                    // profileId: recruiterId
                    role: user.role 
                }
                const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '7d'})
                return res.json({ token: token })
            }
            return res.status(404).json({ errors: 'invalid email / password '})
        }
        res.status(404).json({ errors: 'invalid email / password'})
    } catch(err) {
        res.status(500).json({ errors: 'something went wrong'})
    }
    
}

usersCltr.account = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        res.json(user)
    } catch(err) {
        res.status(500).json({ error: 'something went wrong'})
    }
}

usersCltr.checkEmail = async (req, res) => {
    const email = req.query.email 
    const user = await User.findOne({ email: email })
    if(user) {
        res.json({ "is_email_registered" : true })
    } else { 
        res.json({ "is_email_registered": false  })
    }
}


module.exports = usersCltr 
*/


