const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require("uuid");
const noche = require('nocache')

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }))

app.set('view engine', 'ejs');


app.use(noche())
// load static assets
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))
app.use(cookieParser());
app.use(session({
    secret: uuidv4(), //  '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}));


mongoose.connect('mongodb://localhost:27017/crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});


app.use('/', userRoutes);
app.use('/a', adminRoutes);


// home route
// app.get('/', (req, res) =>{
//     res.render('base', { title : "Login System"});
// })

app.listen(port, ()=>{ console.log("Lostening to the server on http://localhost:3000")});