import assert from 'assert'
import buildAssertion from '../util/build_assertion'

export default buildAssertion('notMatch', assert.notDeepEqual)
