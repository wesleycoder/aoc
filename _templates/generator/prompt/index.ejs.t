---
to: _templates/<%= name %>/<%= action || 'new' %>/index.js
---
const prompt = {
  /** @param {{ prompter: import('enquirer'), args: object }} prompter */
  async prompt({ prompter, args }) {
    return await prompter.prompt([
      {
        type: 'input',
        name: 'message',
        message: "What's your message?"
      }
    ])
  },
}

module.exports = prompt
