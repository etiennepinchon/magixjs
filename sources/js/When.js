
/*
Example:

viewB = new Text
	text: 'lol'
	fontSize: 64
	color: 'black'
	parent: viewA

Below Phone, [
	view: viewA
	properties:
		width: 40
		bc: 'blue'
,
	view: viewB
	properties:
		fontSize: 12
		color: 'red'
]


Below Mobile, viewA,
	width: 100
	bc: 'purple'

Below Mobile, viewB,
	fontSize: 40

Above Mobile, viewB,
	backgroundColor: 'green'
 */
var Above, Below, Desktop, Mobile, Netbook, Phone, QHD, Screen, TV, Tablet, UHD, Watch, When;

Watch = 'Watch';

Mobile = 'Mobile';

Phone = 'Phone';

Tablet = 'Tablet';

Netbook = 'Netbook';

Desktop = 'Desktop';

TV = 'TV';

QHD = 'QHD';

UHD = 'UHD';

When = function(direction, def, actions) {
  var action, arr, key, keys, responsives, _i, _j, _k, _len, _len1, _len2;
  direction = Utils.capitalizeFirst(direction);
  responsives = {};
  if (arguments[3] && Utils.isObject(arguments[3])) {
    actions = {
      view: arguments[2],
      properties: arguments[3]
    };
  }
  if (Utils.isObject(actions) && !Utils.isArray(actions)) {
    actions = [actions];
  }
  for (_i = 0, _len = actions.length; _i < _len; _i++) {
    action = actions[_i];
    if (action.view && action.properties) {
      if (!action.view._originalValues) {
        action.view._originalValues = {};
        keys = Object.keys(action.properties);
        for (_j = 0, _len1 = keys.length; _j < _len1; _j++) {
          key = keys[_j];
          if (key in action.view) {
            action.view._originalValues[key] = action.view[key];
          }
        }
      } else {
        arr = [];
        keys = Object.keys(action.properties);
        for (_k = 0, _len2 = keys.length; _k < _len2; _k++) {
          key = keys[_k];
          if (key in action.view) {
            arr[key] = action.view[key];
          }
        }
        action.view._originalValues = Utils.defaults(action.view._originalValues, arr);
      }
      if (!action.view['_' + direction + def]) {
        action.view['_' + direction + def] = {};
      }
      action.view['_' + direction + def] = Utils.extend(action.view['_' + direction + def], action.properties);
      App._responsives[action.view.id] = action.view;
      responsives[action.view.id] = action.view;
    }
  }
  return App._updateResponsives(responsives);
};

App.when = When;

Below = function(def, actions, optional) {
  return When('below', def, actions, optional);
};

Above = function(def, actions, optional) {
  return When('above', def, actions, optional);
};

Screen = {
  definitions: {
    Watch: 0,
    Mobile: 320,
    Phone: 480,
    Tablet: 760,
    Netbook: 960,
    Desktop: 1200,
    TV: 1600,
    QHD: 1980,
    UHD: 2600
  },
  below: [UHD, QHD, TV, Desktop, Netbook, Tablet, Phone, Mobile, Watch],
  above: [Watch, Mobile, Phone, Tablet, Netbook, Desktop, TV, QHD, UHD]
};

App._updateResponsivesStates = function() {
  var definition;
  Below.states = {
    Watch: false,
    Mobile: false,
    Phone: false,
    Tablet: false,
    Netbook: false,
    UHD: false,
    QHD: false,
    TV: false,
    Desktop: false
  };
  Above.states = {
    Watch: false,
    Mobile: false,
    Phone: false,
    Tablet: false,
    Netbook: false,
    UHD: false,
    QHD: false,
    TV: false,
    Desktop: false
  };
  for (definition in Screen.definitions) {
    if (App.width >= Screen.definitions[definition]) {
      Above.states[definition] = true;
    }
    if (App.width <= Screen.definitions[definition]) {
      Below.states[definition] = true;
    }
  }
  if (!App.page) {
    return;
  }
  App._updateResponsives(App._responsives);
};

App._updateResponsives = function(responsives) {
  var def, definition, props, view, viewID, _i, _j, _len, _len1, _ref, _ref1;
  for (viewID in responsives) {
    view = responsives[viewID];
    props = {};
    _ref = Screen.below;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      definition = _ref[_i];
      def = Utils.capitalizeFirst(definition);
      if (view['_Below' + def] && Below.states[def] === true) {
        props = Utils.extend(props, view['_Below' + def]);
      }
    }
    _ref1 = Screen.above;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      definition = _ref1[_j];
      def = Utils.capitalizeFirst(definition);
      if (view['_Above' + def] && Above.states[def] === true) {
        props = Utils.extend(props, view['_Above' + def]);
      }
    }
    view.props = view._originalValues;
    view.props = props;
  }
};
