const path = require('path')
const { mp4dump } = require('bento4-installer')
const Mp4Dump = require('./mp4dump')
const equal = require('assert').deepEqual

describe('Mp4Dump', () => {
  const inputVideo = `${path.resolve(__dirname, '..')}/test/videos/myloves.mp4`
  Mp4Dump.command = mp4dump
  describe('Mp4Dump.command', function () {
    it(`should set the command ${mp4dump}`, () => {
      equal(Mp4Dump.command, mp4dump)
    })
  })
  describe('constructor()', () => {
    describe('without new operator', () => {
      it(`should create an instance of Mp4Dump`, () => {
        const mp4dumpCommand = Mp4Dump()
        equal(mp4dumpCommand instanceof Mp4Dump, true)
      })
    })
    describe('with new operator', () => {
      it('should create an instance of Mp4Dump', () => {
        const mp4dumpCommand = new Mp4Dump()
        equal(mp4dumpCommand instanceof Mp4Dump, true)
      })
    })
  })
  describe('exec()', function () {
    describe('passed input and args', function () {
      it('should exec', async () => {
        const data = await Mp4Dump.exec(inputVideo,  ['--format', 'json'])
        equal(data.length, 3)
        equal(data[0].name, 'ftyp')
      })
    })
  })
})
