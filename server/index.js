const express = require('express');
const multer = require('multer')
const cors = require('cors');

const { Chat } = require("./chat");

const app = express();

app.use(cors());

app.use(express.json());

const port = process.env.PORT || 3000

const upload = multer({ dest: "uploads/" })


app.post("/uploads", upload.single("file") , async(req,res) =>{
    console.log(req.file)

    let chat = new Chat(req.file.filename)

    await chat.analyse();

    chat.deleteFile();
    
    res.send(chat.getData)

})


app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});