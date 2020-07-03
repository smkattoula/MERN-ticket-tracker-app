// Require router from express (Router() function creates the router in express)
// Require bcrypt from bcryptjs
// Require jwt from jsonwebtoken
// Require User from the userModel


const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userModel");

// Create post request to register a user
// "/register" is the url
// When ever you make an HTTP request, you must pass into the callback the request and response
// req.body will create the 4 variables with the information in the objects of the database

router.post("/register", async (req, res) => {
    try {
        let { email, password, passwordCheck, displayName } = req.body;

        // Set up validations
        // Must validate for 1.)email, password, passwordCheck, 2.)password length, 3.)entering the same password twice, and 4.)existing email
        // For existing email, const existingUser will find the User model in our database and identify the existing email field which is equal to the values that we entered in the input field and if mongoDB finds a user, it will store that user in the existingUser variable. But if it doesn't find a user, then it will return nil  
        // displayName should display email if the user does not input a username
        // Utilize bcrypt to prevent password hacking
        // Create a variable that will create a new user
        // Create a variable that will the the new user in the database
        // 'try' method allows for the program to check for the required variables, and if there is an error it will catch it and return an error code
        

            if (!email || !password || !passwordCheck)
                return res.status(400).json({msg: "Must enter all required fields."});
            if (password.length < 5)
                return res.status(400).json({msg: "Password requires a minimum of 5 characters."});
            if (password !== passwordCheck)
                return res.status(400).json({msg: "Passwords do not match. Please enter the same password twice."});

        const existingUser = await User.findOne({email: email}); 
            if (existingUser) 
                return res.status(400).json({msg: "An account with this email aleady exists."});

            if (!displayName)
                displayName = email;    

            const salt = await bcrypt.genSalt();   
            const passwordHash = await bcrypt.hash(password, salt);
            
            const newUser = new User({
                email,
                password: passwordHash,
                displayName
            });

            const savedUser = await newUser.save();
            res.json(savedUser);
    
            } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
});

// Create a post request to login a user

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Set up validations (must require all fields to be entered, if an email does exist in the database the user recieves an error message, and use bcrypt to compare if the entered password matches the user password that is stored in the database)
        // Set up JWT. Be sure to add a JWT_SECRET password in the '.env' file

        if (!email || !password)
            return res.status(400).json({msg: "Must enter all required fields."});
        
        const user = await User.findOne({ email: email });
            if (!user)
                return res.status(400).json({msg: "No account with this email has been registered."});

        const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch)
                return res.status(400).json({ msg: "Invalid credentials." });
            
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({
                token, 
                user: {
                id: user._id, 
                displayName: user.displayName,
                },
            });        

    }   catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a delete request to delete a user account

router.delete("/delete", auth, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json(deletedUser);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

// Create a post request that checks if token and user are verified, if so, output 'true', else output 'false' 

router.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token")
        if (!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if (!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if (!user) return res.json(false);

        return res.json(true);
    }   catch (err) {
        res.status(500).json({ error: err.message })
    }
});

router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        displayName: user.displayName,
        id: user._id,
    });
});

// Export the router

module.exports = router;