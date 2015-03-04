// Rover Jquery
// Michael Shimniok

var GPIO = Array(54);

var md = 11;
var ain1 = 9;
var ain2 = 10;
var bin1 = 21;
var bin2 = 22;

$(document).ready(function() {
	var left, right, top, button;

  $("img#imagestream").attr('src', 'http://' + window.location.hostname + ':8080/?action=stream');

	// init GPIOs
	for (var i=0; i < GPIO.length; i++) {
		var gpio = Object();
		gpio.value = 0;
		gpio.func = "IN";
		gpio.mapped = false;
		GPIO[i] = gpio;
	}

  top = $( "#topbuttons" );
  left = $( "#leftbuttons" );
  right = $( "#rightbuttons" );

  setFunction(md, "OUT"); // mode
  digitalWrite(md, 0);    // IN-IN mode
  setFunction(ain1, "OUT");  // a phase
  setFunction(ain2, "OUT"); // a enable
  setFunction(bin1, "OUT"); // b phase
  setFunction(bin2, "OUT"); // b enable

  // Note that on iDevices, touchstart/touchend come first and
  // mousedown/mouseup are also fired, so you have to disable
  // them from within touchstart/touchend

  $("#F").bind("mousedown", function() {
    fwd();
  });
  $("#F").bind("mouseup", function() {
    stop();
  });
  $("#F").bind("touchstart", function() {
    fwd();
    $(this).unbind("mousedown");
  });
  $("#F").bind("touchend", function() {
    stop();
    $(this).unbind("mousedown");
  });

  $("#R").bind("mousedown", rev);
  $("#R").bind("mouseup", stop);
  $("#R").bind("touchstart", function() {
    rev();
    $(this).unbind("mousedown");
  });
  $("#R").bind("touchend", function() {
    stop();
    $(this).unbind("mouseup");
  });

  $("#SR").bind("mousedown", spinRight);
  $("#SR").bind("touchstart", function() {
    spinRight();
    $(this).unbind("mousedown");
  });
  $("#SR").bind("mouseup", stop);
  $("#SR").bind("touchend", function() {
    stop();
    $(this).unbind("mouseup");
  });

  $("#SL").bind("mousedown", spinLeft);
  $("#SL").bind("mouseup", stop);
  $("#SL").bind("touchstart", function() {
    spinLeft();
    $(this).unbind("mousedown");
  });
  $("#SL").bind("touchend", function() {
    stop();
    $(this).unbind("mouseup");
  });

  $("#ST").bind("mouseup", stop);
  $("#ST").bind("touchstart mousedown", stop);

  $("#ST").bind("touchstart mousedown", function() {
    stop();
    $(this).unbind("mousedown");
  });
  $("#ST").bind("touchend", function() {
    stop();
    $(this).unbind("mouseup");
  });

});

function sign(x) {
  return x / Math.abs(x);
}


function fwd() {
  digitalWrite(md, 0);
  digitalWrite(ain1, 0);  // AIN1
  digitalWrite(bin1, 0); // BIN1
  digitalWrite(ain2, 1); // AIN2
  digitalWrite(bin2, 1); // BIN2
}

function rev() {
  digitalWrite(md, 0);
  digitalWrite(ain1, 1);	 // AIN1
  digitalWrite(ain2, 0); // AIN2
  digitalWrite(bin1, 1); // BIN1
  digitalWrite(bin2, 0); // BIN2
}

function spinLeft() {
  digitalWrite(md, 0);
  digitalWrite(ain1, 1);	 // AIN1
  digitalWrite(ain2, 0); // AIN2
  digitalWrite(bin1, 0); // BIN1
  digitalWrite(bin2, 1); // BIN2
}

function spinRight() {
  digitalWrite(md, 0);
  digitalWrite(ain1, 0);	 // AIN2
  digitalWrite(ain2, 1); // AIN2
  digitalWrite(bin1, 1); // BIN2
  digitalWrite(bin2, 0); // BIN2
}

function stop() {
  digitalWrite(md, 0);
  digitalWrite(ain1, 0);	 // AIN1
  digitalWrite(ain2, 0); // AIN2
  digitalWrite(bin1, 0); // BIN1
  digitalWrite(bin2, 0); // BIN2
}


function setFunction(gpio, func) {
	$.post('/GPIO/' + gpio + "/function/" + func, function(data) {
		updateFunction(gpio, data);
	});
}


function digitalWrite(gpio, value) {
	if (GPIO[gpio].func.toUpperCase() == "OUT") {
		$.post('/GPIO/' + gpio + "/value/" + value, function(data) {
			updateValue(gpio, data);
		});
	}
}

function updateFunction(gpio, func) {
	GPIO[gpio].func = func;
}


function updateValue(gpio, value) {
  GPIO[gpio].value = value;
}


// Window Resizing
$(window).load(function() {
  doResize();
  $(window).on('resize', doResize);
  $(window).on('orientationchange', doResize);
});


// Resize buttons and image
function doResize() {
  var ww;
  var wh;
  var margin = 60;
  var ratio = 320/240;
  var winportion = 0.6; // portion of vertical space taken up by image

  if (window.orientation == 90 || window.orientation == -90) {
    ww = $(window).height();
    wh = $(window).width()-margin;
  } else {
    ww = $(document).width();
    wh = $(document).height()-margin;
  }

  var iw = ww - margin*2;
  var ih = wh*winportion - margin;

  // Resize Image Stream
  if (ih * ratio > iw) {
    $("img#imagestream").height(iw/ratio);
    $("img#imagestream").width(iw);
  } else {
    $("img#imagestream").width(ih*ratio);
    $("img#imagestream").height(ih);
  }

  // Resize Table
  $("table.button").width(wh - ih);
  $("table.button").height(wh - ih);
}
