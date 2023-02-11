const express = require("express");
const { dbConnection } = require("./database/config");
const cors = require("cors");
require('dotenv').config();
//servidor express

const app = express();


//DB
dbConnection();
//CORS

app.use(cors());

//Leer body
app.use(express.json());
//Rutas

app.use(express.static('public'));
app.use("/api/auth", require('./routes/auth'));


//Escuchar peticiones

app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`)
})