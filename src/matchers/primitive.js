'use strict'

import toPrimitive from 'es-to-primitive'
import StrictMatcher from './strict'

export default class PrimitiveMatcher extends StrictMatcher {

    constructor (expected) {
        super(expected)
    }

    match (actual, comparator) {

        let primitiveActual, primitiveExpected

        try {

            primitiveActual = toPrimitive(actual)
            primitiveExpected = toPrimitive(this.expected)

        } catch (e) {

            return {
                match: false,
                actual: actual,
                expected: {'[primitively equal to]': this.expected},
            }
        }

        const innerMatcher = new StrictMatcher(primitiveExpected)

        const result = innerMatcher.match(primitiveActual, comparator)

        const expected = result.match ? actual : this.expected

        return {
            match: result.match,
            actual: actual,
            expected: expected,
        }
    }

}

function unprimitivable () {
    return '[unprimitivable]'
}