const spawn = require('cross-spawn')

module.exports = exec

function exec(command, args) {
  return new Promise((resolve, reject) => {
    const cp = spawn(command, args)

    cp.on('error', (err) => {
      reject(err)
    })
    cp.on('exit', (code) => {
      if(error) return reject(error.trim())

      resolve(data)
    })

    let data = '';
    cp.stdout.on('data', (chunk) => {
      data += chunk
    })
    //cp.stdout.on('end', () => {console.log('>>>end stdout')})

    let error = ''
    cp.stderr.on('data', (chunk) => {
      error += chunk
    })
    //cp.stderr.on('end', () => {console.log('>>>end stderr', error)})
  })
}
