import buildAssertion from '../util/build_assertion'
import { strict } from '../matchers'

export default function (baseAssert) {
    return buildAssertion(baseAssert, 'deepStrictEqual', strict, 'deepStrictEqual')
}
