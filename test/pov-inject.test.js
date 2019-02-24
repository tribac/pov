var pov = require('../pov');
var assert = require('assert');

describe('can be injected with another point-of-view', function() {
  var o = {
    foo: 'bar'
  };
  var oo = pov(o, {
    oof: 'foo',
    ooof: {
      get: function(o) {
        return o.foo;
      }
    },
    of: null
  });
  it('no other point-of-view does nothing', function() {
    oo.inject();
    assert.equal(oo.oof, 'bar');
  });
  it('null other point-of-view does nothing', function() {
    oo.inject(null);
    assert.equal(oo.oof, 'bar');
  });
  it('empty other point-of-view does nothing', function() {
    oo.inject({});
    assert.equal(oo.oof, 'bar');
  });
  it('non-matching properties in other point-of-view does nothing', function() {
    oo.inject({
      bar: 'foo'
    });
    assert.equal(oo.oof, 'bar');
  });
  it('matching values get changed', function() {
    var expected = 'baz';
    oo.inject({
      oof: expected
    });
    assert.equal(oo.oof, expected);
  });
  it('matching values with falsy mapping get changed', function() {
    var expected = 'baz';
    oo.inject({
      of: expected
    });
    assert.equal(oo.of, expected);
  });
});
