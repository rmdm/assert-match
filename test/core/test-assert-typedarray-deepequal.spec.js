// https://github.com/nodejs/node/blob/f47ce9d9f8dc9b443afcd72951bb0bc96737b7f7/test/parallel/test-assert-typedarray-deepequal.js

'use strict';

var assert = require('../../src');
var a = require('../../src');

describe('core assert typedarray deepequal tests', function () {

    it('should pass', function () {

        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.

        function makeBlock(f) {
            var args = Array.prototype.slice.call(arguments, 1);
            return function() {
                return f.apply(this, args);
            };
        }

        const equalArrayPairs = [
            [new Uint8Array(1e2), new Uint8Array(1e2)],
            [new Uint16Array(1e2), new Uint16Array(1e2)],
            [new Uint32Array(1e2), new Uint32Array(1e2)],
            [new Uint8ClampedArray(1e2), new Uint8ClampedArray(1e2)],
            [new Int8Array(1e2), new Int8Array(1e2)],
            [new Int16Array(1e2), new Int16Array(1e2)],
            [new Int32Array(1e2), new Int32Array(1e2)],
            [new Float32Array(1e2), new Float32Array(1e2)],
            [new Float64Array(1e2), new Float64Array(1e2)],
            [new Int16Array(256), new Uint16Array(256)],
            [new Int16Array([256]), new Uint16Array([256])],
        ];

        const notEqualArrayPairs = [
            [new Uint8Array(2), new Uint8Array(3)],
            [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])],
            [new Uint8ClampedArray([300, 2, 3]), new Uint8Array([300, 2, 3])],
            [new Uint16Array([2]), new Uint16Array([3])],
            [new Uint16Array([0]), new Uint16Array([256])],
            [new Int16Array([0]), new Uint16Array([256])]
        ];

        // does not work for node 0.10.x
        if (process.version >= 'v0.12') {

            equalArrayPairs.push(
                [new Float32Array([+0.0]), new Float32Array([-0.0])],
                [new Float64Array([+0.0]), new Float32Array([-0.0])],
                [new Float64Array([+0.0]), new Float64Array([-0.0])],
                [new Uint8Array([1, 2, 3, 4]).subarray(1), new Uint8Array([2, 3, 4])],
                [new Uint16Array([1, 2, 3, 4]).subarray(1), new Uint16Array([2, 3, 4])],
                [new Uint32Array([1, 2, 3, 4]).subarray(1, 3), new Uint32Array([2, 3])]
            )

            notEqualArrayPairs.push(
                [new Int16Array([-256]), new Uint16Array([0xff00])], // same bits
                [new Int32Array([-256]), new Uint32Array([0xffffff00])], // ditto
                [new Float32Array([0.1]), new Float32Array([0.0])],
                [new Float64Array([0.1]), new Float64Array([0.0])]
            )
        }

        equalArrayPairs.forEach((arrayPair) => {
            // eslint-disable-next-line no-restricted-properties
            assert.deepEqual(arrayPair[0], arrayPair[1]);
        });

        notEqualArrayPairs.forEach((arrayPair) => {
            assert.throws(
                makeBlock(a.deepEqual, arrayPair[0], arrayPair[1]),
                a.AssertionError
            );
        });

    })

})
