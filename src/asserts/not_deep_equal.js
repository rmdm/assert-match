import fallbackAssert from 'core-assert'
import buildAssertion from '../util/build_assertion'
import { strict } from '../matchers'

export default function (baseAssert) {

    function comparator (actual, expected) {
        try {
            if (baseAssert.notDeepEqual) {
                baseAssert.notDeepEqual(actual, expected)
            } else {
                fallbackAssert.notDeepEqual(actual, expected)
            }
            return true
        } catch (e) {
            return false
        }
    }

    return buildAssertion(baseAssert, 'notMatch', strict, comparator)
}
