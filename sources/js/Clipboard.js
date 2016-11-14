var Clipboard;

Clipboard = {
  cut: function() {
    document.execCommand('Cut');
  },
  copy: function(text) {
    var detectIE, textField;
    detectIE = function() {
      var edge, msie, rv, trident, ua;
      ua = window.navigator.userAgent;
      msie = ua.indexOf('MSIE ');
      if (msie > 0) {
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
      }
      trident = ua.indexOf('Trident/');
      if (trident > 0) {
        rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
      }
      edge = ua.indexOf('Edge/');
      if (edge > 0) {
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
      }
      return false;
    };
    if (text) {
      document.execCommand('Copy');
      return;
    }
    if (detectIE()) {
      window.clipboardData.setData('Text', text);
    }
    textField = document.createElement('textarea');
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    if (window.clipboardData) {
      window.clipboardData.setData('Text', copytext);
    }
    textField.remove();
  }
};
