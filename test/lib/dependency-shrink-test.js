jest.mock('../../lib/helpers/files', () => ({
    getAll: jest.fn()
}))
jest.mock('../../lib/helpers/execute', () => jest.fn())
const shrinker = require('../../lib/dependency-shrink'),
    files = require('../../lib/helpers/files'),
    execute = require('../../lib/helpers/execute'),
    faker = require('faker')

describe('list files should', () => {
    let directories
    
    beforeEach(() => {
        directories = [faker.random.uuid(), faker.random.uuid()]
    })

    it('return a list of files that are optional and non optional',async () => {
        let fileList = [faker.random.uuid(), faker.random.uuid()],
            bootTime = faker.random.number(1000)
            executable = faker.random.uuid(),
            recursive = faker.random.boolean()
        files.getAll.mockReturnValue(fileList)
        execute.mockReturnValueOnce(Promise.resolve({isOptional: false}))
        execute.mockReturnValueOnce(Promise.resolve({isOptional: true}))

        let result = await shrinker(executable, directories, recursive, bootTime)
        
        expect(files.getAll).toBeCalledWith(directories, recursive)
        fileList.forEach(file => {
            expect(execute).toBeCalledWith(executable, file, bootTime)
        })
        expect(result).toEqual({
            optionals:[fileList[1]],
            notOptionals:[fileList[0]]
        })
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