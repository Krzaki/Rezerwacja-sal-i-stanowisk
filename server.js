const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const FILE = path.join(__dirname, 'responses.json');

app.use(express.urlencoded({ extended: true })); // parses form data
app.use(express.static(path.join(__dirname, 'public'))); // serves html + css

app.post('/submit', (req, res) => {
  let responses = [];
  if (fs.existsSync(FILE)) {
    responses = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  }

  responses.push({ ...req.body, date: new Date().toISOString() });
  fs.writeFileSync(FILE, JSON.stringify(responses, null, 2));

  res.send('Thanks! Your response was saved.');
});

app.listen(3000, () => console.log('Running on http://localhost:3000'));