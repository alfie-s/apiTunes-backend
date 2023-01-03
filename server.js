// import fetch to express
const fetch = require('node-fetch');
// express for express
const express = require('express');
// cors just in case
const cors = require('cors');
const morgan = require('morgan');
// body parser parse all bodies as a string
// and only looks at request where the content-type matches type option
const bodyParser = require('body-parser');
const path = require('path');
// helmet to secure app
const helmet = require('helmet');
// Import routes
const routes = require('./routes/index');
// port is either on 8080 or dev environment
const PORT = process.env.PORT || 8080;
// Init express
const app = express();
//setting middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());
app.use(helmet());
// Routes
app.use('/api', routes);
// Search API
app.get(`/search`, (req, res) => {
   // Get the term from the URL
   const term = req.query.term;
   // Get the media type from the URL
   const media = req.query.media;
   //fetch request to the API using the term and media type
   fetch(`https://itunes.apple.com/search?term=${term}&media=${media}&limit=30`)
      // Change the result into json format   
      .then(result => result.json())
      .then(response => {
         // Send the response if the request was successful
         res.send({
            message: 'Search was successful',
            response
         })
      })
      .catch(error => {
         //error message
         res.send({
            message: 'There seems to be an error'
         })
      })
})

// need this for heroku although this will be deployed on netlify
if (process.env.NODE_ENV === 'production'){
   app.use(express.static(path.join(__dirname, 'Capstone/build')));
   app.get('*',(req,res)=> {res.sendFile(path.resolve(__dirname,
   'frontend', 'build','index.html'));
   });
   }
   


// arrow function console log the port this is working on
app.listen(PORT, () => {
   console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;