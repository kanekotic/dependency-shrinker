jest.mock('commander', () => {
    const jestFn = {
            default: this,
            arguments: jest.fn(() => jestFn),
            version: jest.fn(() => jestFn),
            command: jest.fn(() => jestFn),
            description: jest.fn(() => jestFn),
            action: jest.fn(action => {
                let input = ["GOOD","BAD"]
                action(input)
                return jestFn
            }),
            parse: jest.fn(() => jestFn)
        }
    return jestFn
})

jest.mock('../../lib/dependency-shrink', () => {
    let impFun = (param) => {
        if(param=="BAD")
            throw "Boon"
        return Promise.resolve("OK")
      }
      return jest.fn().mockImplementation(impFun)
})

jest.mock('../../package.json', () => {
    const randomNumber = () => Math.floor((Math.random() * 10) + 1)
    return {
        version: `${randomNumber()}.${randomNumber()}.${randomNumber()}`
    }
})
const commander = require('commander'),
    depshrink = require('../../bin/depshrink'),
    index = require('../../lib/dependency-shrink')
    packageJson = require('../../package.json')

describe('depshrink', () => {

    it('should have correct parameters',async () => {})
})