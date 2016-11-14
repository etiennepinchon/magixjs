var Font, Fonts;

App._WebFontLoad = false;

App._WebFontLoaded = false;

App._fonts = [];

App._fontsCollection = [];

App.WebFontConfig = {
  google: {
    families: []
  }
};

App._googleFont = [];

App._googleFontTmp = [];

Font = (function() {
  Font.prototype._kind = 'Font';

  function Font(font, weight) {
    if (Utils.isString(font)) {
      font = {
        name: font
      };
    }
    if (Utils.isObject(font) && Utils.isString(weight)) {
      font.weight = weight;
    }
    return Fonts(font);
  }

  return Font;

})();

Fonts = function() {
  var google_previous_call;
  google_previous_call = Utils.clone(App._googleFont);
  App._googleFont = [];
  Fonts._updateFonts(arguments);
  if (App._fontsCollection.length > 0) {
    App.fontName = App._fontsCollection[0].name;
  }
  if (Utils.isEqual(google_previous_call, App._googleFont)) {
    return;
  }
  if (App._googleFont.length > 0) {
    if (App._WebFontLoad === false) {
      App._WebFontLoad = true;
      App.WebFontConfig.google.families = Utils.mergeArray(App.WebFontConfig.google.families, App._googleFont);
      return Utils.domLoadScript(('https:' === document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js', function() {
        App._WebFontLoaded = true;
        if (!App._googleFontTmp.length) {
          return;
        }
        App.WebFontConfig.google.families = App._googleFontTmp;
        return App.WebFont.load(App.WebFontConfig);
      });
    } else {
      if (App._WebFontLoaded) {
        App.WebFontConfig.google.families = Utils.mergeArray(App.WebFontConfig.google.families, App._googleFont);
        return App.WebFont.load(App.WebFontConfig);
      } else {
        return App._googleFontTmp = Utils.mergeArray(App._googleFontTmp, App._googleFont);
      }
    }
  }
};

Fonts.getInstalled = function() {
  return App._fonts;
};

Fonts._updateFonts = function(fonts) {
  var font, fontDetector, fontName, i, parseGoogleFontObject, _results;
  parseGoogleFontObject = function(googleObj) {
    if (!googleObj.name) {
      return '';
    } else {
      googleObj._name = googleObj.name.split(' ').join('+');
    }
    if (!googleObj.weight) {
      googleObj.weight = '400';
    }
    if (!googleObj.sets) {
      googleObj.sets = 'latin';
    }
    return googleObj._name + ':' + googleObj.weight + ':' + googleObj.sets;
  };
  if (!fonts) {
    return;
  }
  fontDetector = new Fonts._fontDetector;
  if (Utils.isString(fonts)) {
    fonts = [fonts];
  }
  if (Utils.isObject(fonts) && fonts.name) {
    fontName = fonts.name.replace(/\s+/g, '');
    App._fonts[fontName] = fonts.name;
    App._fontsCollection.push(fonts);
    if (!fontDetector.detect(fonts.name)) {
      return App._googleFont.push(parseGoogleFontObject(fonts));
    }
  } else if (Utils.isArray(fonts) || Utils.isObject(fonts)) {
    i = 0;
    _results = [];
    while (i < fonts.length) {
      if (typeof fonts[i] === 'string') {
        fontName = fonts[i].replace(/\s+/g, '');
        font = {
          name: fonts[i]
        };
        App._fonts[fontName] = fonts[i];
        App._fontsCollection.push(font);
        if (!fontDetector.detect(fonts[i])) {
          App._googleFont.push(parseGoogleFontObject(font));
        }
      }
      if (Utils.isObject(fonts[i]) && fonts[i].name) {
        fontName = fonts[i].name.replace(/\s+/g, '');
        font = fonts[i];
        App._fonts[fontName] = fonts[i].name;
        App._fontsCollection.push(font);
        if (!fontDetector.detect(fonts[i].name)) {
          App._googleFont.push(parseGoogleFontObject(fonts[i]));
        }
      }
      _results.push(i++);
    }
    return _results;
  }
};

Fonts._fontDetector = function() {
  var baseFonts, defaultHeight, defaultWidth, detect, h, index, s, testSize, testString;
  baseFonts = ['monospace', 'sans-serif', 'serif'];
  testString = 'mmmmmmmmmmlli';
  testSize = '72px';
  h = document.getElementsByTagName('body')[0];
  s = document.createElement('span');
  detect = function(font) {
    var detected, index, matched;
    detected = false;
    for (index in baseFonts) {
      s.style.fontFamily = font + ',' + baseFonts[index];
      h.appendChild(s);
      matched = s.offsetWidth !== defaultWidth[baseFonts[index]] || s.offsetHeight !== defaultHeight[baseFonts[index]];
      h.removeChild(s);
      detected = detected || matched;
    }
    return detected;
  };
  s.style.fontSize = testSize;
  s.innerHTML = testString;
  defaultWidth = {};
  defaultHeight = {};
  for (index in baseFonts) {
    s.style.fontFamily = baseFonts[index];
    h.appendChild(s);
    defaultWidth[baseFonts[index]] = s.offsetWidth;
    defaultHeight[baseFonts[index]] = s.offsetHeight;
    h.removeChild(s);
  }
  this.detect = detect;
};
