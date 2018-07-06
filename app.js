var ApiBuilder = require('claudia-api-builder'),
  api = new ApiBuilder();
const router = require('./app/routes');
router(api); 
module.exports = api;

