const exec = require('./exec')


module.exports = Mp4Dump

/**
 * @constructor
 * The Mp4Dump Constructor
 *
 **/
function Mp4Dump() {
  if(!(this instanceof Mp4Dump)) {
    const obj = Object.create(Mp4Dump.prototype)
    return Mp4Dump.apply(obj, arguments)
  }

  return this
}

/**
 * path to the mp4dump executable
 **/
Mp4Dump.path = 'mp4dump'

/**
 * @param {string} input - path to input video
 * @param {Array} [args=[]] - Array of bento4 mp4dump command arguments
 *
 * @returns {Promise} - resolves with stdout on success and stderr on failure
 **/
Mp4Dump.exec = function (input, args = []) {
  args.push(input)
  return exec(Mp4Dump.path, args).then((data) => {
    if(args.some(a => a && a.toLowerCase())) {
      return JSON.parse(data)
    }

    return data
  })
}
