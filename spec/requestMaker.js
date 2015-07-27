var request = require('request');

var name = 'Blogtastic';
var testUrl = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + name;

var response = '';

request('http://localhost:3000/riotrequest?riotUrl=' + testUrl, function(err, res, body) {
  console.log(res.body)
})