var express = require('express');
var requestQueue = require('queue/queue');
var apiCaller = require('HTTP_helpers/apiCaller');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// naming of this endpoint?
router.get('/riotrequest', function(req, res, next) {
  // if queue is not full
  if (queue.canMakeAPICallImmediately()){
    // handle the request immediately
    apiCaller.get(req./* path-to-url */, function(data) {
      res.end(data)
    })
    
  } else {
    queue.enqueue(req./* path-to-url */)
  }


  // else

    // defer request to a queue

      // suss out the queue details so that it fires of a request itself 
})

module.exports = router;
