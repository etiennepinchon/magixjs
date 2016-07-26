var log, say,
  __slice = [].slice;

say = function() {
  var args, e, message, sameOrigin;
  args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  message = '» ' + args.map(function(obj) {
    return Utils.inspect(obj);
  }).join(", ");
  if (App.inWebView()) {
    sameOrigin = void 0;
    try {
      sameOrigin = window.parent.location.host === window.location.host;
    } catch (_error) {
      e = _error;
      sameOrigin = false;
    }
    if (!sameOrigin) {
      return;
    }
    window.top.APP_CONSOLE.push(message);
    if (window.top.REFRESH_APP_CONSOLE !== void 0) {
      window.top.REFRESH_APP_CONSOLE();
    }
  } else {
    console.log(message);
  }
};

log = say;
