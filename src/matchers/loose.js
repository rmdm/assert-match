'use strict'

import StrictMatcher from './strict'
import {
    hasOwn,
    isMatcher,
    isObject
} from '../util/utils'

export default class LooseMatcher extends StrictMatcher {

    _getActual (actual, expected) {
        return pickMatching(actual, expected)
    }

}

function pickMatching (actual, expected) {

    if (isMatcher(expected)) {
        return undefined
    }

    if (!isObject(actual) || !isObject(expected)) {
        return actual
    }

    let result = Array.isArray(actual)
        ? []
        : Object.create(Object.getPrototypeOf(actual))

    for (let key in expected) {

        if (hasOwn(actual, key) && hasOwn(expected, key) && !isMatcher(expected[key])) {
            result[key] = pickMatching(actual[key], expected[key])
        }
    }

    return result
}
