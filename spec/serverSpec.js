var expect = require('chai').expect;
var request = require('request');
var apiCaller = require('../HTTP_helpers/apiCaller').apiCaller;

var apiKey = '2d13bb23-9bde-4668-82a0-2c0615eb6a92';
var name = 'Blogtastic';
var testUrl = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + name + '?api_key=' + apiKey;


describe('the server', function() {

  describe('the apiCaller', function(){

    it('should receive a 200 status when it pings the Riot server 9 times in 10 seconds', function(done) {
      
      var status;

      for (var i = 0; i < 9; i++) {
        apiCaller.getStatus(testUrl, function(responseStatus) {
          status = responseStatus;
        })
      }

      setTimeout(function(){
        expect(status).to.equal(200)
      }, 500);

      done()

    })


    it('should receive a 429 error when it pings the Riot server 10 times in 10 seconds', function(done) {
      
      var status;

      for (var i = 0; i < 10; i++) {
        apiCaller.getStatus(testUrl, function(responseStatus) {
          status = responseStatus;
        })
      }

      setTimeout(function(){
        expect(status).to.equal(429)
      }, 500);

      done();

    })

  })

})

// Tests:

// It:

// Should make an API call to the Riot server upon receiving a GET request from a slave

  // Need to know: How many requests can I get away with? How does the Riot server 10-second rule work?

// Should add an incoming request to a queue if the server is in refractory period

    // You will need to model the server's refractory period, as above (ln 7)

// Should still make a GET request to Riot API after submitting > 10 consecutive requests

// Should show a loading circle on the front-end whenever data are loading
