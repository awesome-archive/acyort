#!/usr/bin/env node

'use strict';

const program = require('commander')
const fs = require('fs-extra')
const path = require('path')
const colors = require('colors')
const pkg = require('../package.json')
const index = require('../lib')
const server = require('../lib/server')

program
    .allowUnknownOption()
    .usage('<command>')

program
    .command('create [folder]')
    .description('create new blog')
    .action((folder = '') => {
        const ignore = 'Thumbs.db\n.DS_Store\n*.swp\n.cache/\nthemes/'

        try {
            console.log('Coping files ...'.blue)
            fs.copySync('../assets', path.join(process.cwd(), folder))
            fs.outputFileSync(path.join(process.cwd(), folder, '.gitignore'), ignore)
        } catch (e) {
            console.log('\u00D7'.red, e)
        }

        console.log('\u221A Configure "config.yml" to start your blog'.green)
    })

program
    .command('version')
    .description('Display AcyOrt version')
    .action(() => console.log(pkg.version.green))

program
    .command('server [port]')
    .description('Create a local test server')
    .action((port = 2222) => server(port))

program
    .command('build')
    .description('Generate the html')
    .action(() => index())

program.parse(process.argv)

if (!program.args.length || 'version create build server'.indexOf(process.argv[2]) == -1) {
    program.help()
}