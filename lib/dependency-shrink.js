const files = require('./helpers/files')

const shrink = (directories) => {
    files.getAll(directories)
    return {
        optionals: [],
        notOptionals: []
    }
}
module.exports = shrink