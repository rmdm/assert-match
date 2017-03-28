'use strict'

import assert from 'assert'
import asserts from '../../src/index'
import {
    match as assertsMatch,
    strictMatch as assertsStrictMatch,
    notMatch as assertsNotMatch,
    notStrictMatch as assertsNotStrictMatch
} from '../../src/index'

import match from '../../src/asserts/match'
import strictMatch from '../../src/asserts/strict_match'
import notMatch from '../../src/asserts/not_match'
import notStrictMatch from '../../src/asserts/not_strict_match'

describe('assert\'s matching extensions', function () {

    it('is function', function () {
        assert.equal(typeof asserts, 'function')
    })

    it('has "match" method', function () {
        assert.equal(asserts.match, match)
    })

    it('has "strictMatch" method', function () {
        assert.equal(asserts.strictMatch, strictMatch)
    })

    it('has "notMatch" method', function () {
        assert.equal(asserts.notMatch, notMatch)
    })

    it('has "notStrictMatch" method', function () {
        assert.equal(asserts.notStrictMatch, notStrictMatch)
    })

    it('returns an object with "match" method', function () {
        const obj = asserts()
        assert.equal(obj.match, match)
    })

    it('returns an object with "strictMatch" method', function () {
        const obj = asserts()
        assert.equal(obj.strictMatch, strictMatch)
    })

    it('returns an object with "notMatch" method', function () {
        const obj = asserts()
        assert.equal(obj.notMatch, notMatch)
    })

    it('returns an object with "notStrictMatch" method', function () {
        const obj = asserts()
        assert.equal(obj.notStrictMatch, notStrictMatch)
    })

    it('sets "match" method on a passed object', function () {
        const obj = {}
        asserts(obj)
        assert.equal(obj.match, match)
    })

    it('sets "strictMatch" method on a passed object', function () {
        const obj = {}
        asserts(obj)
        assert.equal(obj.strictMatch, strictMatch)
    })

    it('sets "notMatch" method on a passed object', function () {
        const obj = {}
        asserts(obj)
        assert.equal(obj.notMatch, notMatch)
    })

    it('sets "notStrictMatch" method on a passed object', function () {
        const obj = {}
        asserts(obj)
        assert.equal(obj.notStrictMatch, notStrictMatch)
    })

    it('retruns passed object', function () {
        const obj = {}
        const result = asserts(obj)
        assert.equal(result, obj)
    })

})
