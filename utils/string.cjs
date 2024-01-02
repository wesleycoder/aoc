const { ToWords } = require('to-words')

/**
 * @param {string} string
 */
exports.capitalize = (string) => `${string[0].toUpperCase()}${string.slice(1)}`

exports.toWords = (number) => {
  const toWords = new ToWords({ localeCode: 'en-US' })

  return toWords.convert(number)
}
