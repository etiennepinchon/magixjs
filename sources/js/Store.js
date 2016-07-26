var SessionStore, Store;

Store = {
  set: function(name, value) {
    var e;
    try {
      localStorage.setItem(name, JSON.stringify(value));
    } catch (_error) {
      e = _error;
      console.warn('Error, Store not available.');
    }
  },
  get: function(name) {
    var e;
    try {
      return JSON.parse(localStorage.getItem(name));
    } catch (_error) {
      e = _error;
      return console.warn('Error, Store not available.');
    }
  },
  remove: function(name) {
    var e;
    try {
      localStorage.removeItem(name);
    } catch (_error) {
      e = _error;
      console.warn('Error, Store not available.');
    }
  }
};

SessionStore = {
  set: function(name, value) {
    var e;
    try {
      sessionStorage.setItem(name, JSON.stringify(value));
    } catch (_error) {
      e = _error;
      console.warn('Error, Store not available.');
    }
  },
  get: function(name) {
    var e;
    try {
      return JSON.parse(sessionStorage.getItem(name));
    } catch (_error) {
      e = _error;
      return console.warn('Error, Store not available.');
    }
  },
  remove: function(name) {
    var e;
    try {
      sessionStorage.removeItem(name);
    } catch (_error) {
      e = _error;
      console.warn('Error, Store not available.');
    }
  }
};
