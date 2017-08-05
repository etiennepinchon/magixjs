# Name
Utils

# Description
Utilities are custom functions in Magix, created to simplify tasks.


##############################################################
# Section
Basics

## Description
A few useful methods

##############################################################
## Method
modulate(value, [a,a], [b,b])

### Description
Translates a number between two numerical ranges.

### Arguments
value — A variable, representing the input.
[a, a] — The first range of two numbers.
[b, b] — The second range of two numbers.
### End Arguments

### Example
log Utils.modulate(0.5, [0, 1], [0, 100])
# Output: 50

log Utils.modulate(1, [0, 1], [0, 100])
# Output: 100

# Convert from Celsius to Fahrenheit
Utils.modulate celcius, [0, 100], [32, 212]
### End Example


##############################################################
## Method
cycle(values)

### Description
Creates a functions which returns the next value of an array each time it is called.

### Arguments
values — An array of values.
### End Arguments

### Example
cycler = Utils.cycle ['a', 'b', 'c']

log cycler # Output: 'a'
log cycler # Output: 'b'
log cycler # Output: 'c'
log cycler # Output: 'a', returns to start
### End Example


##############################################################
## Method
round(value, decimals=0)

### Description
Rounds a number.

### Arguments
value — A floating point number.
decimals — The amount which appear after the decimal point. (Optional)
### End Arguments

### Example
log Utils.round(100.12345, 0) # Output 100
log Utils.round(100.12345, 2) # Output 100.12
log Utils.round(100.12345, 4) # Output 100.1234
### End Example


##############################################################
## Method
randomChoice()

### Description
Select a random item from an array.

### Arguments
values - An array of values.
### End Arguments

### Example
log Utils.randomChoice(['a', 'b', 'c']) # Output: 'c'
log Utils.randomChoice(['a', 'b', 'c']) # Output: 'b'
log Utils.randomChoice(['a', 'b', 'c']) # Output: 'b'
log Utils.randomChoice(['a', 'b', 'c']) # Output: 'b'
log Utils.randomChoice(['a', 'b', 'c']) # Output: 'a'
### End Example


##############################################################
## Method
randomColor(opacity)

### Description
Returns a random color with the specified opacity.

### Arguments
opacity — A number between 0 and 1. (Optional)
### End Arguments

### Example
myView = new View
	backgroundColor : Utils.randomColor 0.5

log myView.backgroundColor
# Output: 'rgba(124, 12, 33, 0.5)'
### End Example


##############################################################
## Method
randomNumber(a, b)

### Description
Generate a random number between a and b.

### Arguments
a — A number, the first value of the range.
b — A number, the final value of the range.
### End Arguments

### Example
log Utils.randomNumber(0, 1) # Output: 0.2
log Utils.randomNumber(0, 100) # Output: 22
### End Example


##############################################################
## Method
formatBytes(bytes, decimals)

### Description
Format bytes

### Example
Utils.formatBytes(4567898765)
# Output: "4.568 GB"
### End Example


##############################################################
## Method
e(string)

### Description
Escape a HTML string. Escaping a HTMl string removes ambiguity from the string so that it is not confused as HTML.

### Example
log Utils.e('<This 'is' is a test>')
# Output: '&ltThis &quotis&quot is a test&gt'
### End Example



##############################################################
## Method
getTime()

### Description
Get the current time in the users local timezone.

### Example
log Utils.getTime()
### End Example



##############################################################
## Method
clone(object)

### Description
Create a new object based on another object.

### Example
Utils.clone object
### End Example





##############################################################
# Section
Delay / Interval

## Description
Add delays and intervals



##############################################################
## Method
Delay(delay, handler)

### Description
Calls a function after a certain day defined in seconds.

### Arguments
delay — A number, representing seconds.
handler — A function.
### End Arguments

### Example
Delay 0.5, ->
	log 'hello'

# Output: 'hello', after 0.5 seconds
### End Example


##############################################################
## Method
Interval(interval, handler)

### Description
Calls a function every x seconds.

### Arguments
interval — A number, representing seconds.
handler — A function.
### End Arguments

### Example
Interval 2, ->
	log 'hello'

# Output: 'hello'
# Output: 'hello'
# Output: 'hello' etc...
### End Example


##############################################################
## Method
Debounce(interval, handler)

### Description
Creates a function which can only be called x seconds after the last time it was called.

### Arguments
interval — A number, representing seconds.
handler — A function.
### End Arguments

### Example
Debounce 0.1, ->
	log 'hello'

for i in [1...100]
	handler()

# Output: 'hello' only once
### End Example


##############################################################
## Method
Throttle(interval, handler)

### Description
Creates a function which can only be called at most every x seconds.

### Arguments
interval — A number, representing seconds.
handler — A function.
### End Arguments

### Example
handler = Throttle 0.1, ->
	log 'hello'

for i in [1...100]
	handler()

# Output: 'hello' only once
### End Example






##############################################################
# Section
Browser

## Description
Get info about the app environement.


##############################################################
## Method
isDesktop()

### Description
Returns whether the app is used on a desktop.

### Example
log Utils.isDesktop()
### End Example


##############################################################
## Method
isPhone()

### Description
Returns whether the app is used on a phone.

### Example
log Utils.isPhone()
### End Example

##############################################################
## Method
isTablet()

### Description
Returns whether the app is used on a tablet.

### Example
log Utils.isTablet()
### End Example


##############################################################
## Method
isMobile()

### Description
Returns whether the app is used on a tablet or phone.

### Example
log Utils.isMobile()
### End Example


##############################################################
## Method
isTouch()

### Description
Returns whether this is a touch enabled browser.

### Example
log Utils.isTouch()
### End Example


##############################################################
## Method
isWebKit()

### Description
Returns whether this is a WebKit browser.

### Example
log Utils.isWebKit()
### End Example


##############################################################
## Method
isChrome()

### Description
Returns whether this is a Google Chrome browser.

### Example
log Utils.isChrome()
### End Example


##############################################################
## Method
isSafari()

### Description
Returns whether this is a Safari browser.

### Example
log Utils.isSafari()
### End Example


##############################################################
## Method
browser()

### Description
Returns the browser name and version.

### Example
log Utils.browser()
### End Example


##############################################################
## Method
devicePixelRatio()

### Description
Returns the pixel ratio of the screen.

### Example
log Utils.devicePixelRatio()
### End Example




##############################################################
# Section
Variable check

## Description
Allow you to check variables type quickly.


##############################################################
## Method
isString()

### Description
Returns true if object is a String.

### Example
Utils.isString("John")
# Output: true
### End Example


##############################################################
## Method
isFunction()

### Description
Returns true if object is a Function.

### Example
Utils.isFunction(alert)
# Output: true
### End Example


##############################################################
## Method
isBoolean()

### Description
Returns true if object is a boolean.

### Example
a = false
Utils.isBoolean(a)
# Output: true
### End Example


##############################################################
## Method
isFloat()

### Description
Returns true if object is a float.

### Example
Utils.isFloat(3.14)
# Output: true
### End Example


##############################################################
## Method
isInteger()

### Description
Returns true if object is a integer.

### Example
Utils.isInteger(22)
# Output: true
### End Example


##############################################################
## Method
isNumber()

### Description
Returns true if object is a number.

### Example
Utils.isNumber(8.4 * 5)
# Output: true
### End Example


##############################################################
## Method
isArray()

### Description
Returns true if object is an Array.

### Example
Utils.isArray([1,2,3])
# Output: true
### End Example


##############################################################
## Method
isObject()

### Description
Returns true if value is an Object. Note that JavaScript/Coffeescript arrays and functions are objects, while (normal) strings and numbers are not.

### Example
Utils.isObject({})
# Output: true

Utils.isObject(1)
# Output: false
### End Example


##############################################################
## Method
isFinite()

### Description
Returns true if object is a finite number.

### Example
Utils.isFinite(-101)
# Output: true

Utils.isFinite(-Infinity)
# Output: false
### End Example


##############################################################
## Method
isDate()

### Description
Returns true if object is a Date.

### Example
Utils.isDate(new Date())
# Output: true
### End Example


##############################################################
## Method
isRegExp()

### Description
Returns true if object is a RegExp.

### Example
Utils.isRegExp(/moe/)
# Output: true
### End Example


##############################################################
## Method
isRegExp()

### Description
Returns true if object inherits from an Error.

### Example
try
	throw new TypeError('Example')
catch (e) {
	Utils.isError(e)
	# Output: true
### End Example


##############################################################
## Method
isNaN()

### Description
Returns true if object is NaN (Not A Number)

### Example
Utils.isNaN('Hello')
# Output: true
### End Example


##############################################################
## Method
isNull()

### Description
Returns true if the value of object is null.

### Example
Utils.isNull(null)
# Output: true

Utils.isNull(undefined)
# Output: false
### End Example


##############################################################
## Method
isUndefined()

### Description
Returns true if value is undefined.

### Example
Utils.isUndefined(App.missingVariable)
# Output: true
### End Example








##############################################################
# Section
Strings

## Description
Methods to manipulate strings.



##############################################################
## Method
startsWith(string, prefix)

### Description
Return whether a string starts with prefix

### Example
Utils.startsWith('Hello', 'Hel')
# Output: true
### End Example


##############################################################
## Method
endsWith(str, suffix)

### Description
Return whether a string ends with suffix

### Example
Utils.endsWith('Abc', 'bc')
# Output: true
### End Example


##############################################################
## Method
capitalizeFirst(string)

### Description
Capitalize the first letter of a string.

### Example
log Utils.capitalizeFirst('we do not remember days, we remember moments.')
# Output: 'We do not remember days, we remember moments.'
### End Example


##############################################################
## Method
base64()

### Description
Convert utf8 to base 64

### Example
Utils.base64(str)
### End Example


##############################################################
## Method
utf8()

### Description
Convert base 64 to utf8

### Example
Utils.utf8(str)
### End Example




##############################################################
# Section
Array, Object

## Description
Methods to manipulate arrays and objects.


##############################################################
## Method
first(array)

### Description
Return first key of array

### Example
myArray = ['a', 'b', 'c']
Utils.first(myArray)
# Output: 'a'
### End Example


##############################################################
## Method
last(array)

### Description
Return last key of array

### Example
myArray = ['a', 'b', 'c']
Utils.last(myArray)
# Output: 'c'
### End Example


##############################################################
## Method
mergeArray(a, b)

### Description
Merge two arrays together

### Example
arrayA = ['a', 'b', 'c']
arrayB = ['d', 'e', 'f']
Utils.mergeArray(arrayA, arrayB)
# Output: ['a', 'b', 'c', 'd', 'e', 'f']
### End Example


##############################################################
## Method
keys(object)

### Description
Return the keys of an object

### Example
myObject = {'a': {}, 'b': [], 'c': 5}
Utils.keys(myObject)
# Output: ['a', 'b', 'c']
### End Example


##############################################################
## Method
values(object)

### Description
Get all the values of an object into an array

### Example
myObject = { a : b, c: d} 
Utils.values(myObject)
# Output: [b, d]
### End Example














