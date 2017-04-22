'use strict'

import StrictMatcher from './strict'
import {
    hasOwn,
    isMatcher,
    isObject,
    isStandardObject,
    iterateKeys
} from '../util/utils'

export default class LooseMatcher extends StrictMatcher {

    _getActual (actual, expected) {
        return pickMatching(actual, expected)
    }

}

function pickMatching (actual, expected, iterator) {

    if (!iterator) {
        iterator = iterateKeys()
    }

    if (isMatcher(expected)) {
        return undefined
    }

    if (!isObject(actual) || !isObject(expected) || isStandardObject(actual)) {
        return actual
    }

    let result = Array.isArray(actual)
        ? []
        : Object.create(Object.getPrototypeOf(actual))

    iterator(expected, function (key) {

        if (hasOwn(actual, key) && hasOwn(expected, key) && !isMatcher(expected[key])) {
            result[key] = pickMatching(actual[key], expected[key], iterator)
        }
    })

    return result
}
