const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json(), cors());
app.use('/', require('./routes/route'))

app.listen(3000)