let fs = require("fs");
// let buffer =fs.readFileSync("./example.json");
// console.log(buffer);
// console.log("```````````````````````````````````````````````");
// let data = JSON.parse(buffer);
let data = require("./example.json");
console.log(data);
data.push({
    "name": "Tony",
    "lasr name": "Starc",
    "isAvenger":true,
    "friends": [
        "Bruce",
        "Peter",
        "Natasha"
    ],
    "age":45,
    "Address":{
        "city": "New York",
        "state": "manhatten"

    }
});

let stringData = JSON.stringify(data);
fs.writeFileSync("./example.json",stringData);