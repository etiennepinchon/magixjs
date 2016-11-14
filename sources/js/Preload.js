var Preload;

Preload = function(urls, callback) {
  var i, img, loaded, path, paths, _i, _j, _len, _len1;
  if (!urls) {
    return;
  }
  if (Utils.isString(urls)) {
    urls = [urls];
  }
  paths = [];
  loaded = 0;
  i = 0;
  for (_i = 0, _len = urls.length; _i < _len; _i++) {
    path = urls[_i];
    paths.push({
      image: path,
      loaded: false
    });
  }
  for (_j = 0, _len1 = paths.length; _j < _len1; _j++) {
    path = paths[_j];
    if (!path.loaded) {
      path.loaded = true;
      img = new Image({
        source: path.image,
        display: false
      });
      img.parent = null;
      img.on(Event.Load, function(event, view) {
        var progress;
        loaded++;
        progress = 100 * loaded / paths.length;
        App.emit(Event.PreloadProgress, {
          images: paths,
          current: view.image,
          progress: progress
        });
        if (loaded === paths.length) {
          App.emit(Event.PreloadEnd);
          if (callback) {
            callback();
          }
        }
      });
    }
  }
};
