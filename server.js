// server/app.js
const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();

app.use(compression());

const PORT = 8080;
// Serve static assets
// app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'dist')));

// Always return the main index.html, so react-router render the route in the client

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => console.log(`Sever started at ${PORT}`));
