import { Client, Intents, Message, ClientOptions, Constants, Channel } from "discord.js"
const fs = require('fs')
import { handlecommand, initcommand } from "./command"
import {log} from './logger'
import {init} from "./gamemanager"
const Scraper = require("images-scraper")
const cfg = require("../config/config.json")
let google
let games: Array<String> = []

log("Initiating commands...")
initcommand()
if(cfg.usecustompath){
    google = new Scraper({
        puppeteer: {
            headless: false,
        }
    })
}else{
    google = new Scraper({
        puppeteer:{
            headless: false,
            executeablePath: cfg.custompath
        }
    })
}

const client = new Client({
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
})


client.on("ready", () =>{
    log("Logged in at " + client.token)
    init()
})

client.on("messageCreate", async msg =>{
    if(msg.author.bot == true && msg.channel.id != cfg.mainchannel) return
    if(msg.content.startsWith(cfg.prefix) && msg.channel.id == cfg.mainchannel){
        await handlecommand(msg)
    }
    
})

export{
    client, cfg, games, google
}


client.login(cfg.token)