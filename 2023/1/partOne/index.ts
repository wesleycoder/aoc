import { once } from 'events'
import { createReadStream } from 'fs'
import { resolve } from 'path'
import { createInterface } from "readline/promises"

export default async function partOne(input: string) {
  const readline = createInterface({
    input: createReadStream(resolve(__dirname, input)),
  })

  const total = 0;

  readline.on('line', (line) => {
    console.log(line)
  })

  await once(readline, 'close')

  return total
}
