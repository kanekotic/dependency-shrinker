var filesystem = require("fs");

function getAllFiles(dir, recursive) {
    var results = [];
    filesystem.readdirSync(dir).forEach(function(file) {
        file = dir+'/'+file
        var stat = filesystem.statSync(file)
        if (stat && stat.isDirectory() && recursive)
            results = results.concat(getAllFiles(file, recursive))
        else if (stat && !stat.isDirectory())
            results.push(file);
    });
    return results;
};

module.exports = getAllFiles