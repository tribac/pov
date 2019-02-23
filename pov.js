'use strict';

function getter(o, field) {
  return o[field];
}

function setter(o, field, v) {
  o[field] = v;
}

exports = module.exports = function pov(source, mapping, options) {
  mapping = mapping || {};
  source = source || {};
  options = options || {};
  var _get = options.get || getter;
  var _set = options.set || setter;

  function array(field, mapper = unmapped => unmapped) {
    return {
      get: o => (_get(o, field) || []).map(unmapped => mapper(unmapped)),
      set: (o, v) => {
        _set(
          o,
          field,
          v.map(mapped => {
            const unmapped = {};
            const newMapped = mapper(unmapped);
            newMapped.inject(mapped);
            return unmapped;
          })
        );
      }
    };
  }

  function clone() {
    return pov(source, mapping);
  }

  function inject(from) {
    from = from || {};
    Object.keys(from).forEach(key => {
      key in mapping && _set(this, key, _get(from, key));
    });
    return result;
  }

  function eject() {
    return Object.keys(mapping).reduce((ejectable, key) => {
      _set(ejectable, key, _get(this, key));
      return ejectable;
    }, {});
  }

  var result = {
    array,
    clone,
    inject,
    eject,
    get source() {
      return Object.assign({}, source);
    }
  };

  function addGetterSetter(name, select) {
    if (select) {
      Object.defineProperty(result, name, {
        configurable: false,
        enumerable: true,
        get: function() {
          return select.get ? select.get(source) : _get(source, select);
        },
        set: function(value) {
          if (select.set) select.set(source, value);
          else _set(source, select, value);
        }
      });
    } else {
      Object.defineProperty(result, name, {
        configurable: true,
        enumerable: true,
        writable: true
      });
    }
  }

  Object.keys(mapping).forEach(function(key) {
    addGetterSetter(key, mapping[key]);
  });

  return result;
};
