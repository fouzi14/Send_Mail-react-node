const express = require('express')
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors({
    origin :"http://localhost:3000"
}))
app.use('/',require('./routes/route'))

port = 8000

app.listen(port , ()=>console.log(`surver is running ${port}`))