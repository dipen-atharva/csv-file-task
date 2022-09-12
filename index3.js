const readline = require('readline');
const fs = require('fs');


var arr = [];

    
// *****************Fib func****************
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
  
//   console.log(fib(8));
var f=0;
var myInterface = readline.createInterface ({
  input: process.stdin,
  output: process.stdout,
});

// Interface Question
myInterface.question(`Enter the number: `, x => {
  console.log(`${fib(x-1)} + "Interface Output" ` );

  // csv header
  var csvHeaders = "input,ouput\n"
  csvHeaders =fs.appendFile("data.csv",csvHeaders,() => {
    console.log('header');
    
  })
  
  var data = fs.readFileSync("data.csv").toLocaleString();
  
    // somthing here
    arr.push(data);
    if ( f == 0 ) {

      // console.log("here")
      // arr.push(`${x},${fib(x-1)}`)
      var tempObj = {
        input : `"${x}"`,
        ouput : `${fib(x-1)}\n`
      };

      const propertyName  = Object.values(tempObj);
      console.log("1propname "+ propertyName);
      arr.push(propertyName);
      console.log("2propname " + propertyName);
      console.log("arr" + arr);
    
      for(let i = 1 ; i < arr.length ; i++ ) {

        fs.appendFile("data.csv",arr[i], "utf-8", () => {
          console.log("Log data added!");
        });

      }
        
          
    }

    myInterface.close();
});

