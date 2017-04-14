'use strict'

import StrictMatcher from './strict'

export default class TypeMatcher extends StrictMatcher {

    match (actual) {

        let match = false

        if (typeof this.expected === 'string') {

            match = typeof actual === this.expected

        } else if (typeof this.expected === 'function') {

            match = actual instanceof this.expected
        }

        const expected = match ? actual : { '[typeof]': this.expected }

        return {
            match: match,
            actual: actual,
            expected: expected,
        }
    }

}
