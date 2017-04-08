'use strict'

import StrictMatcher from './strict'
import { isObject } from '../util/utils'

export default class TypeMatcher extends StrictMatcher {

    constructor (expected) {
        super(expected)
    }

    match (actual) {

        let match

        if (typeof this.expected === 'string') {

            match = typeof actual === this.expected

        } else if (typeof this.expected === 'function') {

            match = actual instanceof this.expected
        }

        const expected = match ? actual : { typeof: this.expected }

        return {
            match: match,
            actual: actual,
            expected: expected,
        }
    }

}
