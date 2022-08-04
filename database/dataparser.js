const https = require('https');
const fs = require('fs');
const mongoose = require('mongoose')
const cfg = require('../configs/dbconfig')
const date = new Date();
const Citybikes = require('./schemas')
const path = require("path");
const exec = require('child_process').exec

module.exports = {
    downloadData: function (){
        //!!!!! for the sake of only getting the exersicce data the data is hardcoded. Maybe add optional input argument for url !!!!!!//
        const url05 = "https://infopalvelut.storage.hsldev.com/citybikes/od-trips-2021/2021-05.csv";
        const url06 = "https://infopalvelut.storage.hsldev.com/citybikes/od-trips-2021/2021-06.csv";
        const url07 = "https://infopalvelut.storage.hsldev.com/citybikes/od-trips-2021/2021-07.csv";
        const urls = [url05, url06, url07]


        const download = url => {
            return new Promise((resolve, reject) =>{
                const filename = url.split('/')[url.split('/').length - 1];
                const file = fs.createWriteStream(`./temp/${filename}`)

                const request = https.get(url, res => {
                    //TODO redirects
                    if (res.statusCode === 200) {
                        res.pipe(file).on('close', resolve)
                    } else {
                        reject(res.statusCode)
                    }
                }).on('error', (e) =>{
                    console.log(e)
                    reject(e)
                });
            })


        }

        if (!fs.existsSync('./temp')){fs.mkdirSync('./temp')}

        urls.forEach(async url => {
            await download(url)
        })

        console.log(`${urls.length} Files downloaded`)
    },

    parseData: function(){
        let toParse = [];
        fs.readdir('../temp/', (err, files) => {
            files.forEach(file => {
                //console.log(`${path.resolve('../')}/temp/${file}`)
                toParse.push(`${path.resolve('../')}/temp/${file}`)
            });
            for(let i = 0; i < toParse.length; i++){
                console.log(toParse[i])
                let command = `mongoimport --host=127.0.0.1:27017 -d citybikes -c citybikes --type csv --file ${toParse[i]} --headerline`

                exec(command, (err, stdout, stderr) => {
                    // check for errors or if it was succesfuly
                    console.log(err)
                    console.log(stdout)
                    console.log(stderr)
                })
            }
        });



    }

}

module.exports.parseData()