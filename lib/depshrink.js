var listFiles = require('./list-files')
var fs = require('fs');
var exec = require('child_process').exec;

function testExecute(executable, file, boottime){
    return new Promise( (resolve, reject) => {
        let timeoutId;
        let localFile = file;
        fs.renameSync(localFile, localFile+'.back', (err) => { if (err) reject(err) })
        let child  = exec(executable)
        child.on('exit', (code, signal) => {
            clearTimeout(timeoutId);
            fs.renameSync(localFile+'.back', localFile, (err) => { if (err) reject(err) })
            if (signal !== 'SIGINT') 
                resolve({isOptional: false})
            else
                resolve({isOptional: true})
        });
        timeoutId = setTimeout(() => { child.kill('SIGINT')}, boottime)
    })
}

function depsShrink(executable, directories, remove = false, recursive = true, timespan = 10000) {
    var promises = Promise.resolve()
    var optionals = []
    var notOptionals = []
    for(directory of directories){
        var files = listFiles(directory, recursive)
        for(let file of files)
            promises = promises.then(() => {return testExecute(executable, file, timespan)})
                                .then((result) => { result.isOptional ? optionals.push(file) : notOptionals.push(file)})
    }
    return promises.then(() => {optionals, notOptionals})
}

module.exports = depsShrink