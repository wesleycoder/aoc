import { once } from 'events'
import { createReadStream } from 'fs'
import { resolve } from 'path'
import { createInterface } from 'readline/promises'

const gameIdRegex = /Game (\d+)(?:\:\s)/

const possible = {
  red: 12,
  green: 13,
  blue: 14,
}

export default async function main(input: string) {
  const readline = createInterface({
    input: createReadStream(resolve(__dirname, input)),
  })

  let total = 0

  readline.on('line', (line) => {
    const gameId = parseInt(gameIdRegex.exec(line)?.[1] ?? '0', 10)
    const steps = line
      .replace(gameIdRegex, '')
      .split(';')
      .map((step) => step.trim())
      .map((step) => step.split(','))
      .map((step) =>
        step
          .map((color) => {
            const [quantity, colorName] = color.trim().split(' ')
            return {
              quantity: parseInt(quantity, 10),
              color: colorName,
            }
          })
          .reduce(
            (acc, { quantity, color }) => ({ ...acc, [color]: quantity }),
            { red: 0, green: 0, blue: 0 }
          )
      )
      .reduce(
        (acc, step) => ({
          ...acc,
          red: acc.red <= step.red ? step.red : acc.red,
          green: acc.green <= step.green ? step.green : acc.green,
          blue: acc.blue <= step.blue ? step.blue : acc.blue,
        }),
        { red: 0, green: 0, blue: 0 }
      )

    if (steps.red <= possible.red && steps.green <= possible.green && steps.blue <= possible.blue) {
      total += gameId
    }
  })

  await once(readline, 'close')

  return total
}
