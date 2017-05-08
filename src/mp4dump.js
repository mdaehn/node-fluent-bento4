const exec = require('./exec')
const path = require('path')

module.exports = curry

function curry (os, process, options) {
  return () => Mp4DumpCommand(os, process, options)
}

curry.Mp4DumpCommand = Mp4DumpCommand

/**
 * @constructor
 * The Mp4DumpCommand Constructor
 *
 **/
function Mp4DumpCommand(os, process, { bin } = {}) {
  /** @constant {string} - the executable command file name */
  const DEFAULT_BIN = process.env.BENTO4_BIN_PATH || ''

  const self = create(this, arguments)

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




/**
 * Ensures the self is an instance of the Mp4DumpCommand object. If not,
 * it creates one with the calling functions arguments
 * @param {object} self - pointer to the constructor function
 * @returns {Mp4DumpCommand} - the instance of Mp4DumpCommand
 **/
function create(self, args) {
  if(!(self instanceof Mp4DumpCommand)) {
    const obj = Object.create(Mp4DumpCommand.prototype)
    return Mp4DumpCommand.apply(obj, args)
  }

  return self
}
