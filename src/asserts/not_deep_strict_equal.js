import buildAssertion from '../util/build_assertion'
import { strict, not } from '../matchers'

export default function (baseAssert) {
    return buildAssertion(baseAssert, 'deepStrictEqual',
            (expected) => not(strict(expected)), 'notDeepStrictEqual')
}
