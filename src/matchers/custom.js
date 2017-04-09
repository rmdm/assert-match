'use strict'

import StrictMatcher from './strict'
import { hasOwn } from '../util/utils'

export default class CustomMatcher extends StrictMatcher {

    constructor (expected) {
        super(expected)
    }

    match (actual, comparator) {

        if (typeof this.expected !== 'function') {
            return new StrictMatcher(this.expected).match(actual, comparator)
        }

        const result = this.expected(actual)

        if (!result) {
            return {
                match: false,
                actual: actual,
                expected: '[custom]',
            }
        }

        if (result === true) {
            return {
                match: true,
                actual: actual,
                expected: actual,
            }
        }

        const match = !!result.match

        const expectedIfNotMatch = hasOwn(result, 'expected')
            ? { '[custom]': result.expected }
            : '[custom]'

        const expected = match ? actual : expectedIfNotMatch

        return {
            match: result.match,
            actual: actual,
            expected: expected,
        }
    }

}
