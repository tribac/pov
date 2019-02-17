var pov = require('../pov');
var assert = require('assert');

var someObject = {
  someAttribute: 'ABC',
  someChildren: [{
    id: '6329d89e-381b-4510-88e4-ef8b4904b53c'
  }]
};

it('can pov someAttribute from someObject', function () {
  var vop = pov({
    ...someObject
  }, {
    'code': 'someAttribute'
  });
  assert.equal(vop.code, someObject.someAttribute);
  vop.code = 'XYZ';
  assert.equal(vop.code, 'XYZ');
});

it('can pov same attribute', function () {
  var foo;
  var vop = pov({
    foo: 'bar'
  }, {
    foo
  });
  assert.equal(vop.foo, 'bar');
  vop.foo = 'baz';
  assert.equal(vop.foo, 'baz');
});

it('can pov someChildren from someObject', function () {
  var vop = pov({
    ...someObject
  }, {
    'client1': {
      'get': function (o) {
        return o.someChildren && o.someChildren.length && o.someChildren[0].id
      },
      'set': function (o, v) {
        o.someChildren && (o.someChildren.length || (o.someChildren = [{}])) && (o.someChildren[0].id = v)
      },
    }
  });
  assert.equal(vop.client1, someObject.someChildren[0].id);
  vop.client1 = '12345';
  assert.equal(vop.client1, '12345');
});

it('can pov someChildren from empty', function () {
  var vop = pov({}, {
    'client1': {
      'get': function (o) {
        return o.someChildren && o.someChildren.length && o.someChildren[0].id
      },
      'set': function (o, v) {
        if (!(o.someChildren && o.someChildren.length)) o.someChildren = [{}];
        o.someChildren[0].id = v;
      },
    }
  });
  assert.equal(vop.client, undefined);
  vop.client1 = '12345';
  assert.equal(vop.client1, '12345');
})
