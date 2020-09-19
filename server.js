require('dotenv').config();
const express = require('express');
const { join } = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.static(join(__dirname, 'client', 'build')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require('./routes'));

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'client', 'build', 'index.html'));
});

require('mongoose')
  .connect(process.env.REACT_APP_MONGODB_URI || process.env.REACT_APP_LOCAL_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT))
  .catch((err) => console.error(err));