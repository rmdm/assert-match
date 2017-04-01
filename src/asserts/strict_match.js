import assert from 'assert'
import fallbackAssert from 'core-assert'
import buildAssertion from '../util/build_assertion'

const deepStrictEqual = assert.deepStrictEqual ||
        fallbackAssert.deepStrictEqual

export default buildAssertion('strictMatch', function (actual, expected) {
    try {
        deepStrictEqual(actual, expected)
        return true
    } catch (e) {
        return false
    }
})
