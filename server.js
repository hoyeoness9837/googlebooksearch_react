require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { join } = require('path');
const app = express();

app.use(express.json());
app.use(express.static(join(__dirname, 'client', 'build')));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(require('./routes'));

// Connect to mongodb
const URI =
  process.env.REACT_APP_MONGODB_URI || process.env.local.REACT_APP_LOCALDB_URI;
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
