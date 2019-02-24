var pov = require('../pov');
var assert = require('assert');

describe('can be cloned using Object.assign', function() {
  var d = Object.getOwnPropertyDescriptor;
  var o = {
    foo: 'bar'
  };
  var oo = pov(o, {
    oof: 'foo',
    ooof: {
      get: function(o) {
        return o.foo;
      }
    }
  });
  var o3 = Object.assign({}, oo);
  it('base assumption on descriptors', function() {
    assert(d(oo, 'oof')['get']);
  });
  it('exposing same "values"', function() {
    assert.equal(o3.oof, oo.source.foo);
    assert.equal(o3.ooof, oo.source.foo);
  });
  it('exposing values as get/set props samewise', function() {
    assert(d(o3, 'oof'));
    assert(!d(o3, 'oof')['get']);
    assert(!d(o3, 'oof')['set']);
    assert(d(o3, 'ooof'));
    assert(!d(o3, 'ooof')['get']);
  });
});
