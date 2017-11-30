const express = require('express'); 
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

//middlewares
require('dotenv').config();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//auth middlewares
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
	secret: process.env.SECRET_KEY,
	resave: false,
	saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

//index route
app.get('/', (req,res) => {
	res.send('hello world')
});


//error handler
app.use('*', (req,res) => {
	res.status(400).json({
		message: 'Not found'
	});
});
