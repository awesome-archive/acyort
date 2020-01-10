const fs = require('fs-extra')
const Renderer = require('@acyort/renderer')
const { version } = require('../../package.json')
const Workflow = require('../workflow')
const Helper = require('../helper')
const Store = require('../store')
const Config = require('../config')
const Hooks = require('../hooks')
const cli = require('../cli')
const logger = require('../logger')
const utility = require('../utility')

module.exports = (config) => {
  const acyort = {
    fs,
    version,
    logger,
    renderer: new Renderer(),
    workflow: new Workflow(),
    cli,
    store: new Store(),
    config: new Config(config),
    helper: new Helper(config),
    hooks: new Hooks(),
  }

  acyort.util = utility(acyort)

  return acyort
}
