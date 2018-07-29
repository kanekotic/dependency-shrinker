const glob = require('glob')

const getAll = (directories) => {
    let result = []
    directories.forEach(directory => {
        result = result.concat(glob.sync(`${directory}/**/*`, {nodir: true}))
    });
    return result
}
module.exports = { getAll }