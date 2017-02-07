#! /usr/bin/env node
var program = require('commander')

program
    .arguments("list <executable> [dirs...]")
    .action(function(executable, dirs) {
        
    })
    .parse(process.argv);

program
    .arguments("remove <executable> [dirs...]")
    .action(function(executable, dirs) {
        
    })
    .parse(process.argv);