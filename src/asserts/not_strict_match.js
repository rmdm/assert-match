import fallbackAssert from 'core-assert'
import buildAssertion from '../util/build_assertion'
import { loose } from '../matchers'

export default function (baseAssert) {

    function comparator (actual, expected) {
        try {
            if (baseAssert.notDeepStrictEqual) {
                baseAssert.notDeepStrictEqual(actual, expected)
            } else {
                fallbackAssert.notDeepStrictEqual(actual, expected)
            }
            return true
        } catch (e) {
            return false
        }
    }

    return buildAssertion(baseAssert, 'notStrictMatch', loose, comparator)
}
