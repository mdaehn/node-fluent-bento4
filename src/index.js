const spawn = require('cross-spawn')
let config = {
  mp4dump: 'mp4dump'
}



module.exports = bento4

function bento4(path) {
  config.binPath = path
}

bento4.mp4dump = function (mp4dumpCommand) {
  config.mp4dump = mp4dumpCommand

  return bento4.mp4dump
}

bento4.mp4dump.exec = (inputVideo, args) => {
  return exec(config.mp4dump, inputVideo, args)
}


function exec(command, inputVideo, args) {
  if(Array.isArray(args)) {
    args.push(inputVideo)
  } else {
    args = [inputVideo]
  }
  return new Promise((resolve, reject) => {
    console.log('/===>command=', command)
    console.log('/===>args=', args)
    const cp = spawn(command, args)

    cp.on('error', (error) => {
      reject(error)
    })
    cp.on('exit', (code) => {
      console.log('code', code)
    })

    let data = '';
    cp.stdout.on('data', (chunk) => {
      data += chunk
    })

    cp.stdout.on('end', () => {
      resolve(JSON.parse(data))
    })

    let error = ''
    cp.stderr.on('data', (chunk) => {
      error += chunk
    })

    cp.stderr.on('end', () => {
      if(error) reject(error)
    })
  })
}
