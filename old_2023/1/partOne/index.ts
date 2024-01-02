import { once } from 'events'
import { createReadStream } from 'fs'
import { resolve } from 'path'
import { createInterface } from 'readline/promises'

const numbersRegex = /(\d)/g

export default async function main(input: string) {
  const readline = createInterface({
    input: createReadStream(resolve(__dirname, input)),
  })

  let total = 0

  readline.on('line', (line) => {
    const matches = [...line.matchAll(numbersRegex)]
    console.log('matches', matches)
    if (!matches.length) {
      return
    }
    const firstMatch = matches.slice(0)[0][0]
    const secondMatch = matches.slice(-1)[0][0]
    total += parseInt(`${firstMatch}${secondMatch}`)
  })

  await once(readline, 'close')

  return total
}
