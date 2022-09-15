const rl = require('readline');
const fs = require('fs');

var arr = [] ;

var myInterface = rl.createInterface ({
    input: process.stdin,
    output: process.stdout,
});

// fib function
var fib = function( n ) {
    if ( n === 0 )  {
      return ['0'];
    }
    if ( n === 1 ) {
      return ['0', '1'];
    } else {
      var arr = fib( n - 1 );
      arr.push( (+arr[arr.length - 1] + +arr[arr.length - 2]).toString());
      return arr;
    }
};
  
  
// readline question
myInterface.question(`Enter the number: `, function interface(x) {

    const reader = rl.createInterface({
        input: fs.createReadStream("data.csv") 
      });

    reader.on( "line", ( row ) => {
      arr.push( row.split( "," ) );
      
      // console.log(row);
      if( row == `${x},${fib(x-1)}` ) {
        console.log("Duplicate Entry Found");
        reader.removeAllListeners();
      }

      // Setting header 
      if ( arr[0] != "INPUT,OUTPUT" ) {
        arr.unshift("INPUT,OUTPUT")
      }
    });

    reader.on("close", () => {
        
        // Ignoring duplicate entries
        // for (let i = 1; i < arr.length; i++) {
        //     if ( arr[i][0] == `${x}`) {
        //       console.log("close return")
        //       return;
        //       } 
        // }
        // arr.push(`${x},${fib(x-1)}`);
      
        if(!arr.find((i) => JSON.stringify(i) === JSON.stringify([x,...fib(x-1)]))){
          arr.push([x, fib(x-1).toString()].toString());
        } else {
          console.log("close else")
          return ;
        }      
       
        // Writestream 
        const stream = fs.createWriteStream("data.csv");
        stream.write(arr.join("\r\n")); 
        // console.log("arr :-"+ arr);
        stream.end(); 
    });  
    myInterface.close();
});