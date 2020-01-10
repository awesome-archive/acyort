const { version } = require('../../../package.json')

module.exports = {
  name: '--version',
  alias: '-v',
  description: 'Show current version',
  action() {
    const { version: node, platform, arch } = process
    global.console.log(`acyort: ${version}`, `\nnode: ${node}`, `\nos: ${platform} ${arch}`)
  },
}
