let fs = require("fs");
let xlsx = require("xlsx");
// let buffer =fs.readFileSync("./example.json");
// console.log(buffer);
// console.log("```````````````````````````````````````````````");
// let data = JSON.parse(buffer);
let data = require("./example.json");
// console.log(data);
// data.push({
//     "name": "Tony",
//     "lasr name": "Starc",
//     "isAvenger":true,
//     "friends": [
//         "Bruce",
//         "Peter",
//         "Natasha"
//     ],
//     "age":45,
//     "Address":{
//         "city": "New York",
//         "state": "manhatten"

//     }
// });

// let stringData = JSON.stringify(data);
// fs.writeFileSync("./example.json",stringData);

//write
function excelWriter(filePath, json, sheetName){
    // wb-> filepath , ws->name, jsondata
    // new worksheet
    let newWB = xlsx.utils.book_new();
    // json data -> excel format convert
    let newWS = xlsx.utils.json_to_sheet(data);
    // // newWB , ws, sheetname
    xlsx.utils.book_append_sheet(newWB, newWS, sheetName);
    // filepath
    xlsx.writeFile(newWB, filePath);
}


//read
function excelReader(filePath,sheetName){
    if(fs.existsSync(filePath)==false){
        return [];
    }
    let wb = xlsx.readFile(filePath);
    let excelData = wb.Sheets[sheetName];
    let ans = xlsx.utils.sheet_to_json(excelData);
    return ans;
}
