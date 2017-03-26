import assert from 'assert'
import fallbackAssert from 'core-assert'
import buildAssertion from '../util/build_assertion'

const notDeepStrictEqual = assert.notDeepStrictEqual || fallbackAssert.notDeepStrictEqual

export default buildAssertion('notStrictMatch', notDeepStrictEqual)
