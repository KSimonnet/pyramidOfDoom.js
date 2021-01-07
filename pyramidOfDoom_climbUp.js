
/*
##Using callbacks only, loops through an asynchronous request.##

Detailed explanation in [README] (README.md)
*/

function asynchronousRequest(arg, callback) {
  setTimeout(() => {
    console.log(arg)  //queued (https://www.digitalocean.com/community/tutorials/understanding-the-event-loop-callbacks-promises-and-async-await-in-javascript)
    count++
    callback()
  }, 6000);
}

function firstFunction(x, callbackResolve) {
  callbackResolve(null, x + ' Simonnet')
}

// Looping through a nested asynchronous request
function recurseHere() {
  if(count < 3) {
    firstFunction('Kevin', function secondFunction(error, response) {
      if (error) {
        console.log(error)
        return
      }
      asynchronousRequest(response, recurseHere)
    })
}

var count = 0;
recurseHere()