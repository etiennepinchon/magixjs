var CSS, Debounce, Delay, FadeIn, FadeOut, Gradient, Hide, Interval, Show, Throttle;

Delay = Utils.delay;

Interval = Utils.interval;

Debounce = Utils.debounce;

Throttle = Utils.throttle;

FadeIn = function(view, options) {
  return view.fadeIn(options);
};

FadeOut = function(view, options) {
  return view.fadeIn(options);
};

Show = function(view) {
  return view.show();
};

Hide = function(view) {
  return view.hide();
};

CSS = Utils.insertCSS;

Gradient = Color.gradient;
