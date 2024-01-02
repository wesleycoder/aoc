import { resolve } from "path";
import partOne from "./partOne";

const input = resolve(__dirname, 'input.txt')
const sampleOne = resolve(__dirname, 'partOne/sample.txt')

const resultOne = await partOne(sampleOne)
console.log(resultOne)
