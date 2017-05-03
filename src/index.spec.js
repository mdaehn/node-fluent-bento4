const { mp4dump:mp4dumpCommand } = require('bento4-installer')
const bento4 = require('./index')
const spawn = require('cross-spawn')
const path = require('path')

describe.skip('fluent-bento4', function () {
  const inputVideo = `${path.resolve(__dirname, '..')}/test/videos/myloves.mp4`

  it('should execute the mp4dump command', async function () {
    const args = ['--format', 'json']
    const json = await bento4.mp4dump(mp4dumpCommand).exec(inputVideo, args)
    console.log('json', json)
  })
  it('should spawn the mp4dump command with cross-spawn', (done) => {
    const cp = spawn(mp4dumpCommand, ['--format', 'json', inputVideo])
    cp.on('error', (error) => {
      done()
      console.log('/===>error=', error)
    })
    cp.on('exit', (code, signal) => {
      done()
      console.log(`exiting with code ${code} and signal ${signal}`)
    })

    test(cp.stdout, 'stdout')
    test(cp.stderr, 'stderr')

  })
})

function test(stream, name) {
  let data = '';
  stream.on('data', (chunk) => {
    data += chunk
    // console.log(`/${name}===>chunk=`, chunk.toString())
  })

  stream.on('end', () => {
    if(data) {
      const json = JSON.parse(data)
      console.log(`ending ${name} json[0] = ${json[0].name}`)
    } else {
      console.log(`ending ${name}`)
    }
  })
}
