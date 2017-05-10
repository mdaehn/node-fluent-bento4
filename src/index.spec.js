const bento4Commands = require('bento4-installer')
const equal = require('assert').deepEqual

describe('bento4', () => {
  describe('when using the default bento4 option', () => {
    const bento4 = require('./index')
    it('should set the bento4 command paths to the default', () => {
      Object.keys(bento4CommandNames).forEach(cmd => {
        equal(bento4[cmd].path, bento4CommandNames[cmd])
      })
    })
  })
  describe('when using the bin path of the bento4 installer', () => {
    const bento4 = require('./index')({ bin: bento4Commands.binPath })
    it('should set the bento4 command paths to the bento installers', () => {
      Object.keys(bento4CommandNames).forEach(cmd => {
        equal(bento4[cmd].path, bento4Commands[cmd])
      })
    })
  })
})

const bento4CommandNames = {
  aac2mp4: 'aac2mp4',
  mp42aac: 'mp42aac',
  mp42avc: 'mp42avc',
  mp42hevc: 'mp42hevc',
  mp42hls: 'mp42hls',
  mp42ts: 'mp42ts',
  mp4compact: 'mp4compact',
  mp4dash: 'mp4dash',
  mp4dashclone: 'mp4dashclone',
  mp4dcfpackager: 'mp4dcfpackager',
  mp4decrypt: 'mp4decrypt',
  mp4dump: 'mp4dump',
  mp4edit: 'mp4edit',
  mp4encrypt: 'mp4encrypt',
  mp4extract: 'mp4extract',
  mp4fragment: 'mp4fragment',
  mp4hls: 'mp4hls',
  mp4info: 'mp4info',
  mp4mux: 'mp4mux',
  mp4rtphintinfo: 'mp4rtphintinfo',
  mp4split: 'mp4split',
  mp4tag: 'mp4tag'
}
