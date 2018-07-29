const glob = require('glob')

const getAll = (directories, recursive) => {
    let result = []
    let pattern = recursive ? '/**/*' : '/*' 
    directories.forEach(directory => {
        result = result.concat(glob.sync(`${directory}${pattern}`, {nodir: true}))
    });
    return result
}
module.exports = { getAll }