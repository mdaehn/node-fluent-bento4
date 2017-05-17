# node-fluent-bento4
This is a simple node module that provides a fluent api for the bento4 commands. At minimum, it provides a means to set the location of the binaries and execute a command.

## Installation
```js
npm i --save fluent-bento4
```

## Usage
When the `fluent-bento` is required, as seen below, it returns a Bento4 object with the binPath not set, assuming a global install, or set to the value set in the environment variable `BENTO4_BIN`:

```js
const bento4 = require('fluent-bento4')
```

To set the binPath of the executable binaries you can do it by using the constructor function as show below:

```js
const bento4 = require('fluent-bento4')({bin:'/a/path/to/the/bin'})
```

You can set the binPath also by using the `setBinPath` method on the Bento4 object, as show below.

```js
const newBento4 = bento4.setBinPath('/a/path/to/the/bin')
```
The thing to note here is that the `setBinPath` method returns a new Bento4 object and does not set the binPath on Bento4 object of the method itself. The state of the bento4 object is immutable.

##Executing Commands
Every command has an `exec(input, args=[])` method.

The `input` parameter can be a string or an array of strings that represent the file path of input video (e.g `/videos/myvid.mp4` or `['/videos/myvid1.mp4', '/videos/myvid2.mp4']`).

The `args` parameter is an array of command options for the specific command. For example, the `mp4dump` commands args parameter may look like this `['--format', 'json']`.

```js
const { binPath } = require('bento4-installer')
const bento4 = require('bento4')({bin:binPath})
const inputVideo = path.join(__dirname, '/videos/vid.mp4')
const args = ['--format', 'json']

const jsonDump = bento4.mp4dump.exec(inputVideo, args)

```
