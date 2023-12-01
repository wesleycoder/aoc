const { JSDOM } = require('jsdom')
const TurdownService = require('turndown')

/** @type {TurdownService} */
const mdSvc = new TurdownService()

const headers = { Cookie: `session=${process.env.AOC_SESSION}` }

/** @param {{ day: number; year: number }} options */
async function fetchInput({ day, year }) {
  const res = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
    headers,
  })
  return await res.text()
}

/** @param {{ day: number; year: number }} options */
async function fetchInstructions({ day, year }) {
  const res = await fetch(`https://adventofcode.com/${year}/day/${day}`, {
    headers,
  })
  const body = await res.text()
  /** @type {JSDOM} */
  const doc = new JSDOM(body)
  const article = doc.window.document.querySelector('.day-desc').outerHTML
  return mdSvc.turndown(article)
}

const prompt = {
  /** @param {{ prompter: import('enquirer'), args: object }} prompter */
  async prompt({ prompter, args }) {
    const today = new Date()

    const { year, day } = await prompter.prompt([
      {
        type: 'input',
        name: 'year',
        message: 'Year:',
        hint: args.year ?? today.getFullYear().toString(),
        initial: args.year ?? today.getFullYear(),
      },
      {
        type: 'input',
        name: 'day',
        message: 'Day:',
        hint: args.day ?? today.getDate().toString(),
        initial: args.day ?? today.getDate(),
      },
    ])

    const input = await fetchInput({ year: year, day: day })
    if (input.startsWith("Please don't repeatedly request")) {
      throw new Error(input)
    }

    const instructions = await fetchInstructions({
      year: year,
      day: day,
    })

    return {
      year,
      day,
      input,
      instructions,
    }
  },
}

module.exports = prompt

/** @typedef {import('jsdom').JSDOM} JSDOM */
/** @typedef {import('turndown')} TurdownService */
