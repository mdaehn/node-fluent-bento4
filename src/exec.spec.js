const path = require('path')
const { mp4dump } = require('bento4-installer')
const exec = require('./exec')
const equal = require('assert').deepEqual

describe('exec()', function() {
  describe('passed mp4dump command with input video and json format options', function() {
    it('should exec and return text with ftyp in it', async () => {
      const data = await exec(mp4dump, [
        '--format',
        'text',
        `${path.resolve(__dirname, '..')}/test/videos/myloves.mp4`
      ])
      equal(data.includes('ftyp'), true)
    })
    it('should exec and throw an error with unknown output format error', async () => {
      let error
      try {
        await exec(mp4dump, [
          '--format',
          `${path.resolve(__dirname, '..')}/test/videos/myloves.mp4`
        ])
      } catch (e) {
        error = e
      }
      equal(error, 'ERROR: unknown output format')
    })
  })
})
