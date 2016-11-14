var Change, Gesture,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Event.WillAppear = 'willappear';

Event.Appear = 'didappear';

Event.DidAppear = 'didappear';

Event.WillDisappear = 'willdisappear';

Event.Disappear = 'diddisappear';

Event.DidDisappear = 'diddisappear';

Event.Click = 'click';

Event.DoubleClick = 'dblclick';

Event.Hover = ['mouseenter', 'mouseleave'];

Event.In = 'mouseenter';

Event.Out = 'mouseleave';

Event.Down = 'mousedown';

Event.Up = 'mouseup';

Event.Over = 'mouseover';

Event.Move = 'mousemove';

Event.RightClick = 'contextmenu';

Event.MouseWheel = 'wheel';

Event.MouseIn = Event.In;

Event.MouseUp = Event.Up;

Event.MouseDown = Event.Down;

Event.MouseOver = Event.Over;

Event.MouseOut = Event.Out;

Event.MouseMove = Event.Move;

Event.Abort = 'abort';

Event.Quit = 'beforeunload';

Event.Error = 'error';

Event.HashChange = 'hashchange';

Event.Load = 'load';

Event.Loaded = 'load';

Event.Resize = 'resize';

Event.Scroll = 'scroll';

Event.Show = 'show';

Event.Close = 'close';

Event.PressingKey = 'keydown';

Event.PressKey = 'keypress';

Event.ReleaseKey = 'keyup';

Event.KeyDown = 'keydown';

Event.KeyPress = 'keypress';

Event.KeyUp = 'keyup';

Event.Focus = 'focus';

Event.ResignFocus = 'blur';

Event.Blur = 'blur';

Event.Change = 'change';

Event.WillFocus = 'focusin';

Event.WillResignFocus = 'focusout';

Event.Input = 'input';

Event.Invalid = 'invalid';

Event.Reset = 'reset';

Event.Search = 'search';

Event.Select = 'select';

Event.Submit = 'submit';

Event.DragStart = 'dragstart';

Event.DragWillMove = 'dragwillmove';

Event.DragMove = 'dragmove';

Event.DragDidMove = 'dragmove';

Event.Drag = 'dragmove';

Event.DragEnd = 'dragend';

Event.DragAnimationDidStart = 'draganimationdidstart';

Event.DragAnimationDidEnd = 'draganimationdidend';

Event.DirectionLockDidStart = 'directionlockdidstart';

Event.DragEnter = 'dragenter';

Event.DragOver = 'dragover';

Event.DragLeave = 'dragleave';

Event.Drop = 'drop';

Event.Copy = 'copy';

Event.Cut = 'cut';

Event.Paste = 'paste';

Event.LoadEnd = 'loadend';

Event.Unsupported = 'unsupported';

Event.Success = 'success';

Event.Clear = 'clear';

Event.Response = 'response';

Event.Receive = 'receive';

Event.Send = 'send';

Event.End = 'end';

Event.Granted = 'granted';

Event.Boundary = 'boundary';

Event.Mark = 'mark';

Event.Resume = 'resume';

Event.Start = 'start';

Event.AudioStart = 'audiostart';

Event.AudioEnd = 'audioend';

Event.NoMatch = 'nomatch';

Event.Result = 'result';

Event.SoundStart = 'soundstart';

Event.SoundEnd = 'soundend';

Event.SpeechStart = 'speechstart';

Event.SpeechEnd = 'speechend';

Event.Run = 'run';

Event.Online = 'online';

Event.Offline = 'offline';

Event.HistoryChanged = 'popstate';

Event.Wheel = 'wheel';

Event.CanPlay = 'canplay';

Event.CanPlayThrough = 'canplaythrough';

Event.DurationChange = 'durationchange';

Event.Emptied = 'emptied';

Event.ReachEnd = 'ended';

Event.LoadedData = 'loadeddata';

Event.LoadedMetaData = 'loadedmetadata';

Event.LoadStart = 'loadstart';

Event.Pause = 'pause';

Event.Play = 'play';

Event.Playing = 'playing';

Event.Progress = 'progress';

Event.SpeedChange = 'ratechange';

Event.Seeked = 'seeked';

Event.Seeking = 'seeking';

Event.Stalled = 'stalled';

Event.Suspend = 'suspend';

Event.TimeUpdate = 'timeupdate';

Event.VolumeChange = 'volumechange';

Event.Waiting = 'waiting';

Event.AnimationStart = 'start';

Event.AnimationStop = 'stop';

Event.AnimationEnd = 'end';

Event.AnimationDidStart = 'start';

Event.AnimationDidStop = 'stop';

Event.AnimationDidEnd = 'end';

Event.PreloadDone = 'preloadEnd';

Event.PreloadEnd = 'preloadEnd';

Event.PreloadProgress = 'preloadProgress';

Event.ImportDone = 'importEnd';

Event.ImportEnd = 'importEnd';

Event.ImportProgress = 'importProgress';

Event.TouchStart = 'touchstart';

Event.TouchEnd = 'touchend';

Event.TouchMove = 'touchmove';

Event.TouchStart = 'mousedown';

Event.TouchEnd = 'mouseup';

Event.TouchMove = 'mousemove';

Event.StateWillSwitch = "willSwitch";

Event.StateDidSwitch = "didSwitch";

Event.DisplayConnected = 'displayconnected';

Event.DisplayDisconnected = 'displaydisconnected';

Change = {
  x: 'change:x',
  y: 'change:y',
  point: 'change:point',
  width: 'change:width',
  height: 'change:height',
  size: 'change:size',
  frame: 'change:frame',
  rotation: 'change:rotation',
  borderRadius: 'change:borderRadius',
  currentPage: 'change:currentPage',
  style: 'change:style',
  html: 'change:html',
  children: 'change:children',
  parent: 'change:parent',
  page: 'change:page',
  value: 'change:value',
  BatteryCharging: 'change:batteryCharging',
  BatteryLevel: 'change:batteryLevel',
  ChargingTime: 'change:chargingTime',
  DischargingTime: 'change:dischargingTime',
  DeviceMotion: 'devicemotion',
  DeviceOrientation: 'deviceorientation'
};

Gesture = {
  Tap: 'tap',
  TapStart: 'tapstart',
  TapEnd: 'tapend',
  DoubleTap: 'doubletap',
  ForceTap: 'forcetap',
  ForceTapChange: 'forcetapchange',
  ForceTapStart: 'forcetapstart',
  ForceTapEnd: 'forcetapend',
  LongPress: 'longpress',
  LongPressStart: 'longpressstart',
  LongPressEnd: 'longpressend',
  Swipe: 'swipe',
  SwipeStart: 'swipestart',
  SwipeEnd: 'swipeend',
  SwipeUp: 'swipeup',
  SwipeUpStart: 'swipeupstart',
  SwipeUpEnd: 'swipeupend',
  SwipeDown: 'swipedown',
  SwipeDownStart: 'swipedownstart',
  SwipeDownEnd: 'swipedownend',
  SwipeLeft: 'swipeleft',
  SwipeLeftStart: 'swipeleftstart',
  SwipeLeftEnd: 'swipeleftend',
  SwipeRight: 'swiperight',
  SwipeRightStart: 'swiperightstart',
  SwipeRightEnd: 'swiperightend',
  EdgeSwipe: 'edgeswipe',
  EdgeSwipeStart: 'edgeswipestart',
  EdgeSwipeEnd: 'edgeswipeend',
  EdgeSwipeTop: 'edgeswipetop',
  EdgeSwipeTopStart: 'edgeswipetopstart',
  EdgeSwipeTopEnd: 'edgeswipetopend',
  EdgeSwipeRight: 'edgeswiperight',
  EdgeSwipeRightStart: 'edgeswiperightstart',
  EdgeSwipeRightEnd: 'edgeswiperightend',
  EdgeSwipeBottom: 'edgeswipebottom',
  EdgeSwipeBottomStart: 'edgeswipebottomstart',
  EdgeSwipeBottomEnd: 'edgeswipebottomend',
  EdgeSwipeLeft: 'edgeswipeleft',
  EdgeSwipeLeftStart: 'edgeswipeleftstart',
  EdgeSwipeLeftEnd: 'edgeswipeleftend',
  Pan: 'pan',
  PanStart: 'panstart',
  PanEnd: 'panend',
  PanLeft: 'panleft',
  PanRight: 'panright',
  PanUp: 'panup',
  PanDown: 'pandown',
  Pinch: 'pinch',
  PinchStart: 'pinchstart',
  PinchEnd: 'pinchend',
  Scale: 'scale',
  ScaleStart: 'scalestart',
  ScaleEnd: 'scaleend',
  Rotate: 'rotate',
  RotateStart: 'rotatestart',
  RotateEnd: 'rotateend'
};

Event.ScrollStart = 'scrollstart';

Event.Scroll = 'scroll';

Event.ScrollMove = Event.Scroll;

Event.ScrollEnd = 'scrollend';

Event.ScrollAnimationDidStart = 'scrollanimationdidstart';

Event.ScrollAnimationDidEnd = 'scrollanimationdidend';

Utils.extend(Event, Gesture);

Event.touchEvent = function(event) {
  var touchEvent, _ref, _ref1;
  touchEvent = (_ref = event.touches) != null ? _ref[0] : void 0;
  if (touchEvent == null) {
    touchEvent = (_ref1 = event.changedTouches) != null ? _ref1[0] : void 0;
  }
  if (touchEvent == null) {
    touchEvent = event;
  }
  return touchEvent;
};

Event.wrap = function(element) {
  return App.CurrentContext.domEventManager.wrap(element);
};

Event.isGesture = function(eventName) {
  return __indexOf.call(Gesture, eventName) >= 0;
};
