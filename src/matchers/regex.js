'use strict'

import StrictMatcher from './strict'

export default class RegexMatcher extends StrictMatcher {

    constructor (expected) {
        super(new RegExp(expected))
    }

    match (actual) {

        const match = this.expected.test(actual)

        const expected = match ? actual : String(this.expected)

        return {
            match: match,
            actual: actual,
            expected: expected,
        }
    }

}
