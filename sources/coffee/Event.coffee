# *********************************
# *********************************
# Event.js
# *********************************
# ** By Etienne Pinchon
# ** ©2016

# Life cycle event
Event.WillAppear = 'willappear'
Event.Appear = 'didappear'
Event.DidAppear = 'didappear'
Event.WillDisappear = 'willdisappear'
Event.Disappear = 'diddisappear'
Event.DidDisappear = 'diddisappear'

Event.Click = 'click'
Event.DoubleClick = 'dblclick'
Event.Hover = [
  'mouseenter'
  'mouseleave'
]
Event.In = 'mouseenter'
Event.Out = 'mouseleave'
Event.Down = 'mousedown'
Event.Up = 'mouseup'
Event.Over = 'mouseover'
Event.Move = 'mousemove'
Event.RightClick = 'contextmenu'
#Event.MouseWheel = 'mousewheel'
Event.MouseWheel = 'wheel'

Event.MouseIn = Event.In
Event.MouseUp = Event.Up
Event.MouseDown = Event.Down
Event.MouseOver = Event.Over
Event.MouseOut = Event.Out
Event.MouseMove = Event.Move

# Frame/Object Events
Event.Abort = 'abort'
Event.Quit = 'beforeunload'
Event.Error = 'error'
Event.HashChange = 'hashchange'
Event.Load = 'load'
Event.Loaded = 'load'
Event.Resize = 'resize'
Event.Scroll = 'scroll'
Event.Show = 'show'
Event.Close = 'close'

# Keyboard Events
Event.PressingKey = 'keydown'
Event.PressKey = 'keypress'
Event.ReleaseKey = 'keyup'
Event.KeyDown = 'keydown'
Event.KeyPress = 'keypress'
Event.KeyUp = 'keyup'

# Form Events
Event.Focus = 'focus'
Event.ResignFocus = 'blur'
Event.Blur = 'blur'
Event.Change = 'change'
Event.WillFocus = 'focusin'
Event.WillResignFocus = 'focusout'
Event.Input = 'input'
Event.Invalid = 'invalid'
Event.Reset = 'reset'
Event.Search = 'search'
Event.Select = 'select'
Event.Submit = 'submit'

# Drag Events
Event.DragStart = 'dragstart'
Event.DragWillMove = 'dragwillmove'
Event.DragMove = 'dragmove'
Event.DragDidMove = 'dragmove'
Event.Drag = 'dragmove'
Event.DragEnd = 'dragend'
Event.DragAnimationDidStart = 'draganimationdidstart'
Event.DragAnimationDidEnd = 'draganimationdidend'
Event.DirectionLockDidStart = 'directionlockdidstart'

# Drag/drop files
Event.DragEnter = 'dragenter'
Event.DragOver = 'dragover'
Event.DragLeave = 'dragleave'
Event.Drop = 'drop'

# Clipboard Events
Event.Copy = 'copy'
Event.Cut = 'cut'
Event.Paste = 'paste'

# File Reader
Event.LoadEnd = 'loadend'

Event.Unsupported = 'unsupported'
Event.Success = 'success'
Event.Clear = 'clear'
Event.Response = 'response'

# Thread
Event.Receive = 'receive'
Event.Send = 'send'
Event.End = 'end'

# Notification
Event.Granted = 'granted'

# App
Event.Run = 'run'
Event.Online = 'online'
Event.Offline = 'offline'
Event.HistoryChanged = 'popstate'
Event.Wheel = 'wheel'

# Media Events
Event.CanPlay = 'canplay'
Event.CanPlayThrough = 'canplaythrough'
Event.DurationChange = 'durationchange'
Event.Emptied = 'emptied'
Event.ReachEnd = 'ended'
Event.LoadedData = 'loadeddata'
Event.LoadedMetaData = 'loadedmetadata'
Event.LoadStart = 'loadstart'
Event.Pause = 'pause'
Event.Play = 'play'
Event.Playing = 'playing'
Event.Progress = 'progress'
Event.SpeedChange = 'ratechange'
Event.Seeked = 'seeked'
Event.Seeking = 'seeking'
Event.Stalled = 'stalled'
Event.Suspend = 'suspend'
Event.TimeUpdate = 'timeupdate'
Event.VolumeChange = 'volumechange'
Event.Waiting = 'waiting'

# Animation events
Event.AnimationStart = 'start'
Event.AnimationStop = 'stop'
Event.AnimationEnd = 'end'

Event.AnimationDidStart = 'start'
Event.AnimationDidStop = 'stop'
Event.AnimationDidEnd = 'end'

# Preload events
Event.PreloadDone = 'preloadEnd'
Event.PreloadEnd = 'preloadEnd'
Event.PreloadProgress = 'preloadProgress'

# Import events
Event.ImportDone = 'importEnd'
Event.ImportEnd = 'importEnd'
Event.ImportProgress = 'importProgress'

# Standard touch events
Event.TouchStart = 'touchstart'
Event.TouchEnd = 'touchend'
Event.TouchMove = 'touchmove'
Event.TouchStart = 'mousedown'
Event.TouchEnd = 'mouseup'
Event.TouchMove = 'mousemove'

# States
Event.StateWillSwitch = "willSwitch"
Event.StateDidSwitch = "didSwitch"


# VR
Event.DisplayConnected =  'displayconnected'
Event.DisplayDisconnected =  'displaydisconnected'


# Change
Change = {}
Change.x = 'change:x'
Change.y = 'change:y'
Change.point = 'change:point'
Change.width = 'change:width'
Change.height = 'change:height'
Change.size = 'change:size'
Change.frame = 'change:frame'
Change.rotation = 'change:rotation'
Change.borderRadius = 'change:borderRadius'
Change.currentPage = 'change:currentPage'
Change.style = 'change:style'
Change.html = 'change:html'
Change.children = 'change:children'
Change.parent = 'change:parent'
Change.page = 'change:page'
Change.value = 'change:value'

# Battery
Change.BatteryCharging = 'change:batteryCharging'
Change.BatteryLevel = 'change:batteryLevel'
Change.ChargingTime = 'change:chargingTime'
Change.DischargingTime = 'change:dischargingTime'

# Accelerometer
Change.DeviceMotion = 'devicemotion'
Change.DeviceOrientation = 'deviceorientation'


# Gesture
Gesture = {}
Gesture.Tap = 'tap'
Gesture.TapStart = 'tapstart'
Gesture.TapEnd = 'tapend'
Gesture.DoubleTap = 'doubletap'
Gesture.ForceTap = 'forcetap'
Gesture.ForceTapChange = 'forcetapchange'
Gesture.ForceTapStart = 'forcetapstart'
Gesture.ForceTapEnd = 'forcetapend'

# LongPress Event
Gesture.LongPress = 'longpress'
Gesture.LongPressStart = 'longpressstart'
Gesture.LongPressEnd = 'longpressend'

# Swipe Event
Gesture.Swipe = 'swipe'
Gesture.SwipeStart = 'swipestart'
Gesture.SwipeEnd = 'swipeend'
Gesture.SwipeUp = 'swipeup'
Gesture.SwipeUpStart = 'swipeupstart'
Gesture.SwipeUpEnd = 'swipeupend'
Gesture.SwipeDown = 'swipedown'
Gesture.SwipeDownStart = 'swipedownstart'
Gesture.SwipeDownEnd = 'swipedownend'
Gesture.SwipeLeft = 'swipeleft'
Gesture.SwipeLeftStart = 'swipeleftstart'
Gesture.SwipeLeftEnd = 'swipeleftend'
Gesture.SwipeRight = 'swiperight'
Gesture.SwipeRightStart = 'swiperightstart'
Gesture.SwipeRightEnd = 'swiperightend'

# Swipe Edge Event
Gesture.EdgeSwipe = 'edgeswipe'
Gesture.EdgeSwipeStart = 'edgeswipestart'
Gesture.EdgeSwipeEnd = 'edgeswipeend'
Gesture.EdgeSwipeTop = 'edgeswipetop'
Gesture.EdgeSwipeTopStart = 'edgeswipetopstart'
Gesture.EdgeSwipeTopEnd = 'edgeswipetopend'
Gesture.EdgeSwipeRight = 'edgeswiperight'
Gesture.EdgeSwipeRightStart = 'edgeswiperightstart'
Gesture.EdgeSwipeRightEnd = 'edgeswiperightend'
Gesture.EdgeSwipeBottom = 'edgeswipebottom'
Gesture.EdgeSwipeBottomStart = 'edgeswipebottomstart'
Gesture.EdgeSwipeBottomEnd = 'edgeswipebottomend'
Gesture.EdgeSwipeLeft = 'edgeswipeleft'
Gesture.EdgeSwipeLeftStart = 'edgeswipeleftstart'
Gesture.EdgeSwipeLeftEnd = 'edgeswipeleftend'

# Pan Event
Gesture.Pan = 'pan'
Gesture.PanStart = 'panstart'
Gesture.PanEnd = 'panend'
Gesture.PanLeft = 'panleft'
Gesture.PanRight = 'panright'
Gesture.PanUp = 'panup'
Gesture.PanDown = 'pandown'

# Pinch Event
Gesture.Pinch = 'pinch'
Gesture.PinchStart = 'pinchstart'
Gesture.PinchEnd = 'pinchend'
Gesture.Scale = 'scale'
Gesture.ScaleStart = 'scalestart'
Gesture.ScaleEnd = 'scaleend'
Gesture.Rotate = 'rotate'
Gesture.RotateStart = 'rotatestart'
Gesture.RotateEnd = 'rotateend'


# Scroll
Event.ScrollStart = 'scrollstart' # Start scrolling.
Event.Scroll = 'scroll' # While scrolling.
Event.ScrollMove = Event.Scroll
Event.ScrollEnd = 'scrollend'  # End of scroll.
Event.ScrollAnimationDidStart = 'scrollanimationdidstart' # Did start momentum/bounce animation.
Event.ScrollAnimationDidEnd = 'scrollanimationdidend' # Did end momentum/bounce animation.

Utils.extend(Event, Gesture)

# Extract touch events for any event
Event.touchEvent = (event) ->
  touchEvent =  event.touches?[0]
  touchEvent ?= event.changedTouches?[0]
  touchEvent ?= event
  touchEvent

Event.wrap = (element) ->
  App.CurrentContext.domEventManager.wrap(element)

Event.isGesture = (eventName) ->
  return eventName in Gesture

