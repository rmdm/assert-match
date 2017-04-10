import fallbackAssert from 'core-assert'
import buildAssertion from '../util/build_assertion'
import { strict } from '../matchers'

export default function (baseAssert) {

    function comparator (actual, expected) {
        try {
            if (baseAssert.deepStrictEqual) {
                baseAssert.deepStrictEqual(actual, expected)
            } else {
                fallbackAssert.deepStrictEqual(actual, expected)
            }
            return true
        } catch (e) {
            return false
        }
    }

    return buildAssertion(baseAssert, 'deepStrictEqual', strict, comparator)
}
