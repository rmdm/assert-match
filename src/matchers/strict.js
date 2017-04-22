'use strict'

import {
    hasOwn,
    isMatcher,
    isObject,
    isStandardObject,
    iterateKeys
} from '../util/utils'

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

        if (matcherlessActual !== undefined || matcherlessExpected !== undefined) {
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

function pickMatcherless (actual, expected, iterator) {

    if (!iterator) {
        iterator = iterateKeys()
    }

    if (isMatcher(expected)) {
        return undefined
    }

    if (!isObject(actual) || isStandardObject(actual)) {
        return actual
    }

    const result = Array.isArray(actual)
        ? []
        : Object.create(Object.getPrototypeOf(actual))

    iterator(actual, function (key) {

        if (hasOwn(actual, key)) {

            const expectedValue = hasOwn(expected, key)
                ? expected[key]
                : undefined

            // undefined in place of a matcher is ok only for top level
            if (!isMatcher(expectedValue)) {
                result[key] =
                        pickMatcherless(actual[key], expectedValue, iterator)
            }
        }
    })

    return result
}

function omitMatchers (expected, iterator) {

    if (!iterator) {
        iterator = iterateKeys()
    }

    if (isMatcher(expected)) {
        return undefined
    }

    if (!isObject(expected) || isStandardObject(expected)) {
        return expected
    }

    let result = Array.isArray(expected)
        ? []
        : Object.create(Object.getPrototypeOf(expected))

    iterator(expected, function (key) {

        // undefined in place of a matcher is ok only for top level
        if (hasOwn(expected, key) && !isMatcher(expected[key])) {
            result[key] = omitMatchers(expected[key], iterator)
        }
    })

    return result
}

function applyMatchers (actual, expected, comparator, iterator) {

    if (!iterator) {
        iterator = iterateKeys()
    }

    if (isMatcher(expected)) {
        return expected.match(actual, comparator)
    }

    if (!isObject(expected) || isStandardObject(expected)) {
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

    iterator(expected, function (key) {

        if (hasOwn(expected, key)) {

            let actualValue = hasOwn(actual, key) ? actual[key] : undefined

            const v = applyMatchers(actualValue, expected[key], comparator, iterator)

            result.match = result.match && v.match

            if (v.actual !== undefined) {
                if (result.actual === undefined) {
                    result.actual = Array.isArray(actual)
                        ? []
                        : Object.create(actual && Object.getPrototypeOf(actual))
                }

                result.actual[key] = v.actual
            }

            if (v.expected !== undefined) {
                if (result.expected === undefined) {
                    result.expected = Array.isArray(expected)
                        ? []
                        : Object.create(Object.getPrototypeOf(expected))
                }

                result.expected[key] = v.expected
            }
        }
    })

    return result
}

function merge (a, b) {

    // it is supposed that if both parts are not == to undef than they should be
    // objects

    if (a == undefined) {
        return b
    }

    if (b == undefined) {
        return a
    }

    const base = Array.isArray(a) ? [] : {}

    return _merge(base, a, b)
}
