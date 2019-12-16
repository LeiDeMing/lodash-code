import isPrototype from './isPrototype.js'

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
  //严格克隆自身继承的prototype
    ? Object.create(Object.getPrototypeOf(object))
    : {}
}

export default initCloneObject
