// arn:aws:iam::186927429556:role/regen-lambda-execution-role

const express = require('express');

const app = express();
const router = require('./app/routes');
router(app); 
app.listen(3000);

module.exports = app;