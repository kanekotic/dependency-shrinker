jest.mock('fs', () => ({
    renameSync: jest.fn()
}))

jest.mock('child_process', () => ({
    exec: jest.fn()
}))

jest.mock('tree-kill', () => jest.fn())

jest.useFakeTimers()

const execute = require('../../../lib/helpers/execute'),
    faker = require('faker'),
    exec = require('child_process').exec,
    fs = require('fs'),
    EventEmitter = require('events'),
    kill = require('tree-kill')

class TestEmitter extends EventEmitter {}

describe('execute should', () => {
    beforeEach(()=>{
        fs.renameSync.mockClear()
        exec.mockReset()
    })

    it('run an optional file with signal SIGKILL',async () => {
        let bootTime = faker.random.number(10000)
        let filename = faker.random.uuid()
        let executable = faker.random.uuid()
        let code = faker.random.uuid()
        let childEmitter = new TestEmitter()
        exec.mockReturnValue(childEmitter)
        
        let executing = execute(executable, filename, bootTime)

        childEmitter.emit('exit',code,'SIGKILL')

        let result = await executing
        
        expect(fs.renameSync).toHaveBeenNthCalledWith(1, filename, `${filename}.back`)
        expect(exec).toBeCalledWith(executable)
        expect(fs.renameSync).toHaveBeenNthCalledWith(2, `${filename}.back`, filename)
        expect(result).toEqual({isOptional: true})
        expect(clearTimeout).toBeCalled()
    })
    
    it('run an optional file with colde 1',async () => {
        let bootTime = faker.random.number(10000)
        let filename = faker.random.uuid()
        let executable = faker.random.uuid()
        let signal = faker.random.uuid()
        let childEmitter = new TestEmitter()
        exec.mockReturnValue(childEmitter)
        
        let executing = execute(executable, filename, bootTime)

        childEmitter.emit('exit',1,signal)

        let result = await executing
        
        expect(fs.renameSync).toHaveBeenNthCalledWith(1, filename, `${filename}.back`)
        expect(exec).toBeCalledWith(executable)
        expect(fs.renameSync).toHaveBeenNthCalledWith(2, `${filename}.back`, filename)
        expect(result).toEqual({isOptional: true})
    })
    
    it('run an non optional file with any code and signal',async () => {
        let bootTime = faker.random.number(10000)
        let filename = faker.random.uuid()
        let executable = faker.random.uuid()
        let signal = faker.random.uuid()
        let code = faker.random.uuid()
        let childEmitter = new TestEmitter()
        exec.mockReturnValue(childEmitter)
        
        let executing = execute(executable, filename, bootTime)

        childEmitter.emit('exit',code,signal)

        let result = await executing
        
        expect(fs.renameSync).toHaveBeenNthCalledWith(1, filename, `${filename}.back`)
        expect(exec).toBeCalledWith(executable)
        expect(fs.renameSync).toHaveBeenNthCalledWith(2, `${filename}.back`, filename)
        expect(result).toEqual({isOptional: false})
    })

    it('timeout should reject and kill process', async () => {
        let bootTime = faker.random.number(10000)
        let filename = faker.random.uuid()
        let executable = faker.random.uuid()
        let pid = faker.random.uuid()

        exec.mockReturnValue({pid: pid, on : jest.fn()})

        let executing = execute(executable, filename, bootTime)

        jest.runOnlyPendingTimers()

        let result = await executing

        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), bootTime)
        expect(kill).toBeCalledWith(pid, 'SIGKILL')
        expect(result).toEqual({isOptional: false})

    })
})

// function testExecute(executable, file, boottime){
//     return new Promise( (resolve, reject) => {
//         let timeoutId;
//         let localFile = file;
//         fs.renameSync(localFile, localFile+'.back', (err) => { if (err) reject(err) })
//         let child  = exec(executable)
//         child.on('exit', (code, signal) => {
//             clearTimeout(timeoutId);
//             fs.renameSync(localFile+'.back', localFile, (err) => { if (err) reject(err) })
//             console.log(code)
//             if (signal === 'SIGKILL' || code === 1) 
//                 resolve({isOptional: true})
//             else
//                 resolve({isOptional: false})
//         });
//         timeoutId = setTimeout(() => { 
//                 kill(child.pid, 'SIGKILL')
//                 }, boottime)
//     })
// }