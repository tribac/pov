import pov from '../src/pov';
import assert from 'assert';

describe('basic contract', function() {
  const o = {
    foo: 'bar',
    bar: 'foo'
  };
  const oo = pov(o, {
    oof: 'foo',
    rab: null
  });
  it('can map source', function() {
    assert.equal(oo.oof, o.foo);
  });
  it('can read/write', function() {
    oo.oof = 'baz';
    assert.equal(oo.oof, 'baz');
  });
  it('can change source', function() {
    oo.oof = 'baz';
    assert.equal(o.foo, oo.oof);
  });
  it('can add non-mapped properties (even same name as source)', function() {
    oo.bar = 'oof';
    assert.equal(oo.bar, 'oof');
    assert.equal(oo.source.bar, 'foo');
    assert.equal(o.bar, 'foo');
  });
  it('can not delete mapped properties', function() {
    assert(oo.oof);
    try {
      delete oo.oof;
      assert.fail();
    } catch (err) {
      assert(oo.oof);
    }
  });
  it('can delete a non-mapped properties', function() {
    oo.rab = 'rab';
    delete oo.rab;
    assert(!oo.rab);
  });
});
