'use strict'

import StrictMatcher from './strict'

export default class LtMatcher extends StrictMatcher {

    constructor (expected) {
        super(expected)
    }

    match (actual) {

        const match = actual < this.expected

        const expected = match ? actual : { '[less than]': this.expected }

        return {
            match: match,
            actual: actual,
            expected: expected,
        }
    }

}
