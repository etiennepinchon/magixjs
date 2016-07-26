var Import;

Import = function(paths, cb) {
  var path, toImport, urlPathname, _i, _len;
  if (!paths) {
    return;
  }
  if (Utils.isString(paths)) {
    paths = [paths];
  }
  toImport = [];
  for (_i = 0, _len = paths.length; _i < _len; _i++) {
    path = paths[_i];
    if (path.indexOf('.js') === -1) {
      path = '/build/' + path + '.js';
      if (App.USE_PROJECT_PATH) {
        urlPathname = App.location.pathname.split('/');
        urlPathname.shift();
        urlPathname.shift();
        path = '/p/' + urlPathname[0] + '/' + path;
      }
    }
    if (App.__IS_DIRECT_PATH && Utils.startsWith(path, '/build/')) {
      path = '/' + window.__ID + path;
    }
    if (App.__BUILD) {
      path += '?b=' + App.__BUILD;
    }
    toImport.push(path);
  }
  return $LAB.setGlobalDefaults({
    'ErrorHandler': function(e) {
      console.error(e.stack);
    }
  }).script(toImport).wait(function() {
    App.emit(Event.ImportEnd);
    if (cb) {
      return cb();
    }
  });
};
