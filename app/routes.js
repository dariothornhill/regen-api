const regen = require('../services/gatsby');


module.exports = function(app) {
    app.get('/hello', function (req, res, next) {
        res.json({request: 'hello'});
       // return {request: 'hello'};
      });
    app.get('/site',(req, res) => {
       regen();
        res.status(201).json({staging: 'regen-stage'});
    })
}