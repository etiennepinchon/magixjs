
# WebDB

# Help
# db => IDBDatabase

# Register Events
Event.UpdateNeeded 	= 'updateneeded'
Event.Complete 		= 'complete'
Event.Blocked 		= 'blocked'
Event.VersionChange = 'versionchange'

# Compatibility check
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"};


##############################################################


class WebDBStoreRequest extends Element

	_kind 	: 'WebDBStoreRequest'
	_store 	: NULL 

	constructor: (storeRequest)->
		super

		that 			= @
		@_storeRequest 	= storeRequest if storeRequest isnt NULL

		@_storeRequest.onsuccess = (e) ->
			that.emit Event.VersionChange, e
			return
		@_storeRequest.onerror = (e) ->
			that.emit Event.VersionChange, e
			return

	onSuccess : (cb) -> 
		@on Event.Success, cb
		return
	onError : (cb) -> 
		@on Event.Error, cb
		return


##############################################################


class WebDBStore extends Element

	_kind 	: 'WebDBStore'
	_store 	: NULL 

	constructor: (store)->
		super

		that 	= @
		@_store 	= store if store isnt NULL

		@_store.onsuccess = (e) ->
			that.emit Event.Success, e
			return
		@_store.oncomplete = (e) ->
			that.emit Event.Complete, e
			return
		@_store.onerror = (e) ->
			that.emit Event.Error, e
			return
		@_store.onabort = (e) ->
			that.emit Event.Abort, e
			return
		@_store.onupdateneeded = (e) ->
			that.emit Event.UpdateNeeded, e
			return
		@_store.onblocked = (e) ->
			that.emit Event.Blocked, e
			return
		@_store.onversionchange = (e) ->
			that.emit Event.VersionChange, e
			return
		@_store.onclose = (e) ->
			that.emit Event.Close, e
			return

	@define 'name',
		get: -> @_store.name
	@define 'autoIncrement',
		get: -> @_store.autoIncrement


	##############################################################
	# DB > Store > Index

	# Create index
	createIndex : (options) ->
		return if not Utils.isObject(options)
		storeName 							= options.store if options.store
		objectIndexName 					= options.name if options.name
		objectKeypath 						= options.key if options.key
		optionalObjectParameters 			= {}
		optionalObjectParameters.unique 	= options.unique if options.unique isnt NULL
		@_store.createIndex(objectIndexName, objectKeypath, optionalObjectParameters)
		return
	deleteIndex : (indexName) ->
		@_store.deleteIndex(indexName)
		return
	add : (itemObject, optionalKey) ->
		storeRequest = @_store.add(itemObject, optionalKey)
		new WebDBStoreRequest(storeRequest)
	clear : ->
		storeRequest = @_store.clear()
		new WebDBStoreRequest(storeRequest)
	delete : (itemKey)->
		storeRequest = @_store.delete(itemKey)
		new WebDBStoreRequest(storeRequest)
	get : (itemKey)->
		storeRequest = @_store.get(itemKey)
		new WebDBStoreRequest(storeRequest)
	getAll : (query, count)->
		storeRequest = @_store.getAll(query, count)
		new WebDBStoreRequest(storeRequest)
	# TODO
	index : (indexName)->
		_store.index(indexName)
	update : (itemObject, optionalKey)->
		storeRequest = @_store.put(itemObject, optionalKey)
		new WebDBStoreRequest(storeRequest)
	openCursor : (optionalKeyRange, optionalDirection)->
		storeRequest = @_store.openCursor(optionalKeyRange, optionalDirection)
		new WebDBStoreRequest(storeRequest)
	openKeyCursor : (optionalKeyRange, optionalDirection)->
		storeRequest = @_store.openKeyCursor(optionalKeyRange, optionalDirection)
		new WebDBStoreRequest(storeRequest)
	count : (optionalKeyRange)->
		storeRequest = @_store.count(optionalKeyRange)
		new WebDBStoreRequest(storeRequest)


	##############################################################
	# EVENTS

	onSuccess : (cb) -> 
		@on Event.Success, cb
		return
	onError : (cb) -> 
		@on Event.Error, cb
		return
	onUpdateNeeded : (cb) -> 
		@on Event.UpdateNeeded, cb
		return
	onComplete : (cb) -> 
		@on Event.Complete, cb
		return
	onAbort : (cb) -> 
		@on Event.Abort, cb
		return
	onBlocked : (cb) -> 
		@on Event.Blocked, cb
		return
	onVersionChange : (cb) -> 
		@on Event.VersionChange, cb
		return
	onClose : (cb) -> 
		@on Event.Close, cb
		return


##############################################################


class WebDBTransaction extends Element

	_kind 			: 'WebDBTransaction'
	_transaction 	: NULL 

	constructor: (transaction)->
		super

		@_transaction = transaction if transation isnt NULL

		that = @
		@_transaction.oncomplete = (e) ->
			that.emit Event.Complete, e
			return
		@_transaction.onerror = (e) ->
			that.emit Event.Error, e
			return
		@_transaction.onabort = (e) ->
			that.emit Event.Abort, e
			return

	##############################################################
	# METHODS

	# Get store instance
	getStore : (name) ->
		objectStore = @_transaction.objectStore(name)
		new WebDBStore(objectStore)
	
	# Abort operation
	abort : ->
		@_transaction.abort()
		return

	##############################################################
	# EVENTS

	onError : (cb) -> 
		@on Event.Error, cb
		return
	onComplete : (cb) -> 
		@on Event.Complete, cb
		return
	onAbort : (cb) -> 
		@on Event.Abort, cb
		return


##############################################################


class WebDB extends Element

	_kind 	: 'WebDB'
	name 	: NULL
	version : 1
	db 		: NULL

	constructor: ->
		super

		# Support gate
		if not window.indexedDB
			if properties.unsupported then properties.unsupported()
			@emit Event.Unsupported
			return no

		# DB name
		if Utils.isString(arguments[0])
			@name = arguments[0]
		else if Utils.isObject(arguments[0])
			@name = arguments[0].name if arguments[0].name
			@version = arguments[0].version if arguments[0].version
				
		# DB options
		if Utils.isNumber(arguments[1])
			@version = arguments[1]
		else if Utils.isObject(arguments[1])
			if arguments[1].version
				@version = arguments[1].version

		return if not @name

		that 		= @
		@request 	= window.indexedDB.open(@name, @version);

		@request.onsuccess = (e) ->
			that.db = e.target.result
			that.emit Event.Success, e
			return
		@request.onerror = (e) ->
			that.db = e.target.result
			that.emit Event.Error, e
			return
		@request.onabort = (e) ->
			that.db = e.target.result
			that.emit Event.Abort, e
			return
		@request.onversionchange = (e) ->
			that.db = e.target.result
			that.emit Event.VersionChange, e
			return
		@request.oncomplete = (e) ->
			that.db = e.target.result
			that.emit Event.Complete, e
			return
		@request.onupgradeneeded = (e) ->
			that.db = e.target.result
			that.emit Event.UpgradeNeeded, e
			return
		@request.onblocked = (e) ->
			that.db = e.target.result
			that.emit Event.Blocked, e
			return
		@request.onclose = (e) ->
			that.db = e.target.result
			that.emit Event.Close, e
			return

	##############################################################
	# METHODS

	##############################################################
	# DB

	transaction : (storeName, readonly=no)->
		if not readonly 
			readonly = 'readwrite'
		else
			readonly = 'readonly'
		@db.transaction(storeName, readonly)
		new WebDBTransaction(objectStore)

	close : ->
		@db.close()

	##############################################################
	# DB > Store

	# Create table inside DB
	createStore : (name, key) ->
		objectStore = @db.createObjectStore(name, key) # { keyPath: "ssn" }
		new WebDBStore(objectStore)

	removeStore : (name) ->
		@db.deleteObjectStore(name)

	##############################################################
	# EVENTS

	onUnsupported : (cb) -> 
		@on Event.Unsupported, cb
		return
	onSuccess : (cb) -> 
		@on Event.Success, cb
		return
	onError : (cb) -> 
		@on Event.Error, cb
		return
	onAbort : (cb) -> 
		@on Event.Abort, cb
		return
	onVersionChange : (cb) -> 
		@on Event.VersionChange, cb
		return
	onComplete : (cb) -> 
		@on Event.Complete, cb
		return
	onUpgradeNeeded : (cb) -> 
		@on Event.UpgradeNeeded, cb
		return
	onBlocked : (cb) -> 
		@on Event.Blocked, cb
		return
	onClose : (cb) -> 
		@on Event.Close, cb
		return

###
# Example
# Instanciate DB
db = new WebDB
	name: 'demoDB'
	version: 1

db.onVersionChange ->
	console.log db.db

	# Create new Store
	usersStore = db.createStore
		name: 'users'
		keyPath: "email"

	usersStore.onSuccess ->
		# Create index
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

		# Add data
		req = usersStore.add
			email: 'etienne@magixjs.com'
			age: 21
		req.onSuccess ->
			log 'nice'

###























