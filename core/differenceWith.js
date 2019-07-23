import baseDifference from '../.internal/baseDifference.js'
import baseFlatten from '../.internal/baseFlatten.js'
import isArrayLikeObject from './isArrayLikeObject.js'
import last from './last.js'

/**
 * This method is like `difference` except that it accepts `comparator`
 * which is invoked to compare elements of `array` to `values`. The order and
 * references of result values are determined by the first array. The comparator
 * is invoked with two arguments: (arrVal, othVal).
 *
 * **Note:** Unlike `pullAllWith`, this method returns a new array.
 *
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {...Array} [values] The values to exclude.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
 *
 * differenceWith(objects, [{ 'x': 1, 'y': 2 }], isEqual)
 * // => [{ 'x': 2, 'y': 1 }]
 */
function differenceWith(array, ...values) {
  //last方法截取数组最后一位
  let comparator = last(values)

  //如果是类数组对象 将comparator重置为 undefined
  if (isArrayLikeObject(comparator)) {
    comparator = undefined
  }

  //baseFlatten用于分离最后一个参数和其余参数（第一个采纳数与除外），将对比回调函数和数组分开
  return isArrayLikeObject(array)
    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), undefined, comparator)
    : []
}

export default differenceWith
