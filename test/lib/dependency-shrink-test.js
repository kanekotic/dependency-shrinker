jest.mock('../../lib/helpers/files', () => ({
    getAll: jest.fn()
}))
const shrinker = require('../../lib/dependency-shrink'),
    files = require('../../lib/helpers/files'),
    faker = require('faker')

describe('list files should', () => {
    let directories
    
    beforeEach(() => {
        directories = [faker.random.uuid(), faker.random.uuid()]
    })

    it('return a list of files that are optional and non optional',async () => {
        let fileList = [faker.random.uuid(), faker.random.uuid()]
        files.getAll.mockReturnValue(fileList)

        let result = shrinker(directories)
        
        expect(files.getAll).toBeCalledWith(directories)
        expect(result.optionals).toBeDefined()
        expect(result.notOptionals).toBeDefined()
        
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