const fs = require('fs'),
    exec = require('child_process').exec,
    kill = require('tree-kill')

const onExit = (resolve,file, timeoutId) => 
    (code, signal) => {
        clearTimeout(timeoutId)
        let result = {isOptional: false}
        fs.renameSync(`${file}.back`, file)
        if (signal === 'SIGKILL' || code === 1) 
            result.isOptional = true
        resolve(result)
    }

const onTimeout = (resolve, pid) => () => { 
    kill(pid, 'SIGKILL')
    resolve({isOptional: false}) 
}

const execute = (executable, file, bootTime) => {
    return new Promise((resolve) => {
        fs.renameSync(file, `${file}.back`)
        let child = exec(executable)
        let timeoutId = setTimeout(onTimeout(resolve, child.pid), bootTime)
        child.on('exit', onExit(resolve, file, timeoutId))
    })
}

module.exports = execute