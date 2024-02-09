const express = require('express')
const port = 8000
const path = require('path')

const app = express()

app.use(express.urlencoded({extended: false}))
app.set('view engine','ejs')
app.use(express.json())

app.use('/uploads',express.static(path.join(__dirname,'uploads')))

app.use('/', require('./routes/index'))


app.listen(port, (err) => {
    err ? console.log(err) && false : console.log(`Server Was Running...`);
})