var BuiltInDevices, Device, Devices, devicesConfiguations, devicesConfiguationsData, devicesShortcuts, item,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

devicesShortcuts = {
  iPad: "apple-ipad-air-space-gray",
  iPadSilver: "apple-ipad-air-silver",
  iPadGold: "apple-ipad-air-gold",
  iPadSpaceGray: "apple-ipad-air-space-gray",
  iPadMini: "apple-ipad-mini-space-gray",
  iPadMiniSilver: "apple-ipad-mini-silver",
  iPadMiniGold: "apple-ipad-mini-gold",
  iPadMiniSpaceGray: "apple-ipad-mini-space-gray",
  iPadPro: "apple-ipad-pro-space-gray",
  iPadProSilver: "apple-ipad-pro-silver",
  iPadProGold: "apple-ipad-pro-gold",
  iPadProSpaceGray: "apple-ipad-pro-space-gray",
  iPhone: "apple-iphone-7-black",
  iPhoneGold: "apple-iphone-7-gold",
  iPhoneRoseGold: "apple-iphone-7-rose-gold",
  iPhoneSilver: "apple-iphone-7-silver",
  iPhoneJetBlack: "apple-iphone-7-jet-black",
  iPhoneBlack: "apple-iphone-7-black",
  iPhone6: "apple-iphone-6s-space-gray",
  iPhone6Gold: "apple-iphone-6s-gold",
  iPhone6Gold: "apple-iphone-6s-rose-gold",
  iPhone6Gold: "apple-iphone-6s-silver",
  iPhone6Gold: "apple-iphone-6s-space-gray",
  iPhone6Plus: "apple-iphone-6s-plus-space-gray",
  iPhone6PlusGold: "apple-iphone-6s-plus-gold",
  iPhone6PlusGold: "apple-iphone-6s-plus-rose-gold",
  iPhone6PlusGold: "apple-iphone-6s-plus-silver",
  iPhone6PlusGold: "apple-iphone-6s-plus-space-gray",
  iPhone5S: "apple-iphone-5s-space-gray",
  iPhone5Gold: "apple-iphone-5s-gold",
  iPhone5Silver: "apple-iphone-5s-silver",
  iPhone5SpaceGray: "apple-iphone-5s-space-gray",
  iPhone5C: "apple-iphone-5c-blue",
  iPhone5CBlue: "apple-iphone-5c-blue",
  iPhone5CGreen: "apple-iphone-5c-green",
  iPhone5CRed: "apple-iphone-5c-red",
  iPhone5CWhite: "apple-iphone-5c-white",
  iPhone5CYellow: "apple-iphone-5c-yellow",
  appleWatch38NikePlusSilverAluminumFlatSilverVold: "apple-watch-nike-plus-38mm-silver-aluminum-flat-silver-volt",
  appleWatch38NikePlusSilverAluminumFlatSilverWhite: "apple-watch-nike-plus-38mm-silver-aluminum-flat-silver-white",
  appleWatch38NikePlusSpaceGrayAluminumBlackCoolGray: "apple-watch-nike-plus-38mm-space-gray-aluminum-black-cool-gray",
  appleWatch38NikePlusSpaceGrayAluminumBlackVold: "apple-watch-nike-plus-38mm-space-gray-aluminum-black-volt",
  appleWatch: "apple-watch-nike-plus-42mm-silver-aluminum-flat-silver-volt",
  appleWatch42NikePlusSilverAluminumFlatSilverVold: "apple-watch-nike-plus-42mm-silver-aluminum-flat-silver-volt",
  appleWatch42NikePlusSilverAluminumFlatSilverWhite: "apple-watch-nike-plus-42mm-silver-aluminum-flat-silver-white",
  appleWatch42NikePlusSpaceGrayAluminumBlackCoolGray: "apple-watch-nike-plus-42mm-space-gray-aluminum-black-cool-gray",
  appleWatch42NikePlusSpaceGrayAluminumBlackVold: "apple-watch-nike-plus-42mm-space-gray-aluminum-black-volt",
  nexus4: "google-nexus-4",
  nexus5: "google-nexus-5x",
  nexus6: "google-nexus-6p",
  pixel: "google-pixel-quite-black",
  pixelBlack: "google-pixel-quite-black",
  pixelBlue: "google-pixel-really-blue",
  pixelSilver: "google-pixel-very-silver",
  htcOneA9: "htc-one-a9-black",
  htcOneA9Black: "htc-one-a9-black",
  htcOneA9White: "htc-one-a9-white",
  htcOneM8: "htc-one-m8-black",
  htcOneM8Black: "htc-one-m8-black",
  htcOneM8Gold: "htc-one-m8-gold",
  htcOneM8Silver: "htc-one-m8-silver",
  lumia950: "microsoft-lumia-950-black",
  lumia950Black: "microsoft-lumia-950-black",
  lumia950White: "microsoft-lumia-950-white",
  galaxyNote5: "samsung-galaxy-note-5-black",
  galaxyNote5Black: "samsung-galaxy-note-5-black",
  galaxyNote5Gold: "samsung-galaxy-note-5-gold",
  galaxyNote5Pink: "samsung-galaxy-note-5-pink",
  galaxyNote5SilverTitanium: "samsung-galaxy-note-5-silver-titanium",
  galaxyNote5White: "samsung-galaxy-note-5-white",
  macbook: "apple-macbook",
  macbookAir: "apple-macbook-air",
  macbookPro: "apple-macbook-pro",
  iMac: "apple-imac"
};

devicesConfiguationsData = {
  iPadAir: ["tablet", 1856, 2608, 1536, 2048, 2],
  iPadMini: ["tablet", 1936, 2688, 1536, 2048, 2],
  iPadPro: ["tablet", 2448, 3432, 2048, 2732, 2],
  iPhone7: ["phone", 874, 1792, 750, 1334, 2],
  iPhone7Plus: ["phone", 1452, 2968, 1242, 2208, 3],
  iPhone6: ["phone", 874, 1792, 750, 1334, 2],
  iPhone6Plus: ["phone", 1452, 2968, 1242, 2208, 3],
  iPhone5: ["phone", 768, 1612, 640, 1136, 2],
  iPhone5C: ["phone", 776, 1620, 640, 1136, 2],
  Nexus4: ["phone", 860, 1668, 768, 1280, 2],
  Nexus5: ["phone", 1204, 2432, 1080, 1920, 3],
  Nexus6: ["phone", 1576, 3220, 1440, 2560, 3],
  Pixel: ["phone", 1224, 2492, 1080, 1920, 3],
  HTCa9: ["phone", 1252, 2592, 1080, 1920, 3],
  HTCm8: ["phone", 1232, 2572, 1080, 1920, 3],
  MSFTLumia950: ["phone", 1660, 3292, 1440, 2560, 3],
  SamsungGalaxyNote5: ["phone", 1572, 3140, 1440, 2560, 3],
  AppleWatch42: ["watch", 512, 990, 312, 390, 2],
  AppleWatch38: ["watch", 472, 772, 272, 340, 2],
  AppleMacBook: ["computer", 3084, 1860, 2304, 1440, 2],
  AppleMacBookAir: ["computer", 2000, 1220, 1440, 900, 1],
  AppleMacBookPro: ["computer", 3820, 2320, 2880, 1800, 2],
  AppleIMac: ["computer", 2800, 2940, 2560, 1440, 1]
};

devicesConfiguations = {};

for (item in devicesConfiguationsData) {
  devicesConfiguations[item] = {
    type: devicesConfiguationsData[item][0],
    imageWidth: devicesConfiguationsData[item][1],
    imageHeight: devicesConfiguationsData[item][2],
    screenWidth: devicesConfiguationsData[item][3],
    screenHeight: devicesConfiguationsData[item][4],
    screenDensity: devicesConfiguationsData[item][5]
  };
}

Devices = {
  "apple-ipad-air-silver": Utils.clone(devicesConfiguations.iPadAir),
  "apple-ipad-air-gold": Utils.clone(devicesConfiguations.iPadAir),
  "apple-ipad-air-space-gray": Utils.clone(devicesConfiguations.iPadAir),
  "apple-ipad-mini-silver": Utils.clone(devicesConfiguations.iPadMini),
  "apple-ipad-mini-gold": Utils.clone(devicesConfiguations.iPadMini),
  "apple-ipad-mini-space-gray": Utils.clone(devicesConfiguations.iPadMini),
  "apple-ipad-pro-silver": Utils.clone(devicesConfiguations.iPadPro),
  "apple-ipad-pro-gold": Utils.clone(devicesConfiguations.iPadPro),
  "apple-ipad-pro-space-gray": Utils.clone(devicesConfiguations.iPadPro),
  "apple-iphone-7-gold": Utils.clone(devicesConfiguations.iPhone7),
  "apple-iphone-7-rose-gold": Utils.clone(devicesConfiguations.iPhone7),
  "apple-iphone-7-silver": Utils.clone(devicesConfiguations.iPhone7),
  "apple-iphone-7-black": Utils.clone(devicesConfiguations.iPhone7),
  "apple-iphone-7-jet-black": Utils.clone(devicesConfiguations.iPhone7),
  "apple-iphone-7-plus-gold": Utils.clone(devicesConfiguations.iPhone7Plus),
  "apple-iphone-7-plus-rose-gold": Utils.clone(devicesConfiguations.iPhone7Plus),
  "apple-iphone-7-plus-silver": Utils.clone(devicesConfiguations.iPhone7Plus),
  "apple-iphone-7-plus-black": Utils.clone(devicesConfiguations.iPhone7Plus),
  "apple-iphone-7-plus-jet-black": Utils.clone(devicesConfiguations.iPhone7Plus),
  "apple-iphone-6s-gold": Utils.clone(devicesConfiguations.iPhone6),
  "apple-iphone-6s-rose-gold": Utils.clone(devicesConfiguations.iPhone6),
  "apple-iphone-6s-silver": Utils.clone(devicesConfiguations.iPhone6),
  "apple-iphone-6s-space-gray": Utils.clone(devicesConfiguations.iPhone6),
  "apple-iphone-6s-plus-gold": Utils.clone(devicesConfiguations.iPhone6Plus),
  "apple-iphone-6s-plus-rose-gold": Utils.clone(devicesConfiguations.iPhone6Plus),
  "apple-iphone-6s-plus-silver": Utils.clone(devicesConfiguations.iPhone6Plus),
  "apple-iphone-6s-plus-space-gray": Utils.clone(devicesConfiguations.iPhone6Plus),
  "apple-iphone-5s-gold": Utils.clone(devicesConfiguations.iPhone5),
  "apple-iphone-5s-silver": Utils.clone(devicesConfiguations.iPhone5),
  "apple-iphone-5s-space-gray": Utils.clone(devicesConfiguations.iPhone5),
  "apple-iphone-5c-blue": Utils.clone(devicesConfiguations.iPhone5C),
  "apple-iphone-5c-green": Utils.clone(devicesConfiguations.iPhone5C),
  "apple-iphone-5c-red": Utils.clone(devicesConfiguations.iPhone5C),
  "apple-iphone-5c-white": Utils.clone(devicesConfiguations.iPhone5C),
  "apple-iphone-5c-yellow": Utils.clone(devicesConfiguations.iPhone5C),
  "apple-watch-nike-plus-38mm-silver-aluminum-flat-silver-volt": Utils.clone(devicesConfiguations.AppleWatch38),
  "apple-watch-nike-plus-38mm-silver-aluminum-flat-silver-white": Utils.clone(devicesConfiguations.AppleWatch38),
  "apple-watch-nike-plus-38mm-space-gray-aluminum-black-cool-gray": Utils.clone(devicesConfiguations.AppleWatch38),
  "apple-watch-nike-plus-38mm-space-gray-aluminum-black-volt": Utils.clone(devicesConfiguations.AppleWatch38),
  "apple-watch-nike-plus-42mm-silver-aluminum-flat-silver-volt": Utils.clone(devicesConfiguations.AppleWatch42),
  "apple-watch-nike-plus-42mm-silver-aluminum-flat-silver-white": Utils.clone(devicesConfiguations.AppleWatch42),
  "apple-watch-nike-plus-42mm-space-gray-aluminum-black-cool-gray": Utils.clone(devicesConfiguations.AppleWatch42),
  "apple-watch-nike-plus-42mm-space-gray-aluminum-black-volt": Utils.clone(devicesConfiguations.AppleWatch42),
  "google-nexus-4": Utils.clone(devicesConfiguations.Nexus4),
  "google-nexus-5x": Utils.clone(devicesConfiguations.Nexus5),
  "google-nexus-6p": Utils.clone(devicesConfiguations.Nexus6),
  "google-pixel-quite-black": Utils.clone(devicesConfiguations.Pixel),
  "google-pixel-really-blue": Utils.clone(devicesConfiguations.Pixel),
  "google-pixel-very-silver": Utils.clone(devicesConfiguations.Pixel),
  "htc-one-a9-black": Utils.clone(devicesConfiguations.HTCa9),
  "htc-one-a9-white": Utils.clone(devicesConfiguations.HTCa9),
  "htc-one-m8-black": Utils.clone(devicesConfiguations.HTCm8),
  "htc-one-m8-gold": Utils.clone(devicesConfiguations.HTCm8),
  "htc-one-m8-silver": Utils.clone(devicesConfiguations.HTCm8),
  "microsoft-lumia-950-black": Utils.clone(devicesConfiguations.MSFTLumia950),
  "microsoft-lumia-950-white": Utils.clone(devicesConfiguations.MSFTLumia950),
  "samsung-galaxy-note-5-black": Utils.clone(devicesConfiguations.SamsungGalaxyNote5),
  "samsung-galaxy-note-5-gold": Utils.clone(devicesConfiguations.SamsungGalaxyNote5),
  "samsung-galaxy-note-5-pink": Utils.clone(devicesConfiguations.SamsungGalaxyNote5),
  "samsung-galaxy-note-5-silver-titanium": Utils.clone(devicesConfiguations.SamsungGalaxyNote5),
  "samsung-galaxy-note-5-white": Utils.clone(devicesConfiguations.SamsungGalaxyNote5),
  "apple-macbook": Utils.clone(devicesConfiguations.AppleMacBook),
  "apple-macbook-air": Utils.clone(devicesConfiguations.AppleMacBookAir),
  "apple-macbook-pro": Utils.clone(devicesConfiguations.AppleMacBookPro),
  "apple-imac": Utils.clone(devicesConfiguations.AppleIMac)
};

BuiltInDevices = Utils.keys(Devices);

Device = (function(_super) {
  __extends(Device, _super);

  function Device(options) {
    var that;
    if (options == null) {
      options = {};
    }
    this._orientationChange = __bind(this._orientationChange, this);
    this._viewportOrientationOffset = __bind(this._viewportOrientationOffset, this);
    this._updateDeviceImage = __bind(this._updateDeviceImage, this);
    this._update = __bind(this._update, this);
    Device.__super__.constructor.apply(this, arguments);
    if (Utils.isMobile()) {
      return;
    }
    this._setup();
    this.height = '100%';
    that = this;
    App.onResize(function() {
      if (!Utils.isMobile()) {
        return that._update();
      } else {
        return that._orientationChange();
      }
    });
  }

  Device.prototype._kind = 'Device';

  Device.prototype._device = {};

  Device.prototype._type = NULL;

  Device.prototype._setupDone = false;

  Device.prototype._contentScale = 1;

  Device.prototype._orientation = 0;

  Device.prototype.phone = {};

  Device.prototype.isLandscape = false;

  Device.define("screenSize", {
    get: function() {
      var size;
      if (this.isLandscape) {
        return size = {
          width: this._device.screenHeight,
          height: this._device.screenWidth
        };
      } else {
        return size = {
          width: this._device.screenWidth,
          height: this._device.screenHeight
        };
      }
    }
  });

  Device.define("type", {
    get: function() {
      return this._type;
    },
    set: function(type) {
      var device, key, lKey, ltype, shouldZoomToFit, _i, _len, _ref;
      device = null;
      if (Utils.isMobile()) {
        return;
      }
      if (Utils.isString(type)) {
        ltype = type.toLowerCase();
        _ref = Utils.keys(Devices);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          key = _ref[_i];
          lKey = key.toLowerCase();
          if (ltype === lKey) {
            device = Devices[key];
          }
        }
      }
      if (!device) {
        throw Error("No device named " + type + ". Options are: " + (Utils.keys(Devices)));
      }
      if (this._device === device) {
        return;
      }
      shouldZoomToFit = this._type === "fullscreen";
      this.screen.backgroundColor = "black";
      if (device.backgroundColor != null) {
        this.screen.backgroundColor = device.backgroundColor;
      }
      if (device.type === "computer") {
        Utils.domComplete(function() {
          return document.body.style.cursor = "auto";
        });
      }
      this._device = Utils.clone(device);
      this._type = type;
      this.fullscreen = false;
      if (this._device.screenDensity) {
        this.contentScale = this._device.screenDensity;
      } else {
        this.contentScale = this._device.screenDensity;
      }
      this._updateDeviceImage();
      this.emit("change:type");
      this.viewport.point = this._viewportOrientationOffset();
      if (shouldZoomToFit) {
        this.deviceScale = "fit";
      }
      return this._update();
    }
  });

  Device.define("deviceScale", {
    get: function() {
      return this._deviceScale || 1;
    },
    set: function(deviceScale) {
      return this.setDeviceScale(deviceScale, false);
    }
  });

  Device.prototype.setDeviceScale = function(deviceScale, animate) {
    var phoneScale;
    if (animate == null) {
      animate = false;
    }
    if (deviceScale === "fit" || deviceScale < 0) {
      deviceScale = "fit";
    } else {
      deviceScale = parseFloat(deviceScale);
    }
    if (deviceScale === this._deviceScale) {
      return;
    }
    this._deviceScale = deviceScale;
    if (deviceScale === "fit") {
      phoneScale = this._calculatePhoneScale();
    } else {
      phoneScale = deviceScale;
    }
    return this.emit("change:deviceScale");
  };

  Device.define("contentScale", {
    get: function() {
      return this._contentScale || 1;
    },
    set: function(contentScale) {
      return this.setContentScale(contentScale, false);
    }
  });

  Device.prototype.setContentScale = function(contentScale, animate) {
    if (animate == null) {
      animate = false;
    }
    contentScale = parseFloat(contentScale);
    if (contentScale <= 0) {
      return;
    }
    if (contentScale === this._contentScale) {
      return;
    }
    this._contentScale = contentScale;
    if (animate) {
      this.content.animate(Utils.extend(this.animationOptions, {
        properties: {
          scale: this._contentScale
        }
      }));
    } else {
      this.content.scale = this._contentScale;
    }
    this._update();
    return this.emit("change:contentScale");
  };

  Device.define("orientation", {
    get: function() {
      if (Utils.isMobile()) {
        return window.orientation;
      }
      return this._orientation || 0;
    },
    set: function(orientation) {
      return this.setOrientation(orientation, false);
    }
  });

  Device.prototype.setOrientation = function(orientation, animate) {
    var contentProperties, phoneProperties;
    if (animate == null) {
      animate = false;
    }
    if (orientation === "portrait") {
      orientation = 0;
    }
    if (orientation === "landscape") {
      orientation = 90;
    }
    orientation = parseInt(orientation);
    if (orientation !== 0 && orientation !== 90 && orientation !== (-90)) {
      return;
    }
    if (orientation === this._orientation) {
      return;
    }
    this._orientation = orientation;
    phoneProperties = {
      rotationZ: -this._orientation,
      scale: this._calculatePhoneScale()
    };
    contentProperties = this._viewportOrientationOffset();
    this.viewport.animateStop();
    if (animate) {
      this.viewport.animate(Utils.extend(this.animationOptions, {
        properties: contentProperties
      }));
      animation.on(Event.AnimationEnd, (function(_this) {
        return function() {
          return _this._update();
        };
      })(this));
    } else {
      this.viewport.props = contentProperties;
      this._update();
    }
    return this.emit("change:orientation", this._orientation);
  };

  Device.define("isPortrait", {
    get: function() {
      return Math.abs(this.orientation) % 180 === 0;
    }
  });

  Device.define("isLandscape", {
    get: function() {
      return !this.isPortrait;
    }
  });

  Device.define("orientationName", {
    get: function() {
      if (this.isPortrait) {
        return "portrait";
      }
      if (this.isLandscape) {
        return "landscape";
      }
    },
    set: function(orientationName) {
      return this.setOrientation(orientationName, false);
    }
  });

  Device.prototype.rotateLeft = function(animate) {
    if (animate == null) {
      animate = true;
    }
    if (this.orientation === 90) {
      return;
    }
    return this.setOrientation(this.orientation + 90, animate);
  };

  Device.prototype.rotateRight = function(animate) {
    if (animate == null) {
      animate = true;
    }
    if (this.orientation === -90) {
      return;
    }
    return this.setOrientation(this.orientation - 90, animate);
  };

  Device.prototype._setup = function() {
    var view, _i, _len, _ref;
    if (this._setupDone) {
      return;
    }
    this._setupDone = true;
    this.background = new View({
      parent: this
    });
    this.background.clip = true;
    this.background.backgroundColor = "transparent";
    this.background.classList.add("DeviceBackground");
    this.hands = new View({
      parent: this
    });
    this.phone = new View({
      parent: this.hands
    });
    this.screen = new View({
      parent: this.phone
    });
    this.viewport = new View({
      parent: this.screen
    });
    this.content = new View({
      parent: this.viewport
    });
    this.hands.backgroundColor = "transparent";
    this.phone.backgroundColor = "transparent";
    this.phone.classList.add("DevicePhone");
    this.screen.classList.add("DeviceScreen");
    this.screen.clip = true;
    this.viewport.backgroundColor = "transparent";
    this.viewport.classList.add("DeviceComponentPort");
    this.content.backgroundColor = "transparent";
    this.content.classList.add("DeviceContent");
    this.content.originX = 0;
    this.content.originY = 0;
    _ref = [this.background, this.phone, this.viewport, this.content, this.screen];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      view = _ref[_i];
      view.on("touchmove", function(event) {
        return event.preventDefault();
      });
    }
    this._context = new Context({
      parent: this.content,
      name: "DeviceScreen"
    });
    this._context.perspective = 1200;
    return this._context.device = this;
  };

  Device.prototype._update = function() {
    var backgroundOverlap, contentScaleFactor, height, width, _ref;
    contentScaleFactor = this.contentScale;
    backgroundOverlap = 100;
    this.background.x = 0 - backgroundOverlap;
    this.background.y = 0 - backgroundOverlap;
    this.background.width = window.innerWidth + (2 * backgroundOverlap);
    this.background.height = window.innerHeight + (2 * backgroundOverlap);
    this._updateDeviceImage();
    this.hands.scale = this._calculatePhoneScale();
    this.hands.center();
    this.phone.center();
    _ref = this._getOrientationDimensions(this._device.screenWidth / contentScaleFactor, this._device.screenHeight / contentScaleFactor), width = _ref[0], height = _ref[1];
    this.screen.width = this.viewport.width = this._device.screenWidth;
    this.screen.height = this.viewport.height = this._device.screenHeight;
    this.content.width = width;
    this.content.height = height;
    return this.screen.center();
  };

  Device.prototype._updateDeviceImage = function() {
    this.phone.image = this._imageUrl(this._imageName());
    this.phone.width = this._device.imageWidth;
    this.phone.height = this._device.imageHeight;
    this.hands.width = this.phone.width;
    return this.hands.height = this.phone.height;
  };

  Device.prototype._imageName = function() {
    if (this._device.hasOwnProperty("image")) {
      return this._device.image;
    }
    return "" + this._type + ".png";
  };

  Device.prototype._calculatePhoneScale = function() {
    var height, paddingOffset, phoneScale, width, _ref, _ref1;
    _ref = this._getOrientationDimensions(this.phone.width, this.phone.height), width = _ref[0], height = _ref[1];
    paddingOffset = ((_ref1 = this._device) != null ? _ref1.paddingOffset : void 0) || 0;
    phoneScale = Utils.min([(window.innerWidth - ((this.padding.left + this.padding.right + paddingOffset) * 2)) / width, (window.innerHeight - ((this.padding.top + this.padding.bottom + paddingOffset) * 2)) / height]);
    if (phoneScale > 1) {
      phoneScale = 1;
    }
    this.emit("change:phoneScale", phoneScale);
    if (this._deviceScale && this._deviceScale !== "fit") {
      return this._deviceScale;
    }
    return phoneScale;
  };

  Device.prototype._viewportOrientationOffset = function() {
    var contentProperties, height, offset, width, x, y, _ref, _ref1;
    _ref = this._getOrientationDimensions(this._device.screenWidth, this._device.screenHeight), width = _ref[0], height = _ref[1];
    this.content.width = width / 2;
    this.content.height = height / 2;
    offset = (this.screen.width - width) / 2;
    if (this._orientation === -90) {
      offset *= -1;
    }
    _ref1 = [0, 0], x = _ref1[0], y = _ref1[1];
    if (this.isLandscape) {
      x = offset;
      y = offset;
    }
    return contentProperties = {
      rotationZ: this._orientation,
      x: x,
      y: y
    };
  };

  Device.prototype._orientationChange = function() {
    this._orientation = window.orientation;
    this._update();
    return this.emit("change:orientation", window.orientation);
  };

  Device.prototype._getOrientationDimensions = function(width, height) {
    if (this.isLandscape) {
      return [height, width];
    } else {
      return [width, height];
    }
  };

  Device.prototype._imageUrl = function(name) {
    var resourceUrl, _ref;
    if (!name) {
      return null;
    }
    if (Utils.startsWith(name, "http://") || Utils.startsWith(name, "https://")) {
      return name;
    }
    if ((_ref = this._type, __indexOf.call(BuiltInDevices, _ref) < 0) || this._type === "custom") {
      return name;
    }
    resourceUrl = "//s3.amazonaws.com/data.magixjs.com/static/devices";
    if (Utils.isFileUrl(window.location.href)) {
      resourceUrl = "http:" + resourceUrl;
    }
    return "" + resourceUrl + "/" + name;
  };

  Device.prototype.toInspect = function() {
    return "<Device '" + this.type + "' " + this.screenSize.width + "x" + this.screenSize.height + ">";
  };

  return Device;

})(View);

for (item in devicesShortcuts) {
  Device[item] = devicesShortcuts[item];
}
