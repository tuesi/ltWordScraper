const request = require("request-promise")
const cheerio = require("cheerio");
const fs = require('fs');

const url = "";
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "Y", "J", "K", "L", "M", "N", "O", "P", "R", "S", "T", "U", "V", "Z"];
//22
var letterCount = 0;
var count = 1;
const words = [];
scrapeData();

async function scrapeData(){
    request(url + letters[letterCount] + (count === 1 ? "" : "/"+count.toString()), (err, response, html) => {
        
        const $ = cheerio.load(html);
        var allElements = $("span > a");
        if(allElements.length > 0) {
            $("span > a").each((index, el) => {
                var item = $(el).text();
                words.push(item);
            })
            count++;
            console.log(count);
            scrapeData();
        }
        else if(letterCount < 22){
            letterCount++;
            count = 1;
            scrapeData();
        }
        else {
            fs.writeFile("./words.txt", words.join('\n'), function (err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("file saved");
                }
            });
            console.log(words.length);
        }
    });
}

