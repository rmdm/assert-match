'use strict'

import toPrimitive from 'es-to-primitive'
import StrictMatcher from './strict'
import { isMatcher } from '../util/utils'

export default class PrimitiveMatcher extends StrictMatcher {

    match (actual, comparator) {

        let primitiveActual, primitiveExpected = this.expected

        try {

            primitiveActual = toPrimitive(actual)

            if (!isMatcher(primitiveExpected)) {
                primitiveExpected = toPrimitive(this.expected)
            }

        } catch (e) {

            return {
                match: false,
                actual: actual,
                expected: {'[primitively matches]': this.expected},
            }
        }

        const innerMatcher = new StrictMatcher(primitiveExpected)

        const result = innerMatcher.match(primitiveActual, comparator)

        const expected = result.match ? actual : {'[primitively matches]': result.expected}

        return {
            match: result.match,
            actual: actual,
            expected: expected,
        }
    }

}
