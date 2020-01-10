const { join } = require('path')

module.exports = (acyort) => {
  const { store, config, workflow } = acyort
  const { base, plugins } = config.get()
  const { getPrototypeOf, getOwnPropertyNames } = Object
  const storeMethods = getOwnPropertyNames(getPrototypeOf(store))

  const exec = (path, type, name) => {
    const methods = {}

    storeMethods.forEach((m) => {
      if (m !== 'constructor') {
        methods[m] = store[m].bind({ context: store, namespace: `${type}:${name}` })
      }
    })

    try {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      require(path)({
        ...acyort,
        workflow: { ...workflow, start: undefined },
        store: { ...store, ...methods },
      })
    } catch (e) {
      acyort.logger.error(e)
    }
  }

  plugins.forEach((name) => {
    if (name.match(/.*?\.js$/)) {
      exec(join(base, 'scripts', name), 'script', name)
    } else {
      exec(join(base, 'node_modules', name), 'plugin', name)
    }
  })
}
