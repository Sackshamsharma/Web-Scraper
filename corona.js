const request = require('request');
const cheerio= require("cheerio");
const chalk=require("chalk");
// feature  -> request
console.log("Before");
request('https://www.worldometers.info/coronavirus/', cb);
console.log("After"); 
function cb(error, response, html) {
    if(error){
        console.error('error:', error); // Print the error if one occurred
    }
    else{
        handlehtml(html);
         // Print the HTML for the Google homepage.
    }

    function handlehtml(html){
      let selTool=  cheerio.load(html);
    //   let h1s=selTool("h1");
    //   console.log(h1s.length);
        let contentarr= selTool("#maincounter-wrap span");
// for(let i=0;i<contentarr.length;i++){

//     //wrap once again
//    let data= selTool(contentarr[i]).text();
//    console.log("data ",data);
// }
      let totalcases=  selTool(contentarr[0]).text();
      let deaths=  selTool(contentarr[1]).text();
       let recovered= selTool(contentarr[2]).text();

       console.log(chalk.gray("Total cases: " +totalcases));
       console.log(chalk.red("Deaths: " +deaths));
       console.log(chalk.green("Recovery: " +recovered));
    }
}