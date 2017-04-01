'use strict'

const merge = require('lodash.merge')

const NOTHING = Symbol('nothing')

export default class Matcher  {

    constructor (expected) {
        this.expected = expected
        this.matcherlessExpected = omitMatchers(this.expected)
    }

    match (actual, comparator) {
        return this.check(actual, comparator)
    }

    check (actual, comparator) {

        let actualExpectedMatch = true
        let matchingActual = actual

        // reset actualExpectedMatch if there is something to check
        if (this.matcherlessExpected !== NOTHING) {

            matchingActual = pickMatching(actual,
                    this.matcherlessExpected)

            actualExpectedMatch = comparator(matchingActual,
                    this.matcherlessExpected)

            matchingActual = pickMatching(actual,
                    this.expected)
        }

        let matchers = matchMatchers(actual, this.expected)

        let overallExpected = this.matcherlessExpected

        if (matchers.expected !== NOTHING) {
            overallExpected = merge({}, matchers.expected,
                    this.matcherlessExpected)
        }

        const overallMatch = actualExpectedMatch && matchers.match

        const result = { match: overallMatch, actual: matchingActual }

        // expected returned either way because there may be not matching parts
        // somewhere up in the hierarchy so we do not want to test runner to
        // blame this part
        result.expected = overallMatch ? actual : overallExpected

        // inherited flag makes sense only in case of mismatch
        if (!actualExpectedMatch || !matchers.match) {
            result.inherited = actualExpectedMatch && !matchers.match
        }

        return result
    }

    description () {
        return null
    }

}

function pickMatching (actual, expected) {

    if (isMatcher(expected)) {
        return actual
    }

    if (!actual || typeof actual !== 'object' ||
        !expected || typeof expected !== 'object') {

        return actual
    }

    let result = {}

    if (Array.isArray(actual)) {
        result = []
    }

    for (let key in expected) {

        if (has(expected, key) && has(actual, key)) {
            result[key] = pickMatching(actual[key], expected[key])
        }
    }

    return result
}

function matchMatchers (actual, expected) {

    if (isMatcher(expected)) {

        let matchResult = applyMatch(expected, actual)

        return {
            expected: matchResult.expected,
            match: matchResult.match,
        }
    }

    if (!expected || typeof expected !== 'object') {
        return {
            expected: NOTHING,
            match: true,
        }
    }

    let matched = {},
        match = true,
        somethingMatched = false

    if (Array.isArray(actual)) {
        matched = []
    }

    for (let key in expected) {

        if (has(expected, key)) {

            let actualValue = typeof actual === 'undefined'
                ? actualValue = undefined
                : actual[key]

            const v = matchMatchers(actualValue, expected[key])

            if (v.expected !== NOTHING) {
                matched[key] = v.expected
                match = match && v.match
                somethingMatched = true
            }
        }
    }

    return {
        expected: somethingMatched ? matched : NOTHING,
        match: match,
    }
}

function applyMatch (matcher, arg) {

    const result = matcher.match(arg)
    const description = matcher.description()

    let matched

    if (result.match) {
        matched = arg
    } else if (result.inherited || !description) {
        matched = result.expected
    } else {
        matched = description
    }

    return {
        expected: matched,
        match: result.match,
    }
}

function omitMatchers (expected) {

    if (isMatcher(expected)) {
        return NOTHING
    }

    if (!expected || typeof expected !== 'object') {
        return expected
    }

    let result = {}

    if (Array.isArray(expected)) {
        result = []
    }

    for (let key in expected) {
        if (has(expected, key) && !isMatcher(expected[key])) {
            result[key] = omitMatchers(expected[key])
        }
    }

    return result
}

function has (obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key)
}

function isMatcher (obj) {
    return obj instanceof Matcher
}
