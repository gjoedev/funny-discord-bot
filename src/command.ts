import { Message, MessageEmbed } from "discord.js"
import fs = require("fs")
import path = require("path")
import {log} from './logger'

type command={
    name: string
    description?: string
    execute: Function
    group?: string
    register?: Function
}



const handlecommand: Function = async function(msg:Message){
    let cmd: String = msg.toString().substring(1)
    let args: Array<String> = cmd.split(" ").splice(1)
    cmd = cmd.split(" ")[0]
    if(!commands.hasOwnProperty(cmd.toString())){
        msg.channel.send({embeds: [new MessageEmbed().setColor('#ED4245').setTitle('Command not found').setDescription('Could not find the command your looking for')]})
        return
    }
    commands[cmd.toString()][cmd].execute(msg, args)
    log("User " + msg.author.id + " used command " + cmd)
}

let commands: Object

const initcommand: Function = async function(){
   let cmds:Object =[]
   let cmddir = fs.readdirSync('src\\cmd')
   let cmdc = []
   cmddir.forEach(element =>{
        cmdc.push(path.parse(element).name)
   })
   for(const command of cmdc){
       log('Registering command ' + command)
       cmds[command] = require("./cmd/" + command + ".js") //added .js so it works when compiled to javascript
       if(command.register in cmds[command]){
           command.register()
       }
   }
   commands = cmds //yeah its lazy but it probably works
}

export{
    handlecommand, initcommand, command, IncorectArgs
}

function IncorectArgs(args:Array<String>, msg:Message){
    let errorembed: MessageEmbed = new MessageEmbed().setColor('#ED4245').setTitle('Incorrect Arguments').setDescription('Arguments supplied for command are incorrect')
    for(let arg of args){
        errorembed.addField("Missing Argument", "Expected Argument: ```" + arg + "```")
    } 
    msg.channel.send({embeds: [errorembed]})
}
