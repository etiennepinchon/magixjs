var WebDB, WebDBStore, WebDBStoreRequest, WebDBTransaction,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Event.UpdateNeeded = 'updateneeded';

Event.Complete = 'complete';

Event.Blocked = 'blocked';

Event.VersionChange = 'versionchange';

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {
  READ_WRITE: "readwrite"
};

WebDBStoreRequest = (function(_super) {
  __extends(WebDBStoreRequest, _super);

  WebDBStoreRequest.prototype._kind = 'WebDBStoreRequest';

  WebDBStoreRequest.prototype._store = NULL;

  function WebDBStoreRequest(storeRequest) {
    var that;
    WebDBStoreRequest.__super__.constructor.apply(this, arguments);
    that = this;
    if (storeRequest !== NULL) {
      this._storeRequest = storeRequest;
    }
    this._storeRequest.onsuccess = function(e) {
      that.emit(Event.VersionChange, e);
    };
    this._storeRequest.onerror = function(e) {
      that.emit(Event.VersionChange, e);
    };
  }

  WebDBStoreRequest.prototype.onSuccess = function(cb) {
    this.on(Event.Success, cb);
  };

  WebDBStoreRequest.prototype.onError = function(cb) {
    this.on(Event.Error, cb);
  };

  return WebDBStoreRequest;

})(Element);

WebDBStore = (function(_super) {
  __extends(WebDBStore, _super);

  WebDBStore.prototype._kind = 'WebDBStore';

  WebDBStore.prototype._store = NULL;

  function WebDBStore(store) {
    var that;
    WebDBStore.__super__.constructor.apply(this, arguments);
    that = this;
    if (store !== NULL) {
      this._store = store;
    }
    this._store.onsuccess = function(e) {
      that.emit(Event.Success, e);
    };
    this._store.oncomplete = function(e) {
      that.emit(Event.Complete, e);
    };
    this._store.onerror = function(e) {
      that.emit(Event.Error, e);
    };
    this._store.onabort = function(e) {
      that.emit(Event.Abort, e);
    };
    this._store.onupdateneeded = function(e) {
      that.emit(Event.UpdateNeeded, e);
    };
    this._store.onblocked = function(e) {
      that.emit(Event.Blocked, e);
    };
    this._store.onversionchange = function(e) {
      that.emit(Event.VersionChange, e);
    };
    this._store.onclose = function(e) {
      that.emit(Event.Close, e);
    };
  }

  WebDBStore.define('name', {
    get: function() {
      return this._store.name;
    }
  });

  WebDBStore.define('autoIncrement', {
    get: function() {
      return this._store.autoIncrement;
    }
  });

  WebDBStore.prototype.createIndex = function(options) {
    var objectIndexName, objectKeypath, optionalObjectParameters, storeName;
    if (!Utils.isObject(options)) {
      return;
    }
    if (options.store) {
      storeName = options.store;
    }
    if (options.name) {
      objectIndexName = options.name;
    }
    if (options.key) {
      objectKeypath = options.key;
    }
    optionalObjectParameters = {};
    if (options.unique !== NULL) {
      optionalObjectParameters.unique = options.unique;
    }
    this._store.createIndex(objectIndexName, objectKeypath, optionalObjectParameters);
  };

  WebDBStore.prototype.deleteIndex = function(indexName) {
    this._store.deleteIndex(indexName);
  };

  WebDBStore.prototype.add = function(itemObject, optionalKey) {
    var storeRequest;
    storeRequest = this._store.add(itemObject, optionalKey);
    return new WebDBStoreRequest(storeRequest);
  };

  WebDBStore.prototype.clear = function() {
    var storeRequest;
    storeRequest = this._store.clear();
    return new WebDBStoreRequest(storeRequest);
  };

  WebDBStore.prototype["delete"] = function(itemKey) {
    var storeRequest;
    storeRequest = this._store["delete"](itemKey);
    return new WebDBStoreRequest(storeRequest);
  };

  WebDBStore.prototype.get = function(itemKey) {
    var storeRequest;
    storeRequest = this._store.get(itemKey);
    return new WebDBStoreRequest(storeRequest);
  };

  WebDBStore.prototype.getAll = function(query, count) {
    var storeRequest;
    storeRequest = this._store.getAll(query, count);
    return new WebDBStoreRequest(storeRequest);
  };

  WebDBStore.prototype.index = function(indexName) {
    return _store.index(indexName);
  };

  WebDBStore.prototype.update = function(itemObject, optionalKey) {
    var storeRequest;
    storeRequest = this._store.put(itemObject, optionalKey);
    return new WebDBStoreRequest(storeRequest);
  };

  WebDBStore.prototype.openCursor = function(optionalKeyRange, optionalDirection) {
    var storeRequest;
    storeRequest = this._store.openCursor(optionalKeyRange, optionalDirection);
    return new WebDBStoreRequest(storeRequest);
  };

  WebDBStore.prototype.openKeyCursor = function(optionalKeyRange, optionalDirection) {
    var storeRequest;
    storeRequest = this._store.openKeyCursor(optionalKeyRange, optionalDirection);
    return new WebDBStoreRequest(storeRequest);
  };

  WebDBStore.prototype.count = function(optionalKeyRange) {
    var storeRequest;
    storeRequest = this._store.count(optionalKeyRange);
    return new WebDBStoreRequest(storeRequest);
  };

  WebDBStore.prototype.onSuccess = function(cb) {
    this.on(Event.Success, cb);
  };

  WebDBStore.prototype.onError = function(cb) {
    this.on(Event.Error, cb);
  };

  WebDBStore.prototype.onUpdateNeeded = function(cb) {
    this.on(Event.UpdateNeeded, cb);
  };

  WebDBStore.prototype.onComplete = function(cb) {
    this.on(Event.Complete, cb);
  };

  WebDBStore.prototype.onAbort = function(cb) {
    this.on(Event.Abort, cb);
  };

  WebDBStore.prototype.onBlocked = function(cb) {
    this.on(Event.Blocked, cb);
  };

  WebDBStore.prototype.onVersionChange = function(cb) {
    this.on(Event.VersionChange, cb);
  };

  WebDBStore.prototype.onClose = function(cb) {
    this.on(Event.Close, cb);
  };

  return WebDBStore;

})(Element);

WebDBTransaction = (function(_super) {
  __extends(WebDBTransaction, _super);

  WebDBTransaction.prototype._kind = 'WebDBTransaction';

  WebDBTransaction.prototype._transaction = NULL;

  function WebDBTransaction(transaction) {
    var that;
    WebDBTransaction.__super__.constructor.apply(this, arguments);
    if (transation !== NULL) {
      this._transaction = transaction;
    }
    that = this;
    this._transaction.oncomplete = function(e) {
      that.emit(Event.Complete, e);
    };
    this._transaction.onerror = function(e) {
      that.emit(Event.Error, e);
    };
    this._transaction.onabort = function(e) {
      that.emit(Event.Abort, e);
    };
  }

  WebDBTransaction.prototype.getStore = function(name) {
    var objectStore;
    objectStore = this._transaction.objectStore(name);
    return new WebDBStore(objectStore);
  };

  WebDBTransaction.prototype.abort = function() {
    this._transaction.abort();
  };

  WebDBTransaction.prototype.onError = function(cb) {
    this.on(Event.Error, cb);
  };

  WebDBTransaction.prototype.onComplete = function(cb) {
    this.on(Event.Complete, cb);
  };

  WebDBTransaction.prototype.onAbort = function(cb) {
    this.on(Event.Abort, cb);
  };

  return WebDBTransaction;

})(Element);

WebDB = (function(_super) {
  __extends(WebDB, _super);

  WebDB.prototype._kind = 'WebDB';

  WebDB.prototype.name = NULL;

  WebDB.prototype.version = 1;

  WebDB.prototype.db = NULL;

  function WebDB() {
    var that;
    WebDB.__super__.constructor.apply(this, arguments);
    if (!window.indexedDB) {
      if (properties.unsupported) {
        properties.unsupported();
      }
      this.emit(Event.Unsupported);
      return false;
    }
    if (Utils.isString(arguments[0])) {
      this.name = arguments[0];
    } else if (Utils.isObject(arguments[0])) {
      if (arguments[0].name) {
        this.name = arguments[0].name;
      }
      if (arguments[0].version) {
        this.version = arguments[0].version;
      }
    }
    if (Utils.isNumber(arguments[1])) {
      this.version = arguments[1];
    } else if (Utils.isObject(arguments[1])) {
      if (arguments[1].version) {
        this.version = arguments[1].version;
      }
    }
    if (!this.name) {
      return;
    }
    that = this;
    this.request = window.indexedDB.open(this.name, this.version);
    this.request.onsuccess = function(e) {
      that.db = e.target.result;
      that.emit(Event.Success, e);
    };
    this.request.onerror = function(e) {
      that.db = e.target.result;
      that.emit(Event.Error, e);
    };
    this.request.onabort = function(e) {
      that.db = e.target.result;
      that.emit(Event.Abort, e);
    };
    this.request.onversionchange = function(e) {
      that.db = e.target.result;
      that.emit(Event.VersionChange, e);
    };
    this.request.oncomplete = function(e) {
      that.db = e.target.result;
      that.emit(Event.Complete, e);
    };
    this.request.onupgradeneeded = function(e) {
      that.db = e.target.result;
      that.emit(Event.UpgradeNeeded, e);
    };
    this.request.onblocked = function(e) {
      that.db = e.target.result;
      that.emit(Event.Blocked, e);
    };
    this.request.onclose = function(e) {
      that.db = e.target.result;
      that.emit(Event.Close, e);
    };
  }

  WebDB.prototype.transaction = function(storeName, readonly) {
    if (readonly == null) {
      readonly = false;
    }
    if (!readonly) {
      readonly = 'readwrite';
    } else {
      readonly = 'readonly';
    }
    this.db.transaction(storeName, readonly);
    return new WebDBTransaction(objectStore);
  };

  WebDB.prototype.close = function() {
    return this.db.close();
  };

  WebDB.prototype.createStore = function(name, key) {
    var objectStore;
    objectStore = this.db.createObjectStore(name, key);
    return new WebDBStore(objectStore);
  };

  WebDB.prototype.removeStore = function(name) {
    return this.db.deleteObjectStore(name);
  };

  WebDB.prototype.onUnsupported = function(cb) {
    this.on(Event.Unsupported, cb);
  };

  WebDB.prototype.onSuccess = function(cb) {
    this.on(Event.Success, cb);
  };

  WebDB.prototype.onError = function(cb) {
    this.on(Event.Error, cb);
  };

  WebDB.prototype.onAbort = function(cb) {
    this.on(Event.Abort, cb);
  };

  WebDB.prototype.onVersionChange = function(cb) {
    this.on(Event.VersionChange, cb);
  };

  WebDB.prototype.onComplete = function(cb) {
    this.on(Event.Complete, cb);
  };

  WebDB.prototype.onUpgradeNeeded = function(cb) {
    this.on(Event.UpgradeNeeded, cb);
  };

  WebDB.prototype.onBlocked = function(cb) {
    this.on(Event.Blocked, cb);
  };

  WebDB.prototype.onClose = function(cb) {
    this.on(Event.Close, cb);
  };

  return WebDB;

})(Element);


/*
 * Example
 * Instanciate DB
db = new WebDB
	name: 'demoDB'
	version: 1

db.onVersionChange ->
	console.log db.db

	 * Create new Store
	usersStore = db.createStore
		name: 'users'
		keyPath: "email"

	usersStore.onSuccess ->
		 * Create index
		usersStore.createIndex
			store: 'users'
			name: 'name'
			keyPath: 'name'
			unique: yes

		usersStore.createIndex
			store: 'users'
			name: 'age'
			keyPath: 'age'
			unique: no

		 * Add data
		req = usersStore.add
			email: 'etienne@magixjs.com'
			age: 21
		req.onSuccess ->
			log 'nice'
 */
