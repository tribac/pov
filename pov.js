exports = module.exports = (function pov(source, mapping) {
  mapping = mapping || {};
  source = source || {};

  var result = {
    clone: function clone() {
      return pov(source, mapping);
    },
    copy: function copy(from) {
      from = from || {};
      var keys = Object.keys(mapping);
      Object.keys(from).forEach(key => {
        keys.includes(key) && (this[key] = from[key]);
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
    Object.defineProperty(result, name, {
      get: function () {
        return select.get ? select.get(source) : source[select]
      },
      set: function (value) {
        if (select.set) select.set(source, value);
        else source[select] = value;
      }
    });
  };

  Object.keys(mapping).forEach(function (key) {
    addGetterSetter(key, mapping[key] || key);
  });
  
  return result;
})