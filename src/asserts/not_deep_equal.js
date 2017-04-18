import buildAssertion from '../util/build_assertion'
import { not } from '../matchers'

export default function (baseAssert) {
    return buildAssertion(baseAssert, 'deepEqual', not, 'notDeepEqual')
}
