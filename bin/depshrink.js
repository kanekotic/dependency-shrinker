#! /usr/bin/env node

var program = require('commander'),
    depsShrink = require('../lib/depshrink')

var optionsMap = {
    list: { delete: false },
    remove: { delete: false }
}

program
    .arguments("<mode> <executable> [dirs...]")
    .action(function(mode, executable, dirs) {
        console.log('execute: in mode('+ mode + ') the executable '+ executable + ' in ' + dirs)
        if(!optionsMap[mode])
            error(mode + ': command not supported')
        
        var solution = depsShrink(executable,dirs,optionsMap[mode].delete,true, 1000)
        solution.promises.then(console.log(JSON.stringify(solution.optionals)))
    })
    .parse(process.argv);
