# *********************************
# *********************************
# Store.js
# *********************************
# ** By Etienne Pinchon
# ** ©2016

Store = 
	set: (name, value) ->
		try
			localStorage.setItem name, JSON.stringify(value)
		catch e
			console.warn 'Error, Store not available.'
		return
	get: (name) ->
		try
			JSON.parse localStorage.getItem(name)
		catch e
			console.warn 'Error, Store not available.'
	remove: (name) ->
		try
			localStorage.removeItem name
		catch e
			console.warn 'Error, Store not available.'
		return

# *********************************
# *********************************
# SessionStore.js
# *********************************
# ** By Etienne Pinchon
# ** ©2016

SessionStore = 
	set: (name, value) ->
		try
			sessionStorage.setItem name, JSON.stringify(value)
		catch e
			console.warn 'Error, Store not available.'
		return
	get: (name) ->
		try
			JSON.parse sessionStorage.getItem(name)
		catch e
			console.warn 'Error, Store not available.'
	remove: (name) ->
		try
			sessionStorage.removeItem name
		catch e
			console.warn 'Error, Store not available.'
		return

