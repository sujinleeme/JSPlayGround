[Link](https://www.hackerrank.com/challenges/simple-array-sum)

```javascript
var split = require("split");
var Transform = require("stream").Transform;
var util = require("util");

util.inherits(ProblemStream, Transform);
function ProblemStream () {
    Transform.call(this, { "objectMode": true });
    this.numSize = null;
    this.numArr = null
    this.resultSum = null;
}

ProblemStream.prototype._transform = function (line, encoding, processed) {
    if (this.numSize === null) { 
        console.log(this.numSize)
        this.numSize = +line;
    }
    else {
        this.numArr = line.split(" ").map(Number).filter(Boolean);
        this.resultSum = sum(this.numArr);
        process.stdout.write(`${this.resultSum}\n`);
        process.exit();
    }
    processed();
};

function sum(arr){
    return arr.reduce((a, b) => a + b, 0);
}

process.stdin.setEncoding("utf8");

process.stdin
    .pipe(split()) // split input into lines
    .pipe(new ProblemStream()) // transform lines into problem data structures
    .pipe(process.stdout); // write solution to stdout
```
