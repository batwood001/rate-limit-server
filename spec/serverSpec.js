var expect = require('chai').expect;
var request = require('request');
var apiCaller = require('../HTTP_helpers/apiCaller').apiCaller;

var apiKey = '2d13bb23-9bde-4668-82a0-2c0615eb6a92';
var name = 'Blogtastic';
var testUrl = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + name + '?api_key=' + apiKey;


describe('the server', function() {
  // Set Mocha timeout to 1 minute
  this.timeout(60000)

  describe('the apiCaller', function(){
    
    // wait 10 seconds before each test
    beforeEach(function(done){
      console.log("Waiting 10s...");
      setTimeout(function(){
        done();
      }, 10000);
    });

    it('should receive a 200 status when it pings the Riot server 10 times in a row', function(done) {
        
      var throttled = false;

      console.log('---- 10 times ----');

      for (var i = 0; i < 10; i++) {
        apiCaller.getStatus(testUrl, function(responseStatus) {
          console.log(responseStatus)
          if (responseStatus === 429) throttled = true;
        })
      }

      setTimeout(function() {
        expect(throttled).to.equal(false)
        done()
      }, 500);
    
    })

    it('should receive a 429 error when it pings the Riot server 11 times in a row', function(done) {
      
      var throttled = false;
      console.log('---- 11 times ----');

      for (var i = 0; i < 11; i++) {
        apiCaller.getStatus(testUrl, function(responseStatus) {
          console.log(responseStatus)
          if (responseStatus === 429) throttled = true;
        })
      }

      setTimeout(function() {
        expect(throttled).to.equal(true)
        done()
      }, 500);

    })

    it('should receive a 200 status when it pings the Riot server 10 times in ten seconds', function(done) {
      
      var throttled = false;
      console.log('---- 10 times 10 seconds ----');

      (function countDownWithDelay(i) {          
        setTimeout(function() {   
          apiCaller.getStatus(testUrl, function(responseStatus) {
            console.log(i + ' ' + responseStatus);
            if (responseStatus === 429) throttled = true;
          })                
          if (--i) countDownWithDelay(i); //  decrement i and call myLoop again if i > 0
        }, 1000)
      })(10);

      setTimeout(function() {
        expect(throttled).to.equal(false)
        done();
      }, 12000);
      
    })       

    it('should receive a 429 error when it pings the Riot server 11 times in ten seconds', function(done) {
      
      var throttled = false;
      console.log('---- 11 times 10 seconds ----');

      (function countDownWithDelay (i) {          
        setTimeout(function() {   
          apiCaller.getStatus(testUrl, function(responseStatus) {
            console.log(i + ' ' + responseStatus);
            if (responseStatus === 429) throttled = true;
          })                
          if (--i) countDownWithDelay(i);
        }, (9999 / 11))
      })(11); 
        
      setTimeout(function() { 
        expect(throttled).to.equal(true)
        done()
      }, 12000);  

    })

  })

})

// console.time("1")
// console.time("2")
// setTimeout(function(){
//   console.timeEnd("1");
//   setTimeout(function(){
//     console.timeEnd("2")
//   }, 4000)
// }, 2000)

// Tests:

// It:

// Should make an API call to the Riot server upon receiving a GET request from a slave

  // Need to know: How many requests can I get away with? How does the Riot server 10-second rule work?

// Should add an incoming request to a queue if the server is in refractory period

    // You will need to model the server's refractory period, as above (ln 7)

// Should still make a GET request to Riot API after submitting > 10 consecutive requests

// Should show a loading circle on the front-end whenever data are loading
