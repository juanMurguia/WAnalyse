const express = require('express');
const multer = require('multer')
const cors = require('cors');

const { contadorDeAlejos } = require("./txtProcessor");

const app = express();

app.use(cors());

app.use(express.json());

const port = process.env.PORT || 3000


const upload = multer({ dest: "uploads/" })

app.post("/uploads", upload.single("file") ,(req,res) =>{
    console.log(req.file)
    res.send("Termina")
    contadorDeAlejos( "./uploads/" + req.file.filename)
})

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});