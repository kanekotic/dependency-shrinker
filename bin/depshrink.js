#! /usr/bin/env node

var program = require('commander'),
    depsShrink = require('../lib/depshrink')

var optionsMap = {
    list: { delete: false },
    remove: { delete: true }
}

program
    .arguments("<mode> <executable> <boottime> [dirs...]")
    .action((mode, executable, boottime, dirs) => {
        console.log('execute: in mode('+ mode + ') the executable '+ executable + ' in ' + dirs)
        if(!optionsMap[mode])
            error(mode + ': command not supported')
        
        depsShrink(executable, dirs, optionsMap[mode].delete, true, boottime).then((result) => {
            console.log('Not critical files: ')
            for(optional of result.optionals)
                console.log('    - '+ optional)
            console.log('Critical files: ')
            for(notOptional of result.notOptionals)
                console.log('    - '+ notOptional)
        })
    })
    .parse(process.argv);
