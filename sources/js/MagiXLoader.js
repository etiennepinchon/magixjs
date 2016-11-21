var MagiX, __MAGIX_LOADED;

if (!MagiX) {
  console.log('MagiX | Beyond magical. @etiennepinchon');
}

__MAGIX_LOADED = false;

MagiX = {
  version: '1.0',
  creator: 'Etienne Pinchon (@etiennepinchon)',
  about: 'Beyond magical.',
  copyright: 'magixjs.com',
  boot: function() {
    MagiX.__domComplete = [];
    MagiX.__domReady = false;
    if (typeof document !== "undefined" && document !== null) {
      return document.onreadystatechange = function(event) {
        var f, _results;
        if (document.readyState === 'interactive') {
          MagiX.__domReady = true;
          _results = [];
          while (MagiX.__domComplete.length) {
            _results.push(f = MagiX.__domComplete.shift()());
          }
          return _results;
        }
      };
    }
  },
  _onComplete: function(f) {
    if (MagiX.__domReady) {
      return f();
    }
    return MagiX.__domComplete.push(f);
  },
  load: function(first, second) {
    var do_next;
    if (__MAGIX_LOADED) {
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
        __MAGIX_LOADED = true;
        first();
      } else if (Utils.isArray(first)) {
        Import(first, function() {
          __MAGIX_LOADED = true;
          if (Utils.isFunction(second)) {
            second();
          }
        });
      }
    };
    return MagiX._onComplete(function() {
      var script, url;
      url = '//s3.amazonaws.com/data.magixjs.com/framework/1.0/magix.min.js?b=' + __MAGIX_JS_BUILD_DATE__;
      script = document.createElement("script");
      script.type = "text/javascript";
      script.src = url;
      script.onreadystatechange = do_next;
      script.onload = do_next;
      return document.body.appendChild(script);
    });
  }
};

MagiX.boot();
