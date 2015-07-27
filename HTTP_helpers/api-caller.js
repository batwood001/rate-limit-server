var https = require('https');
var apiKey = '2d13bb23-9bde-4668-82a0-2c0615eb6a92';

exports.apiCaller = {};

exports.apiCaller.get = function(url, cb) {
  https.get(url + '?api_key=' + apiKey, function(response){

    if (response.statusCode === 429) cb('429') // change this to real error

    var data = '';

    response.on('data', function(stream) {
      data += stream
    })

    response.on('end', function(){
      cb(data)
    })

  })
}