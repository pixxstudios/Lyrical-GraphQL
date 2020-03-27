const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');

const app = express();

// Replace with your mongoLab URI
const MONGO_URI = 'mongodb://pixxstudios:pixxstudios1@ds223812.mlab.com:23812/lyricaldb99';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
// mongoose.connect(MONGO_URI);
mongoose.createConnection(MONGO_URI, { useNewUrlParser: true })
    .then(client => {
        // _db = client;
        console.log('connected ... ', client);
        // callback();
    })
    .catch(err => console.log('Error ', err));
/* mongoose.connection
    .once('openUri', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error)); */

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
