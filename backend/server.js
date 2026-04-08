const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(compression());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('Missing MONGODB_URI — add it to backend/.env (see .env.example)');
} else {
  mongoose
    .connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
}

// Routes
// Express routes are mounted without the `/api` prefix.
// In production Vercel mounts this service at `/api`.
// In dev Vite rewrites `/api/*` -> `/*` before forwarding to backend.
app.use('/auth', require('./routes/auth'));
app.use('/essays', require('./routes/essays'));
app.use('/og', require('./routes/og'));
app.use('/upload', require('./routes/upload'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
