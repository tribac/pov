import pov from '../src/pov';
import assert from 'assert';

describe('can be cloned', function() {
  const d = Object.getOwnPropertyDescriptor;
  const o = {
    foo: 'bar'
  };
  const oo = pov(o, {
    oof: 'foo',
    ooof: {
      get: function(o) {
        return o.foo;
      }
    }
  });
  const o3 = oo.clone();
  it('base assumption on descriptors', function() {
    assert(d(oo, 'oof')['get']);
  });
  it('exposing same "values"', function() {
    assert.equal(o3.oof, oo.source.foo);
    assert.equal(o3.ooof, oo.source.foo);
  });
  it('exposing values as get/set props samewise', function() {
    assert(d(o3, 'oof')['get']);
    assert(d(o3, 'oof')['set']);
    assert(d(o3, 'ooof')['get']);
  });
});
