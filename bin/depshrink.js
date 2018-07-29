#! /usr/bin/env node

var program = require('commander'),
    packageJson = require('../package.json'),
    shrink = require('../lib/dependency-shrink')

program
    .version(packageJson.version)
  
//   program
//     .command('<executable> <BootTime> [dirs...]')
//     .description('converts raw guid to string format')
//     .action((guids) => 
//     guids.forEach(guid => {
//       try {
//         console.log(index.convertRaw(guid))
//       } catch (_) {
//         console.log(`${guid}: is not a valid raw format for a guid`)
//       }
//     })
//   )

program
    .arguments("<executable> <BootTime> [dirs...]")
    .description('tests if a file is necesary to run a binary')
    .action((executable, bootTime, dirs) => {
        console.log('executing '+ executable + ' in ' + dirs)
        shrink(executable, dirs, true, bootTime)
        .then((result) => {
            console.log('Not critical files: ')
            result.optionals.forEach(file => console.log(`    - ${file}`))
            console.log('Critical files: ')
            result.notOptionals.forEach(file => console.log(`    - ${file}`))
        })
    })
    .parse(process.argv);
