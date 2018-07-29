jest.mock('glob', () => ({
    sync: jest.fn()
}))
const files = require('../../../lib/helpers/files'),
    glob = require('glob'),
    faker = require('faker')

describe('get all files should', () => {
    let directories
    
    beforeEach(() => {
        directories = [faker.random.uuid(), faker.random.uuid()]
    })

    it('return a list of all files',async () => {
        let fileList1 = [faker.random.uuid(), faker.random.uuid()]
        let fileList2 = [faker.random.uuid(), faker.random.uuid()]
        glob.sync.mockReturnValueOnce(fileList1)
        glob.sync.mockReturnValueOnce(fileList2)

        let result = files.getAll(directories)

        directories.forEach(element => {
            expect(glob.sync).toBeCalledWith(`${element}/**/*`, {nodir: true})
        });
        expect(result).toEqual(fileList1.concat(fileList2))
        
    })

})

// function depsShrink(executable, directories, remove, recursive, timespan) {
//     var promises = Promise.resolve()
//     var optionals = []
//     var notOptionals = []
//     for(let directory of directories){
//         promises = promises.then(() => {return listFiles(directory, recursive)})
//             .then((files) => {
//                 var promisesLocal = Promise.resolve()
//                 for(let file of files){
//                     if(file === executable)
//                         continue
//                     promisesLocal = promisesLocal.then(() => {return testExecute(executable, file, timespan)})
//                                         .then((result) => { return result.isOptional ? optionals.push(file) : notOptionals.push(file)})
//                                         .catch(() => console.log("unable to resolve dependency level of file: " + file))
//                 }
//                 return promisesLocal
//             })
//     }
//     return promises.then(() => { return {optionals, notOptionals}})
// }