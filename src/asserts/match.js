import assert from 'assert'
import buildAssertion from '../util/build_assertion'

export default buildAssertion('match', function (actual, expected) {
    try {
        assert.deepEqual(actual, expected)
        return true
    } catch (e) {
        return false
    }
})
