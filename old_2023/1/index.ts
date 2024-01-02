import { resolve } from 'path'
import partOne from './partOne'
import partTwo from './partTwo'

const input = resolve(__dirname, 'input.txt')

const result1 = await partOne(input)
console.log(result1)

const result2 = await partTwo(input)
console.log(result2)
