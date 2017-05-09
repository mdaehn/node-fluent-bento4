const exec = require('./exec')
const path = require('path')
const createInstance = require('./create-instance')

module.exports = Mp4DumpCommand

/**
 * @constructor
 * The Mp4DumpCommand Constructor
 *
 **/
function Mp4DumpCommand(os, process, { bin } = {}) {
  /** @constant {string} - the executable command file name */
  const DEFAULT_BIN = process.env.BENTO4_BIN || ''

  const self = createInstance(this, Mp4DumpCommand, arguments)

  self.filename = `mp4dump${os.platform() === 'win32' ? '.exe' : ''}`
  self.bin = bin || DEFAULT_BIN
  self.path = path.join(self.bin, self.filename)

  /**
   * Set the bin folder of the executable command
   * @param {string} [binPath=''] - the path to the bin folder
   *
   * @returns {Mp4DumpCommand} - The Mp4DumpCommand constructor function
   **/
  self.setBinPath = function (binPath = DEFAULT_BIN) {
    return Mp4DumpCommand(os, process, { bin:binPath })
  }

  /**
   * @param {string} input - path to input video
   * @param {Array} [args=[]] - Array of bento4 mp4dump command arguments
   *
   * @returns {Promise} - resolves with stdout on success and stderr on failure
   **/
  self.exec = function (input, args = []) {
    args.push(input)
    return exec(self.path, args).then((data) => {
      if(args.some(a => a && a.toLowerCase() === 'json')) {
        return JSON.parse(data)
      }

      return data
    })
  }

  return Object.freeze(self)
}
