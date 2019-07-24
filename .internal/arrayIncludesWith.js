/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, target, comparator) {
  //array为空，返回false
  if (array == null) {
    return false
  }
  //遍历array，将array中的每个对象与target对象对比，运行要回调的函数
  for (const value of array) {
    if (comparator(target, value)) {
      return true
    }
  }
  return false
}

export default arrayIncludesWith
