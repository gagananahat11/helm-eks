// src/index.js
const express = require('express');
const mongoose = require('mongoose');

const {
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DB,
  MONGO_USER,
  MONGO_PASSWORD,
  NODE_ENV,
  APP_PORT,
} = process.env;
# docker exc 
if (!MONGO_HOST || !MONGO_DB) {
  console.error('Missing Mongo DB config in env');
  process.exit(1);
}

const mongoUri = `mongodb://${encodeURIComponent(MONGO_USER)}:${encodeURIComponent(MONGO_PASSWORD)}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    const app = express();
    app.get('/', (req, res) => res.send('Hello from Node app!'));
    const port = APP_PORT || 3000;
    app.listen(port, () => console.log(`Listening on ${port}`));
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });
