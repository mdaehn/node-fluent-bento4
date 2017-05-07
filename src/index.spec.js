const bento4 = require('./index')
const bento4Commands = require('bento4-installer')
const equal = require('assert').deepEqual

describe.only('bento4', function () {
  describe('setBinPath()', () => {
    it('should set the bento4 command paths to match bento4-installer\'s command', () => {
      bento4.setBinPath(bento4Commands.binPath)
      bento4CommandNames.forEach((cmd) => {
        equal(bento4[cmd].path, bento4Commands[cmd])
      })
    })
  })
})


const bento4CommandNames = [
  'aac2mp4',
  'mp42aac',
  'mp42avc',
  'mp42hevc',
  'mp42hls',
  'mp42ts',
  'mp4compact',
  'mp4dash',
  'mp4dashclone',
  'mp4dcfpackager',
  'mp4decrypt',
  'mp4dump',
  'mp4edit',
  'mp4encrypt',
  'mp4extract',
  'mp4fragment',
  'mp4hls',
  'mp4info',
  'mp4mux',
  'mp4rtphintinfo',
  'mp4split',
  'mp4tag'
]
