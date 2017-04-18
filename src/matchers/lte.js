'use strict'

import StrictMatcher from './strict'

export default class LteMatcher extends StrictMatcher {

    match (actual) {

        const match = actual <= this.expected

        const expected = match ? actual : { '[less than or equal to]': this.expected }

        return {
            match: match,
            actual: actual,
            expected: expected,
        }
    }

}
