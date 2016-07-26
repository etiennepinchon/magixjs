var VR = function(parameters) {
    
  if (parameters == undefined) {
    parameters = {};
  };

  if(!navigator.getVRDevices) {
    log('VR: WebVR API not supported by this browser.');

    if (properties.unsupported) {
      properties.unsupported();
    }
    return false;
  }

  navigator.getVRDevices().then(function(myDevices) {
    this.devices = myDevices;     
  });
};