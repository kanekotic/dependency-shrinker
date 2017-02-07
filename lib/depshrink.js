var listFiles = require('./list-files')
var fs = require('fs');
var exec = require('child_process').exec;

function testExecute(executable, file, boottime){
    return new Promise( (resolve, reject) => {
        fs.renameSync(file, file+'.back', (err) => { if (err) reject(err) })
        let child  = exec(executable, (error) => {
            fs.renameSync(file+'.back', file, (err) => { if (err) reject(err) })
            if (error) {
                resolve({isOptional: false})
                return
            }
            resolve({isOptional: true})
        })
        setTimeout(() => child.kill(), boottime)
    })
}

function depsShrink(executable, directories, remove = false, recursive = true, timespan = 1000) {
    var promises = Promise.resolve()
    var optionals = []
    for(directory of directories){
        var files = listFiles(directory, recursive)
        for(let file of files)
            promises = promises.then(() => {
                testExecute(executable, file, timespan).then(result => {if(result.isOptional) optionals.push(file)})
            })
    }
    return {promises, optionals}
}

module.exports = depsShrink