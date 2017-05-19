const path = require('path')
const { binPath } = require('bento4-installer')
const bento4 = require('../index')({ bin: binPath })
const equal = require('assert').deepEqual

describe('Bento4.mp4hls', () => {
  const inputVideo = `${path.resolve(__dirname, '../..')}/test/videos/myloves.mp4`
  const outputDir = `${path.resolve(__dirname, '../../')}/test/output/hls`

  describe('exec()', () => {
    describe('when passed video input path and format argument set to json', function() {
      it('should exec and return a json object', async () => {
        const data = await bento4.mp4hls.exec(inputVideo, [
          '--output-dir',
          outputDir,
          '--force',
          '--hls-version=6',
          '--output-single-file'
        ])

        equal(data.includes('Parsing media file'), true)
      })
    })
  })
})
