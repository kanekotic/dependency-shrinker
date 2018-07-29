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

    it('return a list of all files recursive',async () => {
        let fileList1 = [faker.random.uuid(), faker.random.uuid()]
        let fileList2 = [faker.random.uuid(), faker.random.uuid()]
        glob.sync.mockReturnValueOnce(fileList1)
        glob.sync.mockReturnValueOnce(fileList2)

        let result = files.getAll(directories,true)

        directories.forEach(element => {
            expect(glob.sync).toBeCalledWith(`${element}/**/*`, {nodir: true})
        });
        expect(result).toEqual(fileList1.concat(fileList2))
        
    })

    it('return a list of all files non recursive',async () => {
        let fileList1 = [faker.random.uuid(), faker.random.uuid()]
        let fileList2 = [faker.random.uuid(), faker.random.uuid()]
        glob.sync.mockReturnValueOnce(fileList1)
        glob.sync.mockReturnValueOnce(fileList2)

        let result = files.getAll(directories, false)

        directories.forEach(element => {
            expect(glob.sync).toBeCalledWith(`${element}/*`, {nodir: true})
        });
        expect(result).toEqual(fileList1.concat(fileList2))
        
    })

})
