pyramidOfDoom_climbUp.js
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
# tl;dr

Using callbacks only, loops through an asynchronous request.

## Code explanation

1.  The initial execution will queue the async request (i.e. `asynchronousRequest`). At
    the end of the initial iteration, all instructions in the call stack are complete
    until exiting `recurseHere()`.

2.  Then, the event loop will check the queue for any waiting messages, starting from
    the oldest message (i.e. the initial async request). It will add it to the call stack,
    which will execute the function in the message.

3.  Here, the aforementioned (i.e. `asynchronousRequest`) function contains
    two functions: the async function (i.e. `setTimeout()`) and a callback.
    The callback was 'planted' like a Trojan so that when it's moved from the queue
    to the call stack is actually calls back `recurseHere()`,
    which re-initiates an additional iteration of the loop.

    Whilst `recurseHere()` "thought" it was finished with the initial iteration,
    it got tricked with itself aka a recursive callback (i.e. `recurseHere()`).

4.  To break the infinite loop, a counter (i.e. `count`) is used as a global variable.
    `count` was also planted in the queued function (i.e. `asynchronousRequest`).

5.  The loop is interrupted by the `If(){}` statement.

PS: `secondFunction()` was introduced for 2 purposes:
*   error handling
*   running of `firstFunction()`. Whilst the following 
    (not pseudo-code, but a simplified version of our function):
```javascript
 function recurseHere() { \
  firstFunction('Kevin', asynchronousRequest(res, recurseHere)) \
} \
 \
recurseHere() \
```
is what we ought to do, it doesn't work. `recurseHere()` holds two assigned functions 
and (for a reason I ignore), wouldn't run `firstFunction()` but, 
skips it and jumps directly into running `asynchronousRequest()`.

## See also

https://www.digitalocean.com/community/tutorials/understanding-the-event-loop-callbacks-promises-and-async-await-in-javascript