"use strict"

var listFiles = require('./list-files'),
    fs = require('fs'),
    exec = require('child_process').exec,
    os = require('os'),
    kill = require('tree-kill')

function testExecute(executable, file, boottime){
    return new Promise( (resolve, reject) => {
        let timeoutId;
        let localFile = file;
        fs.renameSync(localFile, localFile+'.back', (err) => { if (err) reject(err) })
        let child  = exec(executable)
        child.on('exit', (code, signal) => {
            clearTimeout(timeoutId);
            fs.renameSync(localFile+'.back', localFile, (err) => { if (err) reject(err) })
            console.log(code)
            if (signal === 'SIGKILL' || code === 1) 
                resolve({isOptional: true})
            else
                resolve({isOptional: false})
        });
        timeoutId = setTimeout(() => { 
                kill(child.pid, 'SIGKILL')
                }, boottime)
    })
}

function depsShrink(executable, directories, remove, recursive, timespan) {
    var promises = Promise.resolve()
    var optionals = []
    var notOptionals = []
    for(let directory of directories){
        promises = promises.then(() => {return listFiles(directory, recursive)})
            .then((files) => {
                var promisesLocal = Promise.resolve()
                for(let file of files){
                    if(file === executable)
                        continue
                    promisesLocal = promisesLocal.then(() => {return testExecute(executable, file, timespan)})
                                        .then((result) => { return result.isOptional ? optionals.push(file) : notOptionals.push(file)})
                                        .catch(() => console.log("unable to resolve dependency level of file: " + file))
                }
                return promisesLocal
            })
    }
    return promises.then(() => { return {optionals, notOptionals}})
}

module.exports = depsShrink