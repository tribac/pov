exports = module.exports = (function pov(source, mapping) {
  mapping = mapping || {};
  source = source || {};

  var result = {
    clone: function clone() {
      return pov(source, mapping);
    },
    inject: function inject(from) {
      from = from || {};
      Object.keys(from).forEach(key => {
        key in mapping && (this[key] = from[key]);
      });
    },
    get source() {
      return Object.assign({}, source);
    },
    eject: function eject() {
      return Object.keys(mapping).reduce((ejectable, key) => {
        ejectable[key] = this[key];
        return ejectable;
      }, {});
    }
  };

  function addGetterSetter(name, select) {
    if (select) {
      Object.defineProperty(result, name, {
        configurable: true,
        enumerable: true,
        get: function () {
          return select.get ? select.get(source) : source[select]
        },
        set: function (value) {
          if (select.set) select.set(source, value);
          else source[select] = value;
        }
      });
    } else {
      Object.defineProperty(result, name, {
        configurable: true,
        enumerable: true,
        writable: true
      })
    }
  };

  Object.keys(mapping).forEach(function (key) {
    addGetterSetter(key, mapping[key]);
  });

  return result;
})