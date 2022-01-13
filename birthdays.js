const request= require("request");
const cheerio= require("cheerio");
const url=("https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard");
console.log("Before");
request(url,cb);
function cb(err,response,html){
    if(err){
    console.log(err);
    }
    else{
        extractHTML(html);
    }
}

function extractHTML(html){
    const $=cheerio.load(html);
    let teamArr=$(".match-info.match-info-MATCH .team");
   let inningsArr =  $(".card.content-block.match-scorecard-table>.Collapsible");
   for(let i=0;i<inningsArr.length;i++){
    let teamNameElem = $(inningsArr[i]).find(".header-title.label");
    let teamName = $(teamNameElem).text();
    teamName = teamName.split("INNINGS")[0];
    teamName = teamName.trim();
    
        //table batsmen
        let tableElem = $(inningsArr[i]).find(".table.batsman");
        let allBatsMan = $(tableElem).find("tr");
        for(let j=0;j<allBatsMan.length;j++){
            let allColsofPlayer = $(allBatsMan[j]).find("td");
            let isbatsManCol = $(allColsofPlayer[0]).hasClass("batsman-cell");
            if(isbatsManCol==true){
            //    let playerName = $(allColsofPlayer[0]).text();
            //    console.log(`teamName : ${teamName} playerName: ${playerName}`);
            let href = $(allColsofPlayer[0]).find("a").attr("href");
            let name = $(allColsofPlayer[0]).text();
            let fullLink = "https://www.espncricinfo.com"+href;
                // console.log(fullLink);
                getBirthdayPage(fullLink,name,teamName);
            }

        }
   }
}

function getBirthdayPage(url,name,teamName){
    request(url,cb);
    function cb(err,response,html){
        if(err){
            console.log(err);
            }
            else{
                extractBirthday(html,name,teamName);
            }
    }
}

function extractBirthday(html,name,teamName){
    let $ =cheerio.load(html);
    let detailsArr = $(".player-card-description");
    let birthday = $(detailsArr[1]).text();
    console.log(`${name} plays for ${teamName} was born on ${birthday}`);

}