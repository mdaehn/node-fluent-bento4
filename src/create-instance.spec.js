const equal = require('assert').deepEqual
const createInstance = require('./create-instance')

describe('util', () => {
  describe('createInstance()', () => {
    function D() {
      const self = createInstance(this, D, arguments)
      return self
    }
    describe('when D is NOT called with new operator', function() {
      const i = D()
      it('should be an instanceof D', () => {
        equal(i instanceof D, true)
      })
    })
    describe('when D is called with new operator', function() {
      const i = new D()
      it('should be an instanceof D', () => {
        equal(i instanceof D, true)
      })
    })
  })
})
