const { mkdir, stat, readFile, unlink, writeFile } = require('fs/promises')
const { dirname, resolve } = require('path')
const { JSDOM } = require('jsdom')
const TurdownService = require('turndown')

/** @type {TurdownService} */
const mdSvc = new TurdownService()

const cachePath = resolve(__dirname, '../.aoc-input-cache')
const headers = { Cookie: `session=${process.env.AOC_SESSION}` }

/**
 * @param {string} path
 */
const fileExists = async (path) => {
  return stat(path)
    .then(() => true)
    .catch(() => false)
}

/**
 * @param {string} url
 * @param {string} cachePath
 * @returns {Promise<string>}
 */
const fetchTextWithCache = async (url, key, ...options) => {
  const cachePath = resolve(__dirname, '../.aoc-input-cache/', key)

  if (await fileExists(cachePath)) {
    return await readFile(cachePath, 'utf-8')
  }

  const res = await fetch(url, ...options)
  const text = await res.text()

  if (!text.startsWith("Please don't repeatedly request")) {
    try {
      console.log('writing cache', await fileExists(dirname(cachePath)))
      if (!await fileExists(dirname(cachePath))) {
        await mkdir(dirname(cachePath), { recursive: true })
      }

      await writeFile(cachePath, text)
    } catch {}
  }

  return text
}

/** @param {{ day: number; year: number }} options */
const removeInputCache = async ({ day, year }) => {
  const cachePath = resolve(
    __dirname,
    '../.aoc-input-cache/',
    `${year}/${day}/input.txt`
  )
  if (await fileExists(cachePath)) {
    await unlink(cachePath)
  }
}

/** @param {{ day: number; year: number }} options */
const removeInstructionsCache = async ({ day, year }) => {
  const cachePath = resolve(
    __dirname,
    '../.aoc-input-cache/',
    `${year}/${day}/input.txt`
  )
  if (await fileExists(cachePath)) {
    await unlink(cachePath)
  }
}

/** @param {{ day: number; year: number }} options */
const fetchInput = async ({ day, year }) => {
  return await fetchTextWithCache(
    `https://adventofcode.com/${year}/day/${day}/input`,
    `${year}/${day}/input.txt`,
    { headers }
  )
}

/** @param {{ day: number; year: number; part: number }} options */
const fetchInstructions = async ({ day, year, part }) => {
  const text = await fetchTextWithCache(
    `https://adventofcode.com/${year}/day/${day}`,
    `${year}/${day}/instructions.txt`,
    { headers }
  )

  /** @type {JSDOM} */
  const doc = new JSDOM(text)

  const articles = doc.window.document.querySelectorAll('.day-desc')

  if (articles.length === 0) {
    return { instructions: '', sample: '' }
  }

  const article = Array.from(articles)[part - 1]
  const instructions = mdSvc.turndown(article.outerHTML).replace(/^\\/, '')
  const sample = article.querySelector('pre').textContent ?? ''

  return { instructions, sample }
}

module.exports = {
  fileExists,
  fetchWithCache: fetchTextWithCache,
  fetchInput,
  fetchInstructions,
  removeInputCache,
  removeInstructionsCache,
}

/** @typedef {import('jsdom').JSDOM} JSDOM */
/** @typedef {import('turndown')} TurdownService */
