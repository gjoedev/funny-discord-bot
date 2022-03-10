const chalk = require('chalk')

function log(content: String, warn: boolean = false, debug: boolean = false, fatal: boolean = false){
    if(warn){
        console.log((chalk.yellow("[" + new Date().toISOString() + "]")+ " " + content))
        return
    }
    if(fatal){
        console.log(chalk.red(("[" + new Date().toISOString() + "]")+ " " + content))
        process.exit(1)
    }
    if(debug){
        console.log(chalk.green("[" + new Date().toISOString() + "]") + " " + content)
        return
    }
    console.log(chalk.magenta("[" + new Date().toISOString() + "]") + " " + content)
}

export{
    log
}