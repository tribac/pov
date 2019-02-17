var pov = require('../pov');
var assert = require('assert');

describe('can be injected with another point-of-view', () => {
  var o = {
    foo: 'bar'
  };
  var oo = pov(o, {
    oof: 'foo',
    ooof: {
      'get': function (o) {
        return o.foo
      }
    }
  });
  it('no other point-of-view does nothing', () => {
    oo.inject();
    assert.equal(oo.oof, 'bar');
  });
  it('null other point-of-view does nothing', () => {
    oo.inject(null);
    assert.equal(oo.oof, 'bar');
  });
  it('empty other point-of-view does nothing', () => {
    oo.inject({});
    assert.equal(oo.oof, 'bar');
  });
  it('non-matching properties in other point-of-view does nothing', () => {
    oo.inject({
      bar: 'foo'
    });
    assert.equal(oo.oof, 'bar');
  });
  it('matching values get changed', () => {
    var expected = 'baz';
    oo.inject({
      oof: expected
    });
    assert.equal(oo.oof, expected);
  })
});