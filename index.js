const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

// middleware
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Crud Practice server is running succesfuly !!");
})

app.listen(port , (req,res)=>{
    console.log(`CRUD server running on port : ${port}`);
})

