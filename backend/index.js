// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./Routes/routes.js');


const database=process.env.DATABASE_URL;
mongoose.connect(database);
 const db = mongoose.connection;

 db.on('error',(e)=>{
console.log(e);
 });

db.once('connected',()=>{
    console.log('database connected');
});

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

app.use('/api',routes);



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
