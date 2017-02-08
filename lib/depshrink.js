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

function depsShrink(executable, directories, remove = false, recursive = true, timespan = 5000) {
    var promises = Promise.resolve()
    var optionals = []
    var notOptionals = []
    for(directory of directories){
        promises = promises.then(() => {return listFiles(directory, recursive)})
            .then((files) => {
                var promisesLocal = Promise.resolve()
                for(let file of files){
                    promisesLocal = promisesLocal.then(() => {return testExecute(executable, file, timespan)})
                                        .then((result) => { return result.isOptional ? optionals.push(file) : notOptionals.push(file)})
                }
                return promisesLocal
            })
    }
    return promises.then(() => { return {optionals, notOptionals}})
}

module.exports = depsShrink