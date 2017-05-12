const path = require('path')
const os = require('os')
const { binPath } = require('bento4-installer')
const Mp4Dump = require('./mp4dump')
const equal = require('assert').deepEqual

describe('Mp4Dump', () => {
  const inputVideo = `${path.resolve(__dirname, '../..')}/test/videos/myloves.mp4`

  describe('constructor()', () => {
    describe('when new operator is NOT used', () => {
      const mp4dump = Mp4Dump(os, process)
      it(`should create an instance of Mp4Dump`, () => {
        equal(mp4dump instanceof Mp4Dump, true)
      })
    })
    describe('when new operator is used', () => {
      const mp4dump = new Mp4Dump(os, process)
      it('should create an instance of Mp4Dump', () => {
        equal(mp4dump instanceof Mp4Dump, true)
      })
    })
    describe('when passed options with bin property set', () => {
      const bin = '/a/fake/bin'
      const mp4dump = new Mp4Dump(os, process, { bin })
      it('should create an instance with bin property set to the options bin property', () => {
        equal(mp4dump.bin, bin)
      })
    })
    describe("when os.platform() returns 'win32'", function() {
      const fakeOs = { platform: () => 'win32' }
      const mp4dump = new Mp4Dump(fakeOs, process)
      const expectedFilename = 'mp4dump.exe'
      it(`should create an instance with the filename property set to ${expectedFilename}`, () => {
        equal(mp4dump.filename, expectedFilename)
      })
    })
    describe("when os.platform() return is NOT 'win32'", function() {
      const fakeOs = { platform: () => 'darwin' }
      const mp4dump = new Mp4Dump(fakeOs, process)
      const expectedFilename = 'mp4dump'
      it(`should create an instance with the filename property set to ${expectedFilename}`, () => {
        equal(mp4dump.filename, expectedFilename)
      })
    })
  })

  describe('exec()', () => {
    const mp4dump = Mp4Dump(os, process, { bin: binPath })
    describe('when passed video input path and format argument set to json', function() {
      it('should exec and return a json object', async () => {
        const data = await mp4dump.exec(inputVideo, ['--format', 'json'])
        equal(Array.isArray(data), true)
        equal(data.length, 3)
        equal(data[0].name, 'ftyp')
      })
    })
    describe('when passed video input path and format argument set to text', function() {
      it('should exec and return a text object', async () => {
        const data = await mp4dump.exec(inputVideo, ['--format', 'text'])
        equal(typeof data === 'string', true)
        equal(data.indexOf('ftyp') !== -1, true)
      })
    })
    describe('when passed video input path and format argument NOT set', function() {
      it('should exec and return a text object', async () => {
        const data = await mp4dump.exec(inputVideo)
        equal(typeof data === 'string', true)
        equal(data.indexOf('ftyp') !== -1, true)
      })
    })
  })
})
