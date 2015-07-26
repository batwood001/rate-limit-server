var https = require('https');

exports.apiCaller = {};

exports.apiCaller.get = function(url, cb) {

  // gets response body

  https.get(url, function(response){
    var data = '';

    response.on('data', function(stream) {
      data += stream
    })

    response.on('end', function(){
      cb(data)
    })

  })

}

exports.apiCaller.getStatus = function(url, cb) {
  
  // This is only for testing purposes

  https.get(url, function(response) {
    cb(response.statusCode)
  })

}