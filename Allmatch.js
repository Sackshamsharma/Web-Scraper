const request= require("request");
const cheerio= require("cheerio");
const scoreCardObj = require("./scorecard");
function getAllMatchesLink(url){
    //direct function
    request(url,function(err, response, html){
        if(err){
            console.log(err);
            }
            else{
                extractAllLinks(html);
            }
    })

}

function extractAllLinks(html){
    let $ = cheerio.load(html);
    // $ is interface here
    let scorecardElems = $("a[data-hover='Scorecard']");
    for(let i=0;i<scorecardElems.length;i++){
        let link = $(scorecardElems[i]).attr("href");
        let fullLink = "https://www.espncricinfo.com"+link;
        console.log(fullLink);
        scoreCardObj.ps(fullLink);
    }
}

module.exports = {
    gAlmatches : getAllMatchesLink
}