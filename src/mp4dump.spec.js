const path = require('path')
const os = require('os')
const { binPath, mp4dump } = require('bento4-installer')
const Mp4DumpCommand = require('./mp4dump')
const equal = require('assert').deepEqual

describe('Mp4DumpCommand', () => {
  const inputVideo = `${path.resolve(__dirname, '..')}/test/videos/myloves.mp4`
  describe('setBinPath()', () => {
    describe('when called with the bento4-installer binPath', () => {
      const mp4dumpCommand = Mp4DumpCommand(os, process).setBinPath(binPath)
      it(`should set the command path ${mp4dump}`, () => {
        equal(mp4dumpCommand.path, mp4dump)
      })
      it(`should set the bin path to ${binPath}`, () => {
        equal(mp4dumpCommand.bin, binPath)
      })
    })
    describe('when called with no parameters and process.env.BENTO4_BIN is NOT set', () => {
      const BENTO4_BIN = '/bento/fake/bin'
      const mp4dumpCommand = Mp4DumpCommand(os, {
        env: { BENTO4_BIN }
      }).setBinPath()
      const expectedPath = path.join(BENTO4_BIN, mp4dumpCommand.filename)
      it(`should set the command path ${mp4dump}`, () => {
        equal(mp4dumpCommand.path, expectedPath)
      })
      it(`should set the bin path to empty string`, () => {
        equal(mp4dumpCommand.bin, BENTO4_BIN)
      })
    })
  })

  describe('constructor()', () => {
    describe('when new operator is NOT used', () => {
      const mp4dumpCommand = Mp4DumpCommand(os, process)
      it(`should create an instance of Mp4DumpCommand`, () => {
        equal(mp4dumpCommand instanceof Mp4DumpCommand, true)
      })
    })
    describe('when new operator is used', () => {
      const mp4dumpCommand = new Mp4DumpCommand(os, process)
      it('should create an instance of Mp4DumpCommand', () => {
        equal(mp4dumpCommand instanceof Mp4DumpCommand, true)
      })
    })
    describe('when passed options with bin property set', () => {
      const bin = '/a/fake/bin'
      const mp4dumpCommand = new Mp4DumpCommand(os, process, { bin })
      it('should create an instance with bin property set to the options bin property', () => {
        equal(mp4dumpCommand.bin, bin)
      })
    })
    describe("when os.platform() returns 'win32'", function() {
      const fakeOs = { platform: () => 'win32' }
      const mp4dumpCommand = new Mp4DumpCommand(fakeOs, process)
      const expectedFilename = 'mp4dump.exe'
      it(`should create an instance with the filename property set to ${expectedFilename}`, () => {
        equal(mp4dumpCommand.filename, expectedFilename)
      })
    })
    describe("when os.platform() return is NOT 'win32'", function() {
      const fakeOs = { platform: () => 'darwin' }
      const mp4dumpCommand = new Mp4DumpCommand(fakeOs, process)
      const expectedFilename = 'mp4dump'
      it(`should create an instance with the filename property set to ${expectedFilename}`, () => {
        equal(mp4dumpCommand.filename, expectedFilename)
      })
    })
  })

  describe('exec()', () => {
    const mp4dumpCommand = Mp4DumpCommand(os, process, { bin: binPath })
    describe('when passed video input path and format argument set to json', function() {
      it('should exec and return a json object', async () => {
        const data = await mp4dumpCommand.exec(inputVideo, ['--format', 'json'])
        equal(Array.isArray(data), true)
        equal(data.length, 3)
        equal(data[0].name, 'ftyp')
      })
    })
    describe('when passed video input path and format argument set to text', function() {
      it('should exec and return a text object', async () => {
        const data = await mp4dumpCommand.exec(inputVideo, ['--format', 'text'])
        equal(typeof data === 'string', true)
        equal(data.indexOf('ftyp') !== -1, true)
      })
    })
    describe('when passed video input path and format argument NOT set', function() {
      it('should exec and return a text object', async () => {
        const data = await mp4dumpCommand.exec(inputVideo)
        equal(typeof data === 'string', true)
        equal(data.indexOf('ftyp') !== -1, true)
      })
    })
  })
})
