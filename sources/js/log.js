var log, print,
  __slice = [].slice;

log = function() {
  var args, e, message, options, sameOrigin;
  args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  options = {};
  if (Utils.isObject(args[args.length - 1])) {
    options = args.pop();
  }
  message = '» ' + args.map(function(obj) {
    return Utils.inspect(obj);
  }).join(", ");
  sameOrigin = NULL;
  if (App.inWebView()) {
    try {
      sameOrigin = window.parent.location.host === window.location.host;
    } catch (_error) {
      e = _error;
      sameOrigin = NULL;
    }
    if (!sameOrigin) {
      return;
    }
    if (window.top.__CONSOLE !== NULL) {
      window.top.__CONSOLE.push(message);
      if (window.top.__REFRESH_CONSOLE !== NULL) {
        window.top.__REFRESH_CONSOLE();
      }
    }
  } else {
    if (options !== NULL && options.error) {
      console.error(message);
      return;
    }
    console.log(message);
  }
};

log._times = {};

log.time = function(name) {
  log._times[name] = window.performance.now();
};

log.timeEnd = function(name) {
  if (!log._times[name]) {
    return;
  }
  return log(Utils.round(window.performance.now() - log._times[name], 2) + 'ms');
};

print = log;


/*
TODO

log 'hello',
	color: black
	fontSize: 40
 */
