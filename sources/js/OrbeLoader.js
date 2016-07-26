var Orbe, __ORBE_LOADED;

__ORBE_LOADED = false;

Orbe = {
  version: '1.0',
  creator: 'Etienne Pinchon (@etiennepinchon)',
  copyright: 'Orbe.io',
  boot: function() {
    Orbe.__domComplete = [];
    Orbe.__domReady = false;
    if (typeof document !== "undefined" && document !== null) {
      return document.onreadystatechange = function(event) {
        var f, _results;
        if (document.readyState === 'interactive') {
          Orbe.__domReady = true;
          _results = [];
          while (Orbe.__domComplete.length) {
            _results.push(f = Orbe.__domComplete.shift()());
          }
          return _results;
        }
      };
    }
  },
  _onComplete: function(f) {
    if (Orbe.__domReady) {
      return f();
    }
    return Orbe.__domComplete.push(f);
  },
  load: function(first, second) {
    var do_next;
    if (__ORBE_LOADED) {
      if (Utils.isFunction(first)) {
        first();
      } else if (Utils.isFunction(second)) {
        second();
      }
    }
    do_next = function() {
      if (Utils.isString(first)) {
        first = [first];
      }
      if (Utils.isFunction(first)) {
        __ORBE_LOADED = true;
        first();
      } else if (Utils.isArray(first)) {
        Import(first, function() {
          __ORBE_LOADED = true;
          if (Utils.isFunction(second)) {
            second();
          }
        });
      }
    };
    return Orbe._onComplete(function() {
      var script, url;
      url = '//data.orbe.io/framework/1.0/orbe.min.js?b=' + __ORBE_JS_BUILD_DATE__;
      script = document.createElement("script");
      script.type = "text/javascript";
      script.src = url;
      script.onreadystatechange = do_next;
      script.onload = do_next;
      return document.body.appendChild(script);
    });
  }
};

Orbe.boot();
