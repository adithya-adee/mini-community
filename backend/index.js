const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')

const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/users')

const app = express();
const port = process.env.PORT || 3001; // Use environment variable for port or default to 3001

// Middleware
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors())

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Mini Community API is running!' });
});

// ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// MONGO + SERVER
mongoose
  .connect(process.env.MONGO_URL || "mongodb+srv://MERN:adee1234@cluster0.wy94lqf.mongodb.net/community")
  .then(() => {
    console.log("Connected to mongoDB")
    app.listen(port, () => console.log(`Server Port: ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));


