const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Improved CORS configuration
app.use(cors());
app.use(express.json());

// Improved MongoDB connection with error handling
mongoose.connect('mongodb://127.0.0.1:27017/formdata', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

// Improved error handling in registration route
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'Registration successful!' });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: err.message || 'Error in saving data' });
    }
});

app.listen(5000, () => console.log('Server is running on port 5000'));