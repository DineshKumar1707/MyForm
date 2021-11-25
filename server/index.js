const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const fileUpload =  require('express-fileupload');

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api');

const CONNECTION_URL = 'mongodb+srv://dinesh:dinesh123@cluster0.3ysys.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Database is connected');
});


// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload())

// HTTP request logger
app.use(cors());
app.use(morgan('tiny'));
app.use('/api', routes);


app.listen(PORT, () => console.log(`Server Started at ${PORT}`));