import { Message, MessageEmbed } from "discord.js"
import {log} from "./logger"
import { client, cfg, games} from "./index"



const creategame: Function = function(msg: Message){
    games.push(msg.id)
}

const init: Function = function(){

    log("Gamemanager initialized")
    checkfordelete()
}

export{
    init, creategame, checkfordelete
}

async function checkfordelete(){
    log("Delete loop started")
    for(;;){
        for(const game of games){
            log(`Checking game ${game}`)
            let channel = client.channels.cache.get(cfg.mainchannel)
            if(!channel.isText()) return
            let msg = channel.messages.fetch(game.toString())
            if(new Date().getTime()/1000 - (await msg).createdTimestamp/1000 >= 3600){
                msg.then(msg=>{
                    let embed = new MessageEmbed().setColor("#40444b").setTitle("Smash or Pass").setDescription("Voting has expired").setFooter("Voting has expired")
                    msg.edit({embeds: [embed]})
                })
                log(`Deleted game ${game}`)
                games.splice(games.indexOf(game))
            }
        }
        await sleep(3600000)
    }
}

function sleep(ms) { //https://stackoverflow.com/questions/14249506/how-can-i-wait-in-node-js-javascript-l-need-to-pause-for-a-period-of-time
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}