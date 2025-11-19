const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'mahad_usuul_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mahad_usuul');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // For development, continue without DB if connection fails
    console.log('Continuing without database connection for development');
  }
};

connectDB();

// In-memory storage for contacts (for development without DB)
let contacts = [];

// Routes
app.get('/api/events', async (req, res) => {
  try {
    const Event = require('./models/Event');
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const Contact = require('./models/Contact');
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Database error:', error);
    // For development without DB, store in memory
    const contact = {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      date: new Date()
    };
    contacts.push(contact);
    console.log('Contact form submitted (in-memory):', contact);
    res.json({ message: 'Contact form submitted successfully' });
  }
});

app.get('/api/contacts', async (req, res) => {
  try {
    const Contact = require('./models/Contact');
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    // For development without DB, return in-memory contacts
    res.json(contacts);
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const User = require('./models/User');
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await user.comparePassword(password)) {
      req.session.userId = user._id;
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/register', async (req, res) => {
  try {
    const User = require('./models/User');
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(500).json({ error: 'Logout failed' });
    } else {
      res.json({ message: 'Logout successful' });
    }
  });
});

// Serve HTML files
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'about.html')));
app.get('/courses', (req, res) => res.sendFile(path.join(__dirname, 'courses.html')));
app.get('/events', (req, res) => res.sendFile(path.join(__dirname, 'events.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'contact.html')));
app.get('/payment', (req, res) => res.sendFile(path.join(__dirname, 'payment.html')));
app.get('/admin/contacts', (req, res) => res.sendFile(path.join(__dirname, 'admin-contacts.html')));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
