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
    let wTeamName;
    for(let i=0;i<teamArr.length;i++){
      let hasClass =  $(teamArr[i]).hasClass("team-gray");
      if(hasClass==false){
        let teamNameElem =  $(teamArr[i]).find(".name");
        wTeamName = teamNameElem.text().trim();
      }
    }

   let inningsArr =  $(".card.content-block.match-scorecard-table>.Collapsible");
//    let htmlStr = "";
   for(let i=0;i<inningsArr.length;i++){
    //    let chtml = $(inningsArr[i]).html();
    //    htmlStr += chtml;

    let teamNameElem = $(inningsArr[i]).find(".header-title.label");
    let teamName = $(teamNameElem).text();
    teamName = teamName.split("INNINGS")[0];
    teamName = teamName.trim();
    
    let hwtName="";
    let hwt = 0;
    if(wTeamName==teamName){
        // console.log(teamName);

        let tableElem = $(inningsArr[i]).find(".table.bowler");
        let allBowlers = $(tableElem).find("tr");
        for(let j=0;j<allBowlers.length;j++){
            let allColsofPlayers = $(allBowlers[j]).find("td");
            let playerName = $(allColsofPlayers[0]).text();
            let wickets = $(allColsofPlayers[4]).text();
            // console.log("Bowler Name:- ", playerName, " Wickets:- ",wickets);

            if(wickets>hwt){
                hwt=wickets;
                hwtName=playerName;
            }
        }
        console.log(`Winning team: ${wTeamName}, highest wicket Taker PlayerName: ${hwtName}, wickets: ${hwt}`);
    }
   }
//    console.log(htmlStr);
}