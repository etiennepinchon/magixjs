
/*
function setCustomFOV(up,right,down,left) {
  var testFOV = new VRFieldOfView(up,right,down,left);

  gHMD.setFieldOfView(testFOV,testFOV,0.01,10000.0);
}

 * ALIAS ?
that.display.name = that.display.deviceName if that.display.deviceName
that.display.unitId = that.display.hardwareUnitId if that.display.hardwareUnitId
that.display.id = that.display.deviceId if that.display.deviceId

that.sensor.name = that.sensor.deviceName if that.sensor.deviceName
that.sensor.unitId = that.sensor.hardwareUnitId if that.sensor.hardwareUnitId
that.sensor.id = that.sensor.deviceId if that.sensor.deviceId
 */
var VR,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

VR = (function(_super) {
  __extends(VR, _super);

  VR.prototype.devices = [];

  VR.prototype.sensor = null;

  VR.prototype.display = null;

  VR.prototype._kind = 'VR';

  VR.prototype.onUnsupported = function(cb) {
    return this.on(Event.Unsupported, cb);
  };

  VR.prototype.onDisplayConnected = function(cb) {
    return this.on(Event.DisplayConnected, cb);
  };

  VR.prototype.onDisplayDisconnected = function(cb) {
    return this.on(Event.DisplayDisconnected, cb);
  };

  function VR(options) {
    var that;
    if (!options) {
      options = {};
    }
    if (!navigator.getVRDevices) {
      console.log('VR: WebVR API not supported by this browser.');
      this.emit(Event.Unsupported);
      if (options.unsupported) {
        options.unsupported();
      }
      return false;
    }
    that = this;
    Event.wrap(window).addEventListener('onvrdisplayconnected', function() {
      if (properties.displayConnected) {
        properties.displayConnected();
      }
      that.emit(Event.DisplayConnected);
    });
    Event.wrap(window).addEventListener('onvrdisplaydisconnected', function() {
      if (properties.displayDisconnected) {
        properties.displayDisconnected();
      }
      that.emit(Event.DisplayDisconnected);
    });
    return;
  }

  VR.prototype.getDevices = function(fn) {
    var that;
    that = this;
    return navigator.getVRDevices().then(function(myDevices) {
      var device, _i, _j, _len, _len1, _ref, _ref1;
      that.devices = myDevices;
      _ref = that.devices;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        device = _ref[_i];
        if (device instanceof HMDVRDevice) {
          that.display = device;
          break;
        }
      }
      if (!that.display) {
        console.log('VR: No display found.');
        if (fn) {
          fn();
        }
        return;
      }
      _ref1 = that.devices;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        device = _ref1[_j];
        if (device instanceof PositionSensorVRDevice && device.hardwareUnitId === that.display.unitId) {
          that.sensor = device;
          break;
        }
      }
      if (fn) {
        fn();
      }
    });
  };

  return VR;

})(Element);
