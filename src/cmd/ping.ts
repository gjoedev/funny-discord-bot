import { Message, MessageEmbed,  } from 'discord.js'
import {command} from '../command'

const ping: command ={
    name: 'Ping',
    description: 'Pings bot',
    execute: function ping(msg: Message){
        let mtime = msg.createdTimestamp
        msg.reply({embeds:[new MessageEmbed().setColor('#4C4C4C').setTitle('Ping').addField('Response Time:', '```'  + (mtime - new Date().getTime()) + 'ms```')]})
    },
    register: function register(){
        return
    }
}

export{
    ping
}