'use strict'

const _merge = require('lodash.merge')

export default class StrictMatcher  {

    constructor (expected) {
        this.expected = expected
    }

    match (actual, comparator) {
        return this.check(actual, comparator)
    }

    check (actual, comparator) {

        let matcherlessActual = this._getActual(actual, this.expected)
        let matcherlessExpected = this._getExpected(actual, this.expected)

        let isMatch = true

        if (matcherlessActual !== undefined && matcherlessExpected !== undefined) {
            isMatch = comparator(matcherlessActual, matcherlessExpected)
        }

        const appliedMatchers = this._applyMatchers(actual, this.expected, comparator)

        isMatch = isMatch && appliedMatchers.match

        matcherlessActual = merge(matcherlessActual, appliedMatchers.actual)
        matcherlessExpected = merge(matcherlessExpected, appliedMatchers.expected)

        return {
            match: isMatch,
            actual: matcherlessActual,
            expected: matcherlessExpected,
        }
    }

    _getActual (actual, expected) {
        return pickMatcherless(actual, expected)
    }

    _getExpected (actual, expected) {
        return omitMatchers(expected)
    }

    _applyMatchers (actual, expected, comparator) {
        return applyMatchers(actual, expected, comparator)
    }

}

function pickMatcherless (actual, expected) {

    if (isMatcher(expected)) {
        return undefined
    }

    if (!isObject(actual)) {
        return actual
    }

    const result = Array.isArray(actual) ? [] : {}

    for (let key in actual) {

        if (hasOwn(actual, key)) {

            const expectedValue = hasOwn(expected, key)
                ? expected[key]
                : undefined

            // undefined in place of a matcher is ok only for top level
            if (!isMatcher(expectedValue)) {
                result[key] = pickMatcherless(actual[key], expectedValue)
            }
        }
    }

    return result
}

function omitMatchers (expected) {

    if (isMatcher(expected)) {
        return undefined
    }

    if (!isObject(expected)) {
        return expected
    }

    let result = Array.isArray(expected) ? [] : {}

    for (let key in expected) {

        // undefined in place of a matcher is ok only for top level
        if (hasOwn(expected, key) && !isMatcher(expected[key])) {
            result[key] = omitMatchers(expected[key])
        }
    }

    return result
}

function applyMatchers (actual, expected, comparator) {

    if (isMatcher(expected)) {
        return expected.match(actual, comparator)
    }

    if (!isObject(expected)) {
        return {
            match: true,
            actual: undefined,
            expected: undefined,
        }
    }

    const result = {
        match: true,
        actual: undefined,
        expected: undefined,
    }

    for (let key in expected) {

        if (hasOwn(expected, key)) {

            let actualValue = hasOwn(actual, key) ? actual[key] : undefined

            const v = applyMatchers(actualValue, expected[key], comparator)

            result.match = result.match && v.match

            if (v.actual !== undefined) {
                result.actual = Array.isArray(actual) ? [] : {}
                result.actual[key] = v.actual
            }

            if (v.expected !== undefined) {
                result.expected = Array.isArray(actual) ? [] : {}
                result.expected[key] = v.expected
            }
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

function merge (a, b) {

    // it is supposed that if both parts are not == to undef than they should be
    // objects

    if (a === undefined) {
        return b
    }

    if (b === undefined) {
        return a
    }

    return _merge({}, a, b)
}
