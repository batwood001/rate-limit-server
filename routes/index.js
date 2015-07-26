var express = require('express');
// var requestQueue = require('queue/queue');
var apiCaller = require('../HTTP_helpers/apiCaller').apiCaller;
var router = express.Router();
var RateLimiter = require('limiter').RateLimiter;
var limiter = new RateLimiter(10, 10000, true); // 1s buffer, from trial and error

// GET RID OF THIS
var apiKey = '2d13bb23-9bde-4668-82a0-2c0615eb6a92';
var name = 'Blogtastic';
var testUrl = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + name + '?api_key=' + apiKey;



// naming of this endpoint?
router.get('/riotrequest', function(req, res, next) {

  limiter.removeTokens(1, function(err, remainingRequests) {

    if (remainingRequests > 0) {
      apiCaller.getStatus(testUrl, function(data) {
        res.end('' + data)
      })
    } else {
      // defer request to a queue 
      res.end('loading')
    }

  });


})

module.exports = router;
