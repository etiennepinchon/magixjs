# *********************************
# *********************************
# Cookie.js
# *********************************
# ** By Etienne Pinchon
# ** ©2016

Cookie = 
	set: (cname, cvalue, exdays) ->
		# Remove extra cookie
		d = new Date
		d.setTime d.getTime() + -1 * 24 * 60 * 60 * 1000
		expires = 'expires=' + d.toUTCString()
		document.cookie = cname + '=' + '' + '; ' + expires + '; ' + 'path=/'
		
		# Set new cookie
		if exdays is undefined
			exdays = 365
		exdate = new Date
		exdate.setDate exdate.getDate() + exdays
		c_value = encodeURI(cvalue) + (if exdays is null then '' else '; expires=' + exdate.toUTCString())
		c = cname + '=' + c_value + ';path=/'
		document.cookie = c
		return

	get: (cname) ->
		name = cname + '='
		ca = document.cookie.split(';')
		i = 0
		while i < ca.length
			c = ca[i]
			while c.charAt(0) is ' '
				c = c.substring(1)
			if c.indexOf(name) is 0
				string = decodeURI(c.substring(name.length, c.length))
				# Parse bool :)
				if string is 'false' or string is 'true'
					string = JSON.parse(string)
				return string
			i++
		undefined

	remove: (name) ->
		# Remove extra cookie
		d = new Date
		d.setTime d.getTime() + -1 * 24 * 60 * 60 * 1000
		expires = 'expires=' + d.toUTCString()
		document.cookie = name + '=' + '' + '; ' + expires + '; ' + 'path=/'
		return
