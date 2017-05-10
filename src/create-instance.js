module.exports = createInstance

/**
 * Ensures the self is an instance of the Mp4DumpCommand object. If not,
 * it creates one with the calling functions arguments
 * @param {object} self - pointer to the constructor function
 * @param {Type} Type - the type being instantiated (e.g. Mp4DumpCommand)
 * @returns {Type} - the instance of Type
 **/
function createInstance(self, Type, args) {
  if (!(self instanceof Type)) {
    const obj = Object.create(Type.prototype)
    return Type.apply(obj, args)
  }

  return self
}
