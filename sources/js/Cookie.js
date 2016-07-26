var Cookie;

Cookie = {
  set: function(cname, cvalue, exdays) {
    var c, c_value, d, exdate, expires;
    d = new Date;
    d.setTime(d.getTime() + -1 * 24 * 60 * 60 * 1000);
    expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + '' + '; ' + expires + '; ' + 'path=/';
    if (exdays === void 0) {
      exdays = 365;
    }
    exdate = new Date;
    exdate.setDate(exdate.getDate() + exdays);
    c_value = encodeURI(cvalue) + (exdays === null ? '' : '; expires=' + exdate.toUTCString());
    c = cname + '=' + c_value + ';path=/';
    document.cookie = c;
  },
  get: function(cname) {
    var c, ca, i, name, string;
    name = cname + '=';
    ca = document.cookie.split(';');
    i = 0;
    while (i < ca.length) {
      c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        string = decodeURI(c.substring(name.length, c.length));
        if (string === 'false' || string === 'true') {
          string = JSON.parse(string);
        }
        return string;
      }
      i++;
    }
    return void 0;
  },
  remove: function(name) {
    var d, expires;
    d = new Date;
    d.setTime(d.getTime() + -1 * 24 * 60 * 60 * 1000);
    expires = 'expires=' + d.toUTCString();
    document.cookie = name + '=' + '' + '; ' + expires + '; ' + 'path=/';
  }
};
