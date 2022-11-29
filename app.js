const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const loginController = require('./controllers/auth/loginController');
const registerController = require('./controllers/auth/registerController');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json(), cors());

app.post('/api/auth/v1/register', registerController.register)
app.post('/api/auth/v1/login', loginController.login)

app.listen(3000)