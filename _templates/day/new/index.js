const {
  fetchInput,
  fetchInstructions,
  removeInputCache,
  removeInstructionsCache,
} = require('../../../utils/api.cjs')
const { capitalize, toWords } = require('../../../utils/string.cjs')

const startOfAoC = 2015

const prompt = {
  /** @param {{ prompter: import('enquirer'), args: object }} prompter */
  async prompt({ prompter, args }) {
    const today = new Date()
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth()
    const currentDay =
      currentMonth === 11 && today.getDate() <= 25 ? today.getDate() : 1

    const { year, day, part } = await prompter.prompt([
      {
        type: 'select',
        name: 'year',
        message: 'Year:',
        hint: args.year ?? currentYear.toString(),
        choices: Array.from({ length: currentYear - startOfAoC + 1 }, (_, i) =>
          (currentYear - i).toString()
        ),
        initial: args.year ?? currentYear.toString(),
      },
      {
        type: 'numeral',
        name: 'day',
        message: 'Day:',
        hint: 'A day between 1 and 25 of december',
        initial: args.day ?? currentDay,
        validate: (value) =>
          Number.isInteger(value) && value > 0 && value <= 25,
      },
      {
        type: 'numeral',
        name: 'part',
        message: 'Part:',
        hint: args.part ?? '1',
        initial: args.part ?? 1,
      },
    ])

    const input = await fetchInput({ year, day })
    const { instructions, sample } = await fetchInstructions({
      year,
      day,
      part,
    })

    return {
      path: `${year}/${day}/part${capitalize(toWords(part))}.js`,
      year,
      day,
      part: {
        number: part,
        name: capitalize(toWords(part)),
        path: `part${capitalize(toWords(part))}`,
      },
      input,
      instructions,
      sample,
    }
  },
}

module.exports = prompt
