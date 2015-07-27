var express = require('express');
var apiCaller = require('../HTTP_helpers/api-caller').apiCaller;
var router = express.Router();
var RateLimiter = require('limiter').RateLimiter;
var limiter = new RateLimiter(11, 10000, true); // this is a weird hack, but it works

// Rename?
router.get('/riotrequest', function(req, res, next) {

  var riotUrl = req.query.riotUrl; // VALIDATE THIS INPUT

  limiter.removeTokens(1, function(err, remainingRequests) {

    // part of the weird hack (1 instead of 0):
    if (remainingRequests > 1) {
      // if request is for static / infrequently changing data, check Redis

      // else
      apiCaller.get(riotUrl, function(data) {
        res.end(data)
      })
    } else {
      res.end('throttling')
    }

  });
})

/* ---EXPERIMENTING BELOW THIS LINE --- */

// jobs.process('new_job', function (job, done){
//   /* carry out all the job functions here */
//   job.data.res.end('its alive!')
//   console.log('Job', job.id, ' ', job.data, 'is done');
//   done && done();
// })

// function newJob(data){
//   name = name || 'Default_Name';

//   var job = jobs.create('new_job', {
//     data: data
//   });

//   job
//     .on('complete', function(){
//       console.log('Job', job.id, 'with name', job.data.name, 'is done');
//     })
//     .on('failed', function(){
//       console.log('Job', job.id, 'with name', job.data.name, 'has failed');
//     });

//   job.save();
// }

module.exports = router;
