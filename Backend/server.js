const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const shortid = require('shortid');

const app = express();


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, 'public')));


async function main(){
    mongoose.connect('mongodb://localhost:27017/greetingApp')
}
main().then(()=>console.log('connected to db'))
.catch((err)=>console.log(err))

// Multer Configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

const greetingSchema = new mongoose.Schema({
    imageUrl: String,
    message: String,
    frame: String,
    uniqueUrl: String,
    createdAt: { type: Date, default: Date.now }
});

const Greeting = mongoose.model('Greeting', greetingSchema);

app.post('/api/create-greeting', upload.single('image'), async (req, res) => {
    try {
        const { message, frame } = req.body;
        const imageUrl = `/uploads/${req.file.filename}`;
        const uniqueUrl = shortid.generate();

        const greeting = new Greeting({
            imageUrl,
            message,
            frame,
            uniqueUrl
        });

        await greeting.save();
        res.json({ success: true, uniqueUrl });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
app.get('/api/greeting/:uniqueUrl', async (req, res) => {
    const { uniqueUrl } = req.params;
  
   
    const greeting = await Greeting.findOne({ uniqueUrl }); 
  
    if (!greeting) {
      return res.status(404).json({ message: 'Greeting not found' });
    }
  
    res.json(greeting);
  });
app.get('/api/greeting/:uniqueUrl', async (req, res) => {
    try {
        const greeting = await Greeting.findOne({ uniqueUrl: req.params.uniqueUrl });
        if (!greeting) {
            return res.status(404).json({ error: 'Greeting not found' });
        }
        res.json(greeting);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(5000,()=>{
    console.log('app is listening on port')
})