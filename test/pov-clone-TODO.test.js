var pov = require('../pov');
var assert = require('assert');

describe.skip('can be cloned using Object.assign', () => {
  var d = Object.getOwnPropertyDescriptor;
  var source = {
    foo: 'bar'
  };
  var vop = pov(source, {
    oof: 'foo',
    ooof: {
      'get': function (o) {
        return o.foo
      }
    }
  });
  var other = Object.assign({}, vop);
  it('base assumption on descriptors', () => {
    assert(!d(vop, 'oof')['get']);
  });
  it('exposing same "values"', () => {
    assert.equal(other.oof, vop.source.foo);
    assert.equal(other.ooof, vop.source.foo);
  });
  it('exposing values as get/set props samewise', () => {
    assert(!d(other, 'oof')['get']);
    assert(!d(other, 'oof')['set']);
    assert(!d(other, 'ooof')['get']);
  })
});