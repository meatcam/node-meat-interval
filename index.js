var Interval = function(capturer, poster) {
  var interval = 0;
  var message = '';
  var timer = -1;
  var startTime;

  function send() {
    startTime = Date.now();
    capturer.capture(function(err, gif) {
      if (err) throw err;
      poster.send(message, gif, function(err) {
        var elapsed = Date.now() - startTime;
        if (err) throw err;
        if (interval && elapsed >= interval) {
          send();
        }
        else if (interval) {
          timer = setTimeout(send, interval - elapsed);
        }
      });
    });
  }

  function runInterval() {
    clearTimeout(timer);
    if (interval) {
      send();
    }
  }

  this.update = function(i, m) {
    var oldInterval = interval;
    interval = i;
    message = m;
    if (oldInterval !== interval) {
      runInterval();
    }
  };
};

module.exports = Interval;
