var pov = require('../pov');
var assert = require('assert');

describe('can expose its source (the original underlying state)', () => {
    var o = {
        foo: 'bar'
    };
    var oo = pov(o);
    it('as r/o', () => {
        assert.deepEqual(oo.source, o);
        try {
            oo.source = 'toto';
            assert.fail('cannot change r/o prop');
        } catch (err) {
            assert.deepEqual(oo.source, o);
        }
    });
    it('as a shallow other and not reference', () => {
        oo.source.bar = 'baz';
        assert.equal(oo.source.foo, o.foo);
    });
});