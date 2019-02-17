var pov = require('../pov');
var assert = require('assert');

describe('can expose its source (the original underlying state)', () => {
    var vop = pov({
        foo: 'bar'
    });
    it('as r/o', () => {
        assert.deepEqual(vop.source, {
            foo: 'bar'
        });
        try {
            vop.source = 'toto';
            assert.fail('cannot change r/o prop');
        } catch (err) {}
    });
    it('as a shallow other and not reference', () => {
        var _of = vop.source;
        _of.bar = 'baz';
        assert.equal(vop.source.foo, 'bar');
    });
});