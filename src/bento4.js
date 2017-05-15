const { Command } = require('./commands')

module.exports = Bento4

/**
 * @constructor
 * The Bento4 Constructor
 *
 **/
function Bento4(os, process, { bin } = {}) {
  /** @constant {string} - the bin folder of the executables */
  const DEFAULT_BIN = process.env.BENTO4_BIN || ''

  const instance = this

  if (!(instance instanceof Bento4)) {
    const obj = Object.create(Bento4.prototype)
    return Bento4.apply(obj, arguments)
  }
  /**
   * Set the bin folder of the executable command
   * @param {string} [binPath=DEFAULT_BIN] - the path to the bin folder. defaults the env variable DEFAULT_BIN or ''
   *
   * @returns {Bento4} - The Bento4 constructor function
   **/
  instance.setBinPath = function(binPath = DEFAULT_BIN) {
    return Bento4(os, process, { bin: binPath })
  }

  /** @member {string} - the path to the bin folder containing the executables */
  instance.bin = bin || DEFAULT_BIN
  //=========================================================
  // COMMANDS
  //=========================================================
  instance.aac2mp4 = Command(os, process, 'aac2mp4', { bin: instance.bin })
  instance.mp42aac = Command(os, process, 'mp42aac', { bin: instance.bin })
  instance.mp42avc = Command(os, process, 'mp42avc', { bin: instance.bin })
  instance.mp42hevc = Command(os, process, 'mp42hevc', { bin: instance.bin })
  instance.mp42hls = Command(os, process, 'mp42hls', { bin: instance.bin })
  instance.mp42ts = Command(os, process, 'mp42ts', { bin: instance.bin })
  instance.mp4compact = Command(os, process, 'mp4compact', { bin: instance.bin })
  instance.mp4dash = Command(os, process, 'mp4dash', { bin: instance.bin, win32ext: 'bat' })
  instance.mp4dashclone = Command(os, process, 'mp4dashclone', { bin: instance.bin, win32ext: 'bat' })
  instance.mp4dcfpackager = Command(os, process, 'mp4dcfpackager', { bin: instance.bin })
  instance.mp4decrypt = Command(os, process, 'mp4decrypt', { bin: instance.bin })
  instance.mp4dump = Command(os, process, 'mp4dump', { bin: instance.bin })
  instance.mp4edit = Command(os, process, 'mp4edit', { bin: instance.bin })
  instance.mp4encrypt = Command(os, process, 'mp4encrypt', { bin: instance.bin })
  instance.mp4extract = Command(os, process, 'mp4extract', { bin: instance.bin })
  instance.mp4fragment = Command(os, process, 'mp4fragment', { bin: instance.bin })
  instance.mp4hls = Command(os, process, 'mp4hls', { bin: instance.bin, win32ext: 'bat' })
  instance.mp4info = Command(os, process, 'mp4info', { bin: instance.bin })
  instance.mp4mux = Command(os, process, 'mp4mux', { bin: instance.bin })
  instance.mp4rtphintinfo = Command(os, process, 'mp4rtphintinfo', { bin: instance.bin })
  instance.mp4split = Command(os, process, 'mp4split', { bin: instance.bin })
  instance.mp4tag = Command(os, process, 'mp4tag', { bin: instance.bin })

  return instance
}
