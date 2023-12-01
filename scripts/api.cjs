const headers = { Cookie: `session=${process.env.AOC_SESSION}` }

/** @param {{ day: number; year: number }} options */
exports.fetchInput = function fetchInput({ day, year }) {
  return fetch(`https://adventofcode.com/${year}/day/${day}/input`, { headers })
    .then((response) => {
      console.log('got response')
      response.text()
    })
}
