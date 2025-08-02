const express = require('express');
const cors = require('cors')

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port or default to 3000


const allowedCors = ['http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedCors.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}
app.use(cors())

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello from the Node.js backend!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
