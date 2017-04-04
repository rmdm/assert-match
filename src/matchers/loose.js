'use strict'

import StrictMatcher from './strict'

export default class LooseMatcher extends StrictMatcher {

    constructor (expected) {
        super()
        this.expected = expected
    }

    match (actual, comparator) {
        return this.check(actual, comparator)
    }

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

    let result = Array.isArray(actual) ? [] : {}

    for (let key in expected) {

        if (hasOwn(actual, key) && hasOwn(expected, key) && !isMatcher(expected[key])) {
            result[key] = pickMatching(actual[key], expected[key])
        }
    }

    return result
}

function hasOwn (obj, key) {
    return isObject(obj) && Object.prototype.hasOwnProperty.call(obj, key)
}

function isMatcher (obj) {
    return obj instanceof StrictMatcher
}

function isObject (obj) {
    return obj && typeof obj === 'object'
}
