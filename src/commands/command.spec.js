const path = require('path')
const os = require('os')
const { binPath, mp4dump } = require('bento4-installer')
const Mp4Dump = require('./mp4dump')
const Command = require('./command')
const equal = require('assert').deepEqual

describe('Command', () => {
  const inputVideo = `${path.resolve(__dirname, '../..')}/test/videos/myloves.mp4`

  describe('constructor()', () => {
    describe('when new operator is NOT used', () => {
      const command = Command(os, process, Mp4Dump)
      it(`should create an instance of Command`, () => {
        equal(command instanceof Command, true)
      })
    })
    describe('when new operator is used', () => {
      const command = new Command(os, process, Mp4Dump)
      it('should create an instance of Command', () => {
        equal(command instanceof Command, true)
      })
    })
    describe('when passed options with bin property set', () => {
      const bin = '/a/fake/bin'
      const command = new Command(os, process, Mp4Dump, { bin })
      it('should create an instance with bin property set to the options bin property', () => {
        equal(command.bin, bin)
      })
    })
    describe("when os.platform() returns 'win32'", function() {
      const fakeOs = { platform: () => 'win32' }
      const command = new Command(fakeOs, process, Mp4Dump)
      const expectedFilename = 'mp4dump.exe'
      it(`should create an instance with the filename property set to ${expectedFilename}`, () => {
        equal(command.filename, expectedFilename)
      })
    })
    describe("when os.platform() return is NOT 'win32'", function() {
      const fakeOs = { platform: () => 'darwin' }
      const command = new Command(fakeOs, process, Mp4Dump)
      const expectedFilename = 'mp4dump'
      it(`should create an instance with the filename property set to ${expectedFilename}`, () => {
        equal(command.filename, expectedFilename)
      })
    })
  })

  describe('setBinPath()', () => {
    describe('when called with the bento4-installer binPath', () => {
      const command = Command(os, process, Mp4Dump).setBinPath(binPath)
      it(`should set the command path ${mp4dump}`, () => {
        equal(command.path, mp4dump)
      })
      it(`should set the bin path to ${binPath}`, () => {
        equal(command.bin, binPath)
      })
      it('should return an instance of the Mp4Dump command', () => {
        equal(command instanceof Mp4Dump, true)
      })
    })
    describe('when called with no parameters and process.env.BENTO4_BIN is NOT set', () => {
      const BENTO4_BIN = '/bento/fake/bin'
      const fakeProcess = { env: { BENTO4_BIN } }
      const command = Command(os, fakeProcess, Mp4Dump).setBinPath()
      const expectedPath = path.join(BENTO4_BIN, command.filename)
      it(`should set the command path ${mp4dump}`, () => {
        equal(command.path, expectedPath)
      })
      it(`should set the bin path to empty string`, () => {
        equal(command.bin, BENTO4_BIN)
      })
    })
  })

  describe('exec()', () => {
    const command = Command(os, process, Mp4Dump, { bin: binPath })
    describe('when passed video input path and format argument set to json', function() {
      it('should exec and return a json object', async () => {
        const data = await command.exec(inputVideo, ['--format', 'json'])
        equal(Array.isArray(data), true)
        equal(data.length, 3)
        equal(data[0].name, 'ftyp')
      })
    })
    describe('when passed video input path and format argument set to text', function() {
      it('should exec and return a text object', async () => {
        const data = await command.exec(inputVideo, ['--format', 'text'])
        equal(typeof data === 'string', true)
        equal(data.indexOf('ftyp') !== -1, true)
      })
    })
    describe('when passed video input path and format argument NOT set', function() {
      it('should exec and return a text object', async () => {
        const data = await command.exec(inputVideo)
        equal(typeof data === 'string', true)
        equal(data.indexOf('ftyp') !== -1, true)
      })
    })
  })

  describe('Command._ensureTypeIsNamedFunction()', () => {
    describe('when called with a CmdType that is a string', () => {
      const CmdType = 'mp4dump'
      const Cmd = Command._ensureTypeIsNamedFunction(os, process, CmdType, { bin: binPath })
      const cmd = Cmd(os, process, { bin: binPath })

      it('should return a function with name set to mp4dump', () => {
        equal(typeof Cmd, 'function', true)
        equal(Cmd.name, 'mp4dump')
      })

      describe('And when the function returned is called with the os, process, and options', () => {
        it(`should return a command with the filename set to ${CmdType}`, () => {
          equal(cmd.filename === CmdType, true)
        })
        it('should return a command with the path set to the correct value', () => {
          equal(cmd.path === path.join(binPath, cmd.filename), true)
        })
        it('should return a command with a exec function', () => {
          equal(typeof cmd.exec === 'function', true)
        })
      })
    })
  })
})
