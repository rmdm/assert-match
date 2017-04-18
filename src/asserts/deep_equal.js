import buildAssertion from '../util/build_assertion'
import { strict } from '../matchers'

export default function (baseAssert) {
    return buildAssertion(baseAssert, 'deepEqual', strict, 'deepEqual')
}
