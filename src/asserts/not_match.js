import assert from 'assert'
import buildAssertion from '../util/build_assertion'

export default buildAssertion('notMatch', function (actual, expected) {
    try {
        assert.notDeepEqual(actual, expected)
        return true
    } catch (e) {
        return false
    }
})
