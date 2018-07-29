const files = require('./helpers/files'),
    execute = require('./helpers/execute')

const shrink = async (executable, directories, recursive, bootTime) => {
    let optionals = []
    let notOptionals = []
    let fileList = files.getAll(directories, recursive)
    for(file of fileList){
        let optional = await execute(executable, file, bootTime)

        if(optional.isOptional)
            optionals.push(file)
        else
            notOptionals.push(file)
    }
    return { optionals, notOptionals }
}
module.exports = shrink