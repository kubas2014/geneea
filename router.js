/* Requirements */
var express = require('express');
var router = express.Router();
var fetch = require("node-fetch");

/* GET home page. */
router.get('/', function(req, res, next) {
    return res.render('pages/home');
});

/* POST text to API for analytics */
router.post('/analyze', async (req,res,next) => {
  try {
    //Prepare request's body
    let bodyRequest = '{\n    \"id\": \"1\",\n    \"text\": \"' + req.body.text + '\",\n    \"referenceDate\": \"2016-02-01\",\n    \"analyses\": [\"entities\"]\n}'
    //Call geneea api
    let request = await fetch("https://api.geneea.com/v3/analysis", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "user_key ba0d8598e8acaa705ea7d1fd42fd6554"
      },
      body: bodyRequest,
    });
    //await response from api and return its json to client
    let response = await request.json();
    return res.render('pages/home', response);
  }
  //handle eventual errors
  catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: error.message
    });
  }
});

/* Make routes accessible elsewhere */
module.exports = router;
