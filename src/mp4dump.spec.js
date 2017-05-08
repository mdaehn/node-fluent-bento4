const path = require('path')
const os = require('os')
const { binPath, mp4dump } = require('bento4-installer')
const { Mp4DumpCommand } = require('./mp4dump')
const  Mp4DumpCommandCurried = require('./mp4dump')(os, process, {bin: binPath})
const equal = require('assert').deepEqual

describe('Mp4DumpCommand', () => {
  const inputVideo = `${path.resolve(__dirname, '..')}/test/videos/myloves.mp4`
  describe('Mp4DumpCommand.setBinPath()', () => {
    describe('when called with the bento4-installer binPath', () => {
      const mp4dumpCommand = Mp4DumpCommand(os, process, {}).setBinPath(binPath)
      it(`should set the command path ${mp4dump}`, () => {
        equal(mp4dumpCommand.path, mp4dump)
      })
      it(`should set the bin path to ${binPath}`, () => {
        equal(mp4dumpCommand.bin, binPath)
      })
    })
    describe('when called with no parameters and process.env.BENTO4_BIN is NOT set', () => {
      it(`should set the bin path to empty string`, () => {
        const mp4dumpCommand = Mp4DumpCommand(os, process).setBinPath()
        equal(mp4dumpCommand.bin, '')
      })
    })
  })

  describe('constructor()', () => {
    describe('when new operator is NOT used', () => {
      it(`should create an instance of Mp4DumpCommand`, () => {
        const mp4dumpCommand = Mp4DumpCommand(os, process)
        equal(mp4dumpCommand instanceof Mp4DumpCommand, true)
      })
    })
    describe('when new operator is used', () => {
      it('should create an instance of Mp4DumpCommand', () => {
        const mp4dumpCommand = new Mp4DumpCommand(os, process)
        equal(mp4dumpCommand instanceof Mp4DumpCommand, true)
      })
    })
  })

  describe('exec()', () => {
    const mp4dumpCommand = Mp4DumpCommand(os, process, {bin:binPath})
    describe('when passed video input path and format argument set to json', function () {
      it('should exec and return a json object', async () => {
        const data = await mp4dumpCommand.exec(inputVideo,  ['--format', 'json'])
        equal(Array.isArray(data), true)
        equal(data.length, 3)
        equal(data[0].name, 'ftyp')
      })
    })
    describe('when passed video input path and format argument set to text', function () {
      it('should exec and return a text object', async () => {
        const data = await mp4dumpCommand.exec(inputVideo,  ['--format', 'text'])
        equal(typeof data === 'string', true)
        equal(data.indexOf('ftyp') !== -1, true)
      })
    })
    describe('when passed video input path and format argument not set', function () {
      it('should exec and return a text object', async () => {
        const data = await mp4dumpCommand.exec(inputVideo)
        equal(typeof data === 'string', true)
        equal(data.indexOf('ftyp') !== -1, true)
      })
    })
  })
})
