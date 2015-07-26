var expect = require('chai').expect;
var request = require('request');
var apiCaller = require('../HTTP_helpers/apiCaller').apiCaller;

var apiKey = '2d13bb23-9bde-4668-82a0-2c0615eb6a92';
var name = 'Blogtastic';
var testUrl = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + name + '?api_key=' + apiKey;


describe('the server', function() {
  // Set Mocha timeout to 1 minute
  this.timeout(60000)

//   describe('the apiCaller', function(){
    
//     // wait 10 seconds before each test
//     beforeEach(function(done){
//       console.log("Waiting 10s...");
//       setTimeout(function(){
//         done();
//       }, 10000);
//     });

//     it('should receive a 200 status when it pings the Riot server 10 times in a row', function(done) {
        
//       var throttled = false;

//       console.log('---- 10 times 0 seconds ----');

//       for (var i = 0; i < 10; i++) {
//         apiCaller.getStatus(testUrl, function(responseStatus) {
//           console.log(responseStatus)
//           if (responseStatus === 429) throttled = true;
//         })
//       }

//       // this is a hacky way to test async requests
//       setTimeout(function() {
//         expect(throttled).to.equal(false)
//         done()
//       }, 1000);
    
//     })

//     it('should receive a 429 error when it pings the Riot server 11 times in a row', function(done) {
      
//       var throttled = false;
//       console.log('---- 11 times 0 seconds ----');

//       for (var i = 0; i < 11; i++) {
//         apiCaller.getStatus(testUrl, function(responseStatus) {
//           console.log(responseStatus)
//           if (responseStatus === 429) throttled = true;
//         })
//       }

//       setTimeout(function() {
//         expect(throttled).to.equal(true)
//         done()
//       }, 1000);

//     })

//     it('should receive a 200 status when it pings the Riot server 10 times in ten seconds', function(done) {
      
//       var throttled = false;
//       console.log('---- 10 times 10 seconds ----');

//       (function countDownWithDelay(i) {          
//         setTimeout(function() {   
//           apiCaller.getStatus(testUrl, function(responseStatus) {
//             console.log(i + ' ' + responseStatus);
//             if (responseStatus === 429) throttled = true;
//           })                
//           if (--i) countDownWithDelay(i); //  decrement i and call myLoop again if i > 0
//         }, 1000)
//       })(10);

//       setTimeout(function() {
//         expect(throttled).to.equal(false)
//         done();
//       }, 12000);
      
//     })       

//     it('should receive a 429 error when it pings the Riot server 11 times in ten seconds', function(done) {
      
//       var throttled = false;
//       console.log('---- 11 times 10 seconds ----');

//       (function countDownWithDelay (i) {          
//         setTimeout(function() {   
//           apiCaller.getStatus(testUrl, function(responseStatus) {
//             console.log(i + ' ' + responseStatus);
//             if (responseStatus === 429) throttled = true;
//           })                
//           if (--i) countDownWithDelay(i);
//         }, (9999 / 11))
//       })(11); 
        
//       setTimeout(function() { 
//         expect(throttled).to.equal(true)
//         done()
//       }, 12000);  

//     })

//     it('should receive a 200 status when it pings the Riot server 5 times, waits 9 seconds, pings it another 5 times, waits 3 seconds, then pings it 10 times', function(done) {
      
//       var throttled = false;

//       console.log('---- 5 times, 5 times, 10 times ----');

//       for (var i = 0; i < 5; i++) {
//         apiCaller.getStatus(testUrl, function(responseStatus) {
//           console.log(responseStatus)
//           if (responseStatus === 429) throttled = true;
//         })
//       }

//       setTimeout(function() {
//         for (var i = 0; i < 5; i++) {
//           apiCaller.getStatus(testUrl, function(responseStatus) {
//             console.log(responseStatus)
//             if (responseStatus === 429) throttled = true;
//           })
//         }
//       }, 9000)

//       setTimeout(function() {
//         for (var i = 0; i < 10; i++) {
//           apiCaller.getStatus(testUrl, function(responseStatus) {
//             console.log(responseStatus)
//             if (responseStatus === 429) throttled = true;
//           })
//         }
//       }, 12000)

//       setTimeout(function() {
//         expect(throttled).to.equal(false)
//         done()
//       }, 17000);  

//     })

// it('should receive a 429 error when it pings the Riot server 5 times, waits 9 seconds, pings it another 5 times, waits 3 seconds, then pings it 11 times', function(done) {
      
//       var throttled = false;

//       console.log('---- 5 times, 5 times, 11 times ----');

//       for (var i = 0; i < 5; i++) {
//         apiCaller.getStatus(testUrl, function(responseStatus) {
//           console.log(responseStatus)
//           if (responseStatus === 429) throttled = true;
//         })
//       }

//       setTimeout(function() {
//         for (var i = 0; i < 5; i++) {
//           apiCaller.getStatus(testUrl, function(responseStatus) {
//             console.log(responseStatus)
//             if (responseStatus === 429) throttled = true;
//           })
//         }
//       }, 9000)

//       setTimeout(function() {
//         for (var i = 0; i < 11; i++) {
//           apiCaller.getStatus(testUrl, function(responseStatus) {
//             console.log(responseStatus)
//             if (responseStatus === 429) throttled = true;
//           })
//         }
//       }, 12000)

//       setTimeout(function() {
//         expect(throttled).to.equal(true)
//         done()
//       }, 17000);  

//     })

//   })

  describe('the endpoint', function() {

    beforeEach(function(done){
      console.log("Waiting 10s...");
      setTimeout(function(){
        done();
      }, 10000);
    });

    it('should not respond with a "loading" message when pinged 10 times in a row', function(done) {
        
      var loading = false;

      console.log('---- 10 times 0 seconds ----');

      for (var i = 0; i < 10; i++) {
        request('http://localhost:3000/riotrequest', function(err, res, body) {
          if (res.body === 'loading') loading = true
        })
      }

      // this is a hacky way to test async requests
      setTimeout(function() {
        expect(loading).to.equal(false)
        done()
      }, 1000);
    
    })    

    it('should respond with a "loading" message when pinged 11 times in a row', function(done) {
        
      var loading = false;

      console.log('---- 11 times 0 seconds ----');

      for (var i = 0; i < 11; i++) {
        request('http://localhost:3000/riotrequest', function(err, res, body) {
          if (res.body === 'loading') loading = true
        })
      }

      // this is a hacky way to test async requests
      setTimeout(function() {
        expect(loading).to.equal(true)
        done()
      }, 1000);
    
    })

    it('should not receive a 429 error from the Riot server when pinged 15 times in a row', function(done) {
        
      var throttled = false;

      console.log('---- 15 times 0 seconds ----');

      for (var i = 0; i < 15; i++) {
        request('http://localhost:3000/riotrequest', function(err, res, body) {
          if (res.body === '429') throttled = true
        })
      }

      // this is a hacky way to test async requests
      setTimeout(function() {
        expect(throttled).to.equal(false)
        done()
      }, 1000);
    
    })

    it('should not receive a 429 error when pinged 5 times, waits 9 seconds, pings it another 5 times, waits 3 seconds, then pinged 11 times', function(done) {
      
      var throttled = false;

      console.log('---- 5 times, 5 times, 11 times ----');

      for (var i = 0; i < 5; i++) {
        request('http://localhost:3000/riotrequest', function(err, res, body) {
          if (res.body === '429') throttled = true
        })
      }

      setTimeout(function() {
        for (var i = 0; i < 5; i++) {
          request('http://localhost:3000/riotrequest', function(err, res, body) {
            if (res.body === '429') throttled = true
          })
        }
      }, 9000)

      setTimeout(function() {
        for (var i = 0; i < 11; i++) {
          request('http://localhost:3000/riotrequest', function(err, res, body) {
            if (res.body === '429') throttled = true
          })
        }
      }, 12000)

      setTimeout(function() {
        expect(throttled).to.equal(false)
        done()
      }, 17000);  

    })

  })

})
