import { resolve } from "path";
import partOne from "./part1";
import partTwo from './part2'

const input = resolve(__dirname, 'input.txt')

const result1 = await partOne(input)
console.log(result1)

const result2 = await partTwo(input);
console.log(result2)
