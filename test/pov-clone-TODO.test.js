var pov = require('../pov');
var assert = require('assert');

describe.skip('can be cloned using Object.assign', () => {
  var d = Object.getOwnPropertyDescriptor;
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
  var ooo = Object.assign({}, oo);
  it('base assumption on descriptors', () => {
    assert(!d(oo, 'oof')['get']);
  });
  it('exposing same "values"', () => {
    assert.equal(ooo.oof, oo.source.foo);
    assert.equal(ooo.ooof, oo.source.foo);
  });
  it('exposing values as get/set props samewise', () => {
    assert(!d(ooo, 'oof')['get']);
    assert(!d(ooo, 'oof')['set']);
    assert(!d(ooo, 'ooof')['get']);
  })
});