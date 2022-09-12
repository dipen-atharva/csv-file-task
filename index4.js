const rl = require('readline');
const fs = require('fs');

var arr = [] ;

// fib function
var fib = function(n) {
    if ( n === 0 )  {
      return [0];
    }
    if ( n === 1 ) {
      return [0, 1];
    } else {
      var arr = fib(n - 1);
      arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
      return arr;
    }
  };

var myInterface = rl.createInterface ({
    input: process.stdin,
    output: process.stdout,
});

var f=0;
myInterface.question(`Enter the number: `, x => {
    console.log(`${fib(x-1)} + "Interface Output" ` );

    const reader = rl.createInterface({
        input: fs.createReadStream("data.csv") 
      });

    reader.on("line", (row) => {
      arr.push(row.split(","));
    });
    reader.on("close", () => {

        console.log(arr);
        for (let i = 0; i < arr.length; i++) {
            if ( arr[i][0] == `${x}`) {
                f = 1;
                break;
            }      
        }
        if( f == 0) {
            arr.push(`${x},${fib(x-1)}`);
        }

        const stream = fs.createWriteStream("data.csv");
        for (let i of arr) { 
            stream.write(i + "\r\n"); 
        }
        console.log("arr :-"+ arr);
        
        stream.end(); 


      });
      
    myInterface.close();
});