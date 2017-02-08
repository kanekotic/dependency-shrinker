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
        
        depsShrink(executable,dirs,optionsMap[mode].delete,true, 1000).then((result) => {
            console.log('Not critical files: ')
            for(optional of result.optionals)
            console.log('    - '+ optionals)
            console.log('Critical files: ')
            for(notOptional of result.notOptionals)
            console.log('    - '+ notOptional)
        })
    })
    .parse(process.argv);
