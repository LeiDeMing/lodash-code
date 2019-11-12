import SetCache from './SetCache.js'
import arrayIncludes from './arrayIncludes.js'
import arrayIncludesWith from './arrayIncludesWith.js'
import map from '../map.js'
import cacheHas from './cacheHas.js'

/** Used as the size to enable large array optimizations. */
const LARGE_ARRAY_SIZE = 200

/**
 * The base implementation of methods like `difference` without support
 * for excluding multiple arrays.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  let includes = arrayIncludes
  let isCommon = true
  const result = []
  const valuesLength = values.length
  //数组长度为0，返回result
  if (!array.length) {
    return result
  }
  //如果由iteratee，则过滤函数,differentWith不走此逻辑
  if (iteratee) {
    values = map(values, (value) => iteratee(value))
  }
  //如果由comparator，将arrayIncludesWith函数赋值给includes，重写isCommon为true
  if (comparator) {
    includes = arrayIncludesWith
    isCommon = false
  }
  //比较数组大于200时，性能优化
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas
    isCommon = false
    //SetCache缓存独一无二的值
    values = new SetCache(values)
  }
  outer:
  for (let value of array) {
    // undefined == null result is true
    //computed为被比较对象
    const computed = iteratee == null ? value : iteratee(value)

    value = (comparator || value !== 0) ? value : 0
    if (isCommon && computed === computed) {
      let valuesIndex = valuesLength
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer
        }
      }
      result.push(value)
    }
    //differentWith直接走这一块逻辑,value(computed)不包含在values，将其push到result中
    /**
     * @param {Array} 比较数组
     * @param {Object} 被比较对象
     * @param {Function} 传入的方法
     */
    else if (!includes(values, computed, comparator)) {
      result.push(value)
    }
  }
  return result
}

export default baseDifference
