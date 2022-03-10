import {Message, MessageEmbed} from 'discord.js'
import {command} from '../command'
import {log} from "../logger"
import { creategame } from "../gamemanager"
import { google } from '../index'
const fs = require('fs')
const keywords: Array<String> = require("../../config/keywords.json")
let query : String

const game: command ={
    name: 'Game',
    description: 'Creates a game of smash or pass',
    execute: async function game(msg: Message){
        let gameembed = new MessageEmbed().setColor("#57F287").setTitle("Smash or Pass").setDescription("React with :regional_indicator_s: if you smashin' 😍 or :regional_indicator_p: if you passsin 🤮")
        .setImage(await grabimage()).setFooter({text: `Voting ends in 24 hours, search query is ${query}`})
        let game: Message = await msg.channel.send({embeds: [gameembed]})
        game.react('🇸')
        game.react('🇵')
        log("User " + msg.author.id + " created a game of ID " + game.id + " Set for deletion in 24 hours")
        creategame(game)
    },
    register: function register(){
        return
    }
}

async function grabimage(): Promise<string>{
    query = keywords[Math.floor(Math.random()*keywords.length)]
    let results = await google.scrape(query, 50)
    return results[Math.floor(Math.random()*50)].url
}

export{
    game
}