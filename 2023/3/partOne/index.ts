import { once } from 'events'
import { createReadStream } from 'fs'
import { resolve } from 'path'
import { createInterface } from 'readline/promises'

type PartNumber = {
  number: number
  valid: boolean
  length: number
  x: number
}

const onlyNumbersRegex = /\d+/
const anySymbolRegex = /(?!\d|\.)./g

const toPartNumber = ({ number, index }: { number: string; index: number }) =>
  ({
    number: parseInt(number, 10),
    valid: false,
    length: number.length,
    x: index,
  } as PartNumber)

export default async function partOne(input: string) {
  const readline = createInterface({
    input: createReadStream(resolve(__dirname, input)),
  })

  let total = 0
  let previousLine = ''
  let previousNumbers: PartNumber[] = []

  readline.on('line', (line) => {
    // console.log('previousNumbers', previousNumbers)
    previousNumbers.forEach((n) => {
      if (!n.valid) {
        n.valid = [line, previousLine].some((l) =>
          anySymbolRegex.test(l.substring(n.x - 1, n.x + n.length + 1))
        )
      }
      // console.log('n', n, n.valid, line, previousLine)

      if (n.valid) total += n.number
    })

    let matches: { number: string; index: number }[] = []
    let remain = line
    let lastMatchEnd = 0

    while (remain.length) {
      const match = onlyNumbersRegex.exec(remain)
      if (!match) break
      const { 0: number, index } = match
      matches.push({ number, index: index + lastMatchEnd })
      lastMatchEnd = index + number.length
      console.log(number, index, remain, lastMatchEnd)
      remain = remain.substring(lastMatchEnd)
    }

    const numbers = matches.map(({ number, index }) =>
      toPartNumber({ number, index })
    )

    previousLine = line
    previousNumbers = numbers ?? []
  })

  await once(readline, 'close')

  previousNumbers.forEach((n) => {
    if (n.valid) total += n.number
  })

  return total
}
