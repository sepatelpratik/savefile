import express from 'express';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;
const FILE_DIR = path.join(process.cwd(), 'files');
const FILE_PATH = path.join(FILE_DIR, 'data.txt');

app.use(bodyParser.json());

// Ensure files folder and data.txt exists
if (!fs.existsSync(FILE_DIR)) {
  fs.mkdirSync(FILE_DIR);
}
if (!fs.existsSync(FILE_PATH)) {
  fs.writeFileSync(FILE_PATH, '', 'utf-8');
}

// POST /write - write to data.txt
app.post('/write', (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'content is required' });
  }

  fs.writeFile(FILE_PATH, content, err => {
    if (err) return res.status(500).json({ error: 'Failed to write file' });
    res.json({ message: 'data.txt updated successfully' });
  });
});

// GET /read - read from data.txt
app.get('/read', (req, res) => {
  fs.readFile(FILE_PATH, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read file' });
    res.json({ content: data });
  });
});

app.use(express.static("public"));
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
