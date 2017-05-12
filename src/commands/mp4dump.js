const Command = require('./command')

module.exports = Mp4Dump

/**
 * @constructor
 * The Mp4Dump Constructor
 *
 **/
function Mp4Dump(os, process, options = {}) {
  const instance = this

  if (!(instance instanceof Mp4Dump)) {
    const obj = Object.create(Mp4Dump.prototype)
    return Mp4Dump.apply(obj, arguments)
  }

  Object.assign(options, { win32ext: 'exe' })
  Object.assign(instance, Command(os, process, Mp4Dump, options))

  return Object.freeze(instance)
}
