const path = require('path')
const createInstance = require('./create-instance')
const { Mp4DumpCommand } = require('./commands')

module.exports = Bento4

/**
 * @constructor
 * The Bento4 Constructor
 *
 **/
function Bento4(os, process, { bin } = {}) {
  const EXE_EXT = os.platform() === 'win32' ? '.exe' : ''
  const BAT_EXT = os.platform() === 'win32' ? '.bat' : ''
  /** @constant {string} - the bin folder of the executables */
  const DEFAULT_BIN = process.env.BENTO4_BIN || ''

  const self = createInstance(this, Bento4, arguments)

  /**
   * Set the bin folder of the executable command
   * @param {string} [binPath=DEFAULT_BIN] - the path to the bin folder. defaults the env variable DEFAULT_BIN or ''
   *
   * @returns {Bento4} - The Bento4 constructor function
   **/
  self.setBinPath = function(binPath = DEFAULT_BIN) {
    return Bento4(os, process, { bin: binPath })
  }

  self.bin = bin || DEFAULT_BIN
  //=========================================================
  // COMMANDS
  //=========================================================
  self.aac2mp4 = { path: path.join(self.bin, `aac2mp4${EXE_EXT}`) }
  self.mp42aac = { path: path.join(self.bin, `mp42aac${EXE_EXT}`) }
  self.mp42avc = { path: path.join(self.bin, `mp42avc${EXE_EXT}`) }
  self.mp42hevc = { path: path.join(self.bin, `mp42hevc${EXE_EXT}`) }
  self.mp42hls = { path: path.join(self.bin, `mp42hls${EXE_EXT}`) }
  self.mp42ts = { path: path.join(self.bin, `mp42ts${EXE_EXT}`) }
  self.mp4compact = { path: path.join(self.bin, `mp4compact${EXE_EXT}`) }
  self.mp4dash = { path: path.join(self.bin, `mp4dash${BAT_EXT}`) }
  self.mp4dashclone = { path: path.join(self.bin, `mp4dashclone${BAT_EXT}`) }
  self.mp4dcfpackager = { path: path.join(self.bin, `mp4dcfpackager${EXE_EXT}`) }
  self.mp4decrypt = { path: path.join(self.bin, `mp4decrypt${EXE_EXT}`) }
  self.mp4dump = Mp4DumpCommand(os, process, { bin: self.bin })
  self.mp4edit = { path: path.join(self.bin, `mp4edit${EXE_EXT}`) }
  self.mp4encrypt = { path: path.join(self.bin, `mp4encrypt${EXE_EXT}`) }
  self.mp4extract = { path: path.join(self.bin, `mp4extract${EXE_EXT}`) }
  self.mp4fragment = { path: path.join(self.bin, `mp4fragment${EXE_EXT}`) }
  self.mp4hls = { path: path.join(self.bin, `mp4hls${BAT_EXT}`) }
  self.mp4info = { path: path.join(self.bin, `mp4info${EXE_EXT}`) }
  self.mp4mux = { path: path.join(self.bin, `mp4mux${EXE_EXT}`) }
  self.mp4rtphintinfo = { path: path.join(self.bin, `mp4rtphintinfo${EXE_EXT}`) }
  self.mp4split = { path: path.join(self.bin, `mp4split${EXE_EXT}`) }
  self.mp4tag = { path: path.join(self.bin, `mp4tag${EXE_EXT}`) }

  return self
}
