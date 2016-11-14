var Routes,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

App.Before = NULL;

App._routes = {};

Routes = (function(_super) {
  __extends(Routes, _super);

  Routes.prototype._kind = 'Routes';

  function Routes(routes) {
    if (!Utils.isObject(routes)) {
      throw new Error('Routes: routes must be in an object.');
      return;
    }
    App._routes = routes;
    Routes.routing();
    return;
  }

  Routes.prototype.getAll = function() {
    return App._routes;
  };

  Routes.add = function(route, page) {
    if (page._kind && page._kind === 'Page') {
      App._routes[route] = page;
      return Routes.routing();
    }
  };

  Routes.remove = function(route) {
    if (App._routes[route]) {
      return delete App._routes[route];
    }
  };

  Routes.routing = function() {
    var e, err, error_page, fireRoute, pageURL, path, regex, routeFound, routeName, test, _i, _len;
    path = App.pathname();
    fireRoute = function(name) {
      var routeFound, routeReturned, stop;
      if (App.Before && typeof App.Before === 'function') {
        stop = App.Before();
        if (stop === false) {
          return;
        }
      }
      routeFound = true;
      if (Utils.isFunction(App._routes[name])) {
        routeReturned = App._routes[name]();
      } else {
        routeReturned = App._routes[name];
      }
      if (routeReturned && routeReturned._kind === 'Page') {
        App.page = routeReturned;
      }
    };
    if (Utils.isFileUrl(App.location.href)) {
      err = 'Error: Project opened as a local file. Please set index.html as root / using a virtual server to use Routes.';
      alert(err);
      throw Error(err);
      return;
    }
    pageURL = path[0];
    routeFound = false;
    for (routeName in App._routes) {
      if (Utils.startsWith(routeName, '/')) {
        pageURL = '/' + path[0];
      }
      if (Utils.startsWith(routeName, 'match:')) {
        routeName = routeName.replace('match:', '');
        try {
          regex = new RegExp(routeName);
          test = regex.test(pageURL);
          if (!test) {
            test = regex.test('/' + path.join('/'));
          }
          if (test) {
            fireRoute('match:' + routeName);
            return;
          }
        } catch (_error) {
          e = _error;
          console.log('App: Invalid regex, ' + routeName);
        }
      } else if (routeName === pageURL || (pageURL === '' && (routeName === 'main' || routeName === 'index' || routeName === 'Main'))) {
        fireRoute(routeName);
        return;
      }
    }
    if (!routeFound) {
      error_page = ['default', '404', 'Default', 'defaults', 'Defaults'];
      for (_i = 0, _len = error_page.length; _i < _len; _i++) {
        err = error_page[_i];
        if (App._routes.hasOwnProperty(err)) {
          fireRoute(err);
        }
      }
    }
  };

  return Routes;

})(Element);
