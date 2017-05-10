const spawn = require('cross-spawn')

module.exports = exec

/**
 * spawns a process to execute the given command.
 * @param {string} command - file path to the command to be executed
 * @param {Array} args - array command line arguments
 * @returns {Promise} - returns the data in the resolve and error in the reject
 **/
function exec(command, args) {
  return new Promise((resolve, reject) => {
    const cp = spawn(command, args)

    cp.on('error', err => reject(err))

    cp.on('exit', code => {
      if (error) return reject(error.trim())
      resolve(data)
    })

    let data = ''
    cp.stdout.on('data', chunk => (data += chunk))
    //cp.stdout.on('end', () => {console.log('>>>end stdout')})

    let error = ''
    cp.stderr.on('data', chunk => (error += chunk))
    //cp.stderr.on('end', () => {console.log('>>>end stderr', error)})
  })
}
