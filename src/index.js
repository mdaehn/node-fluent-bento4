const os = require('os')
const exeExt = os.platform() === 'win32' ? '.exe' : ''
const batExt = os.platform() === 'win32' ? '.bat' : ''
const path = require('path')

const bento4 = create()
bento4.setBinPath = setBinPath

module.exports = bento4

function setBinPath(binPath) {
  return Object.assign(bento4, create(binPath))
}

function create(binPath = (process.env.BENTO4_BIN || '')) {
  return {
    binPath,
    aac2mp4: { path: path.join(binPath, `aac2mp4${exeExt}`) },
    mp42aac: { path: path.join(binPath, `mp42aac${exeExt}`) },
    mp42avc: { path: path.join(binPath, `mp42avc${exeExt}`) },
    mp42hevc: { path: path.join(binPath, `mp42hevc${exeExt}`) },
    mp42hls: { path: path.join(binPath, `mp42hls${exeExt}`) },
    mp42ts: { path: path.join(binPath, `mp42ts${exeExt}`) },
    mp4compact: { path: path.join(binPath, `mp4compact${exeExt}`) },
    mp4dash: { path: path.join(binPath, `mp4dash${batExt}`) },
    mp4dashclone: { path: path.join(binPath, `mp4dashclone${batExt}`) },
    mp4dcfpackager: { path: path.join(binPath, `mp4dcfpackager${exeExt}`) },
    mp4decrypt: { path: path.join(binPath, `mp4decrypt${exeExt}`) },
    mp4dump: { path: path.join(binPath, `mp4dump${exeExt}`) },
    mp4edit: { path: path.join(binPath, `mp4edit${exeExt}`) },
    mp4encrypt: { path: path.join(binPath, `mp4encrypt${exeExt}`) },
    mp4extract: { path: path.join(binPath, `mp4extract${exeExt}`) },
    mp4fragment: { path: path.join(binPath, `mp4fragment${exeExt}`) },
    mp4hls: { path: path.join(binPath, `mp4hls${batExt}`) },
    mp4info: { path: path.join(binPath, `mp4info${exeExt}`) },
    mp4mux: { path: path.join(binPath, `mp4mux${exeExt}`) },
    mp4rtphintinfo: { path: path.join(binPath, `mp4rtphintinfo${exeExt}`) },
    mp4split: { path: path.join(binPath, `mp4split${exeExt}`) },
    mp4tag: { path: path.join(binPath, `mp4tag${exeExt}`) }
  }
}
