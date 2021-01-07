
/*
##Using callbacks only, loops through an asynchronous request.##

Detailed explanation in [README] (README.md)
*/

function asynchronousRequest(arg, callback) {
  setTimeout(() => {    //queued
    console.log(arg)
    count++
    callback()
  }, 4000);
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
}

var count = 0;
recurseHere()