const readline = require('readline');
const fs = require('fs');


var arr=[]

    
// *****************Fib func****************
var fib = function(n) {
    if (n === 0) {
      return [0];
    }
    if (n === 1) {
      return [0, 1];
    } else {
      var arr = fib(n - 1);
      arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
      return arr;
    }
  };
  
//   console.log(fib(8));
var f=0;
var myInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

myInterface.question(`Enter the number: `, x => {
  console.log(`${fib(x-1)}`);


var data = fs.readFileSync("data.csv").toLocaleString();
var rows = data.split(" "); 
rows.forEach((row) => {
    columns = row.split(","); 
    console.log("++"+columns);
    arr.push(rows);
    console.log("**"+arr)
    if (f==0)
    {
        console.log("here")
        // arr.push(`${x},${fib(x-1)}`)
        var tempObj = {};
        tempObj[`${x}`] = `${fib(x-1)}`;
        arr.push(tempObj);
        const myJson = JSON.stringify(arr)
        var str = myJson.replace(/\\/g,'')
        console.log(str);
        // const arr2 =new Map();
        // arr2.set(`${x},${fib(x-1)}`)
        // console.log(arr2 + "arr2")
        fs.writeFileSync("data.csv",str,"utf-8",(err)=>{
            if (!err) {
                console.log("Data Added");
            }
            else console.log(err);
        })
    }
})

  myInterface.close();
});
