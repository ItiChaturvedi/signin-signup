const express = require('express')
require('./model/userAuth')
const jwt = require('jsonwebtoken')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

const userAuth = require('./routes/userAuth')
app.use(userAuth)


app.listen(port, () => {
    console.log(`server listening on port: ${port}`)
})