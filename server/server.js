require('dns').setServers(['8.8.8.8', '1.1.1.1']);
require('dotenv').config();
// ... rest of your imports'dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const guideRoutes = require('./routes/guideRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const faqRoutes = require('./routes/faqRoutes');
const userRoutes = require('./routes/userRoutes');
const savedRoutes = require('./routes/savedRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));

app.get('/', (req, res) => {
  res.json({ message: 'International Student Portal API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/guides', guideRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/users', userRoutes);
app.use('/api/saved', savedRoutes);
app.use('/api/feedback', feedbackRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));