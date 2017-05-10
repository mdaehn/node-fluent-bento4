const os = require('os')
const Bento4 = require('./bento4')

module.exports = Object.assign(create, Bento4(os, process))

function create(options) {
  return Bento4(os, process, options)
}
