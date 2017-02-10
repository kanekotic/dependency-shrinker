"use strict"

var filesystem = require("fs");

function getAllFiles(dir, recursive) {
    var promises = Promise.resolve()
    var results = [];
    filesystem.readdirSync(dir).forEach(function(file) {
        file = dir+'/'+file
        var stat = filesystem.statSync(file)
        if (stat && stat.isDirectory() && recursive)
            promises = promises.then(() => { return getAllFiles(file, recursive)}).then((result) => {return results = results.concat(result)})
        else if (stat && !stat.isDirectory())
            results.push(file)
    });
    return promises.then(() => { return results})
};

module.exports = getAllFiles