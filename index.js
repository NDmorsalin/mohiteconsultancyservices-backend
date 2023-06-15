// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const routes = require('./routes/routes.js');
const cors = require('cors');

// create express app
const app = express();


/* ************************
        middleware 
*************************/
// enable cors
app.use(cors({
    // origin: '*', // allow all origins    
    origin: process.env.CLIENT_URL, // allow all origins    
    credentials: true
}))

app.use(cookieParser(process.env.COOKI_SECRET))

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(express.json());



/**************************
 * Database connection
 *************************/
dbConfig();

//define routes
app.use('/api', routes);
app.get('/', (req, res) => {
    res.send('Hello World');
}
)


/**************************
 * Error handling
 *************************/
// error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});



/**************************
 * Server listening
 *************************/

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
