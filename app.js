const express = require('express')
const app = express()
// const db = require(`${__dirname}/lib/models/index.js`)
const bodyParser = require('body-parser')
var cors = require('cors');

const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.route');
const locationRouter = require('./routes/location.route');
const availabilityRouter = require('./routes/availability.route');
const reservationRouter = require('./routes/reservation.route');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(cors());

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/location', locationRouter);
app.use('/availability', availabilityRouter);
app.use('/reservation', reservationRouter);


app.listen(3000)