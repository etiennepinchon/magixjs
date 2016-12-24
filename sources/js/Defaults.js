var Defaults, NULL, Originals;

NULL = void 0;

Originals = {
  View: {
    width: 200,
    height: 200,
    backgroundColor: 'rgba(123,123,123,0.5)'
  },
  Page: {
    x: 0,
    y: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  },
  Transition: {
    properties: {},
    time: 0.3,
    delay: 0,
    view: null,
    curve: 'ease'
  },
  ViewDraggable: {
    momentum: true,
    momentumOptions: {
      friction: 2.1,
      tolerance: 1
    },
    bounce: true,
    bounceOptions: {
      friction: 40,
      tension: 200,
      tolerance: 1
    },
    directionLock: false,
    directionLockThreshold: {
      x: 10,
      y: 10
    },
    overdrag: true,
    overdragScale: 0.5,
    pixelAlign: true,
    velocityTimeout: 100,
    velocityScale: 890
  },
  Animation: {
    view: null,
    delay: 0,
    curve: 'ease',
    curveOptions: {},
    time: 0.3,
    repeat: 0,
    properties: {}
  },
  FrictionSimulator: {
    friction: 2,
    tolerance: 1 / 10
  },
  SpringSimulator: {
    tension: 500,
    friction: 10,
    tolerance: 1 / 10000
  },
  MomentumBounceSimulator: {
    momentum: {
      friction: 2,
      tolerance: 10
    },
    bounce: {
      tension: 500,
      friction: 10,
      tolerance: 1
    }
  },
  Context: {
    perspective: 0,
    perspectiveOriginX: 0.5,
    perspectiveOriginY: 0.5,
    parent: null,
    name: null
  },
  Pview: {
    width: 300
  },
  TextField: {
    padding: 8,
    width: 300,
    fontSize: 16,
    backgroundColor: 'rgba(123,123,123,0.5)',
    borderWidth: 0,
    color: 'white',
    spacing: 0.6,
    userInteraction: true
  },
  TextView: {
    padding: 8,
    width: 300,
    height: 64,
    fontSize: 16,
    scrollVertical: true,
    backgroundColor: 'rgba(123,123,123,0.5)',
    borderWidth: 0,
    color: 'white',
    spacing: 0.6,
    resize: false,
    userInteraction: true
  },
  WebView: {
    width: 400,
    height: 300
  },
  Slider: {
    width: 200,
    height: 200,
    backgroundColor: 'rgba(123,123,123,0.5)'
  },
  ProgressBar: {},
  Dropdown: {
    __width: {
      w: 200,
      width: 200
    }
  },
  List: {},
  ListItem: {},
  Image: {},
  Text: {
    clip: false,
    width: '100%',
    align: 'left',
    userInteraction: false,
    display: 'table'
  },
  Link: {
    width: '100%',
    align: 'center',
    display: 'block',
    color: 'black',
    userInteraction: false
  },
  FileField: {
    padding: {
      x: 12,
      y: 10
    }
  },
  Checkbox: {
    Text: {
      display: 'inline-block',
      cursor: 'pointer',
      margin: {
        left: 3
      },
      color: '#333',
      fontSize: 13
    }
  },
  RadioButton: {
    Text: {
      display: 'inline-block',
      cursor: 'pointer',
      marginLeft: 4,
      color: '#333',
      fontSize: 13
    }
  },
  Button: {
    display: 'block',
    padding: {
      x: 20,
      y: 8
    },
    margin: 0,
    fontSize: 14,
    backgroundColor: 'rgba(123,123,123,0.5)',
    color: 'white',
    borderWidth: 0,
    cursor: 'pointer',
    userInteraction: false,
    borderBox: true
  },
  Canvas: {
    width: 200,
    height: 200,
    backgroundColor: 'rgba(123,123,123,0.5)'
  }
};


/*	
	ScrollView: 
		width: 400
		height: 300
		mouseWheel: true
		
	Cards: 
		width: 400
		height: 300
		mouseWheel: false
 */

Defaults = {
  set: function(className, options) {
    if (App.defaults.hasOwnProperty(className)) {
      return App.defaults[className] = Utils.extend(App.defaults[className], options);
    } else {
      return App.defaults[className] = options;
    }
  },
  getDefaults: function(className, options) {
    var defaults, item;
    if (!App.defaults.hasOwnProperty(className)) {
      return options;
    }
    defaults = Utils.clone(App.defaults[className]);
    for (item in options) {
      if (defaults.hasOwnProperty(item)) {
        delete defaults[item];
      }
    }
    return [defaults, options];
  },
  get: function(className, options) {
    var defaults, k, v, _ref;
    if (!App.defaults.hasOwnProperty(className)) {
      return {};
    }
    defaults = Utils.clone(App.defaults[className]);
    _ref = App.defaults[className];
    for (k in _ref) {
      v = _ref[k];
      defaults[k] = Utils.isFunction(v) ? v() : v;
    }
    for (k in options) {
      v = options[k];
      defaults[k] = v;
    }
    return defaults;
  },
  setup: function() {
    var className, classValues, k, v, _ref;
    if (App.defaults) {
      _ref = App.defaults;
      for (className in _ref) {
        classValues = _ref[className];
        for (k in classValues) {
          v = classValues[k];
          Originals[className][k] = v;
        }
      }
    }
    return Defaults.reset();
  },
  reset: function() {
    return App.defaults = Utils.clone(Originals);
  }
};
