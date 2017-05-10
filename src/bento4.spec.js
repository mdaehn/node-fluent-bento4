const Bento4 = require('./bento4')
const bento4Commands = require('bento4-installer')
const os = require('os')
const equal = require('assert').deepEqual

describe('Bento4', function() {
  describe('constructor()', () => {
    describe('when new operator is NOT used', () => {
      const bento4 = Bento4(os, process)
      it('should create an instance of Bento4', () => {
        equal(bento4 instanceof Bento4, true)
      })
    })
    describe('when new operator is used', () => {
      const bento4 = new Bento4(os, process)
      it('should create an instance of Bento4', () => {
        equal(bento4 instanceof Bento4, true)
      })
    })
  })

  describe('setBinPath()', () => {
    describe('when passed the bin path from the bento4-installer', () => {
      it("should set the bento4 command paths to match bento4-installer's command", () => {
        const bento4 = Bento4(os, process).setBinPath(bento4Commands.binPath)
        Object.keys(bento4CommandNames).forEach(cmd => {
          equal(bento4[cmd].path, bento4Commands[cmd])
        })
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
