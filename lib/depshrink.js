var listFiles = require('./list-files')
var fs = require('fs');
var exec = require('child_process').execSync;

function depsShrink(executable, directories, remove = false, recursive = true, timespan = 1000) {
    for(directory of directories){
        var files = listFiles(directory, recursive)
        for(file of files){
            fs.renameSync(file, file+'.back', function(err) {
                if ( err ) console.log('ERROR: ' + err)
            })
            var child = exec(executable, function( error, stdout, stderr) 
            {
                if (error || !remove) {
                    fs.renameSync(file+'.back', file, function(err) {
                            if ( err ) console.log('ERROR: ' + err);
                    })
                    return
                }
                console.log('optional file: ' + file);
                child.kill()
            })
        }
    }
}

module.exports = depsShrink