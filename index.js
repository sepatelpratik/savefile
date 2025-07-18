import express from 'express';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import {getCorporateAction,getIndexFacts} from "./corporate.js";

const app = express();
const port = process.env.PORT || 3000;
const FILE_DIR = path.join(process.cwd(), 'files');
const FILE_PATH = path.join(FILE_DIR, 'data.json');

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
  console.log(req.body);
  
  if (!content) {
    return res.status(400).json({ error: 'content is required' });
  }
  let dataToWrite = req.body;
  fs.writeFile(FILE_PATH, JSON.stringify(dataToWrite), err => {
    if (err) return res.status(500).json({ error: 'Failed to write file' });
    res.json({ message: 'data.txt updated successfully' });
  });
});

// GET /read - read from data.txt
app.get('/read', (req, res) => {
  fs.readFile(FILE_PATH, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read file' });
    res.json(JSON.parse(data));
  });
});

app.get('/corporate-action', async (req, res) => {
    try {
        const data = await getCorporateAction();
        res.json(data.data);
    } catch (error) {
        console.error("Error fetching corporate action:", error);
        res.status(500).json({ error: 'Failed to fetch corporate action' });
    }
})
app.get('/index-facts', async (req, res) => {
    try {
        const data = await getIndexFacts();
        res.json(data.data);
    } catch (error) {
        console.error("Error fetching index facts:", error);
        res.status(500).json({ error: 'Failed to fetch index facts' });
    }
})

app.use(express.static("public"));
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
