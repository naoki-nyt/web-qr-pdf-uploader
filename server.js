const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.post('/upload', upload.single('pdfFile'), (req, res) => {
  const filePath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.redirect(`/?file=${encodeURIComponent(filePath)}`);
});

app.listen(3000, () => {
  console.log('Server jalan di http://localhost:3000');
});