import { once } from 'events'
import { createReadStream } from 'fs'
import { resolve } from 'path'
import { createInterface } from 'readline/promises'

const numbersRegex = /(\d|one|two|three|four|five|six|seven|eight|nine)/g
const lastNumberRegex =
  /(?:.*)(\d|one|two|three|four|five|six|seven|eight|nine)/g

const spellMap = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
} as const

type Spelled = keyof typeof spellMap

export default async function main(input: string) {
  const readline = createInterface({
    input: createReadStream(resolve(__dirname, input)),
  })

  let total = 0

  readline.on('line', (line) => {
    const fistMatches = [...line.matchAll(numbersRegex)]
    const lastMatches = [...line.matchAll(lastNumberRegex)]
    const first = fistMatches.slice(0)[0][0]
    const second = lastMatches.slice(-1)[0][1]

    const firstNumber = /\d/.test(first) ? first : spellMap[first as Spelled]
    const secondNumber = /\d/.test(second)
      ? second
      : spellMap[second as Spelled]
    total += parseInt(`${firstNumber}${secondNumber}`)
  })

  await once(readline, 'close')

  return total
}
