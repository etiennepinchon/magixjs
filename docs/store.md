# Name
Storage

# Description
Save data from your application locally. This data can be retrieved when your webpage is opened. Cookies for instance are usually used to store user data to allow them to log in automatically.


##############################################################
# Section
Cookie

## Description
Allows you to save small amounts of data on the computer of the user.


##############################################################
## Method
set(name, value, days_to_live)

### Description
Creates a cookie variable which can be used to store data such as a username.

### Arguments
name - The name of the cookie.
value - The value contained in the cookie.
days_to_live - The number of days until the cookie expires.
### End Arguments

### Example
# Create a cookie variable which will store the username 'steve' for 15 days
cookie.set 'username', 'steve', 15
### End Example


##############################################################
## Method
get(name)

### Description
Returns the value of a cookie.

### Arguments
name - The name of the cookie.
### End Arguments

### Example
cookie.set 'username', 'steve', 15

log cookie.get('username')
# Output: 'steve'
### End Example


##############################################################
## Method
remove(name)

### Description
Remove a cookie.

### Arguments
name - The name of the cookie.
### End Arguments

### Example
cookie.set 'username', 'steve', 15

cookie.remove 'username'
### End Example



##############################################################
# Section
Store

## Description
Allows you to store data permanently on the computer of the user. They also allows you to store much more data than cookies.


##############################################################
## Method
set(name, value)

### Description
Store any type of data locally. The maximum size limit is 5MB.

### Example
store.set 'name', 'John Smith'
### End Example


##############################################################
## Method
get(name)

### Description
Retrieve the given key.

### Example
store.set 'name', 'John Smith'

log store.get('name')
# Output: 'John Smith'
### End Example


##############################################################
## Method
remove(name)

### Description
Remove the given key.

### Example
store.set 'name', 'John Smith'

store.remove 'name'
### End Example





##############################################################
# Section
Session Store

## Description
Allows you to store data for the current browser session on the computer of the user.


##############################################################
## Method
set(name, value)

### Description
Store any type of data locally for the current browser session. The maximum size limit is 5MB.

### Example
sessionStore.set 'name', 'John Smith'
### End Example


##############################################################
## Method
get(name)

### Description
Retrieve the given key.

### Example
sessionStore.set 'name', 'John Smith'

log sessionStore.get('name')
# Output: 'John Smith'
### End Example


##############################################################
## Method
remove(name)

### Description
Remove the given key.

### Example
sessionStore.set 'name', 'John Smith'

sessionStore.remove 'name'
### End Example

