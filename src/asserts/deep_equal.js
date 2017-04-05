import fallbackAssert from 'core-assert'
import buildAssertion from '../util/build_assertion'
import { strict } from '../matchers'

export default function (baseAssert) {

    function comparator (actual, expected) {
        try {
            if (baseAssert.deepEqual) {
                baseAssert.deepEqual(actual, expected)
            } else {
                fallbackAssert.deepEqual(actual, expected)
            }
            return true
        } catch (e) {
            return false
        }
    }

    return buildAssertion(baseAssert, 'deepEqual', strict, comparator)
}
