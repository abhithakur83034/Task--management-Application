const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();

require('./db/config')
const User = require('./db/user')
app.use(express.json());
app.use(cors());


// Multer configuration
const storage = multer.diskStorage({
  destination: 'public/uploads',
  filename: (req, file, cb) => {
    const filename = file.originalname;
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage
});

// Route for handling file upload
app.post('/register', upload.single('image'), (req, res) => {
  try {
    const title = req.body.title;
    const image = `uploads/${req.file.originalname}`;
    const description = req.body.description;
    const date = req.body.date;
    const status = req.body.status;

   const user = {title , image , description , date , status};
   const result =  User.insertMany(user)
//    res.send(result)
    res.status(200).json({ success: true});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false});
  }
});








app.get('/show',async(req,res)=>{
    try {
        const user = await User.find(req.body)
        res.send(user)
    } catch (error) {
        console.log(error.message)
    }
});


app.delete('/delete/:id', async(req,res)=>{
   
    try {
        const user = await User.deleteOne({ _id: req.params.id})
        res.send(user)
    } catch (error) {
        console.log(error.message)
    }
});



app.get('/update/:id',async(req,res)=>{
    try {
        const user = await User.findOne({_id:req.params.id})
        if(user){
            res.send(user)
        }else{
            res.send("sorry")
        }
    } catch (error) {
        console.log(error.message)
    }
})


app.put('/update/:id',async(req,res)=>{
    try {
        const user = await User.updateOne(
            {_id:req.params.id},
            {$set : req.body}
            )
            res.send(user)
    } catch (error) {
        console.log(error.message)
    }
})


app.get('/search/:key',async(req,res)=>{
    console.log(req.params.key)
    try {
        let data = await User.find({
            "$or":[
                {"title" : {$regex:req.params.key}},
                {"description" : {$regex:req.params.key}},
                {"date" : {$regex:req.params.key}},
                {"status" : {$regex:req.params.key}},
            ]
        })
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})





app.listen(8080);