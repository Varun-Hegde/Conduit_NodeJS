const express = require('express')

const sequelize = require('./dbConnection')

const app = express()

app.get('/',(req,res) => {
    res.json({status:"API is running"});
})

const PORT = 8080

app.listen(PORT,() => {
    console.log(`Server running on http://localhost:8080`);
})

