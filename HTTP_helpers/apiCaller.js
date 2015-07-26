var https = require('https');

exports.apiCaller = {};

exports.apiCaller.get = function(url, cb) {

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

  https.get(url, function(response) {
    cb(response.statusCode)
  })

}