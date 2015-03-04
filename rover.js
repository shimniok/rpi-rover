// Rover Jquery
// Michael Shimniok

var GPIO = Array(54);


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

  setFunction(11, "OUT"); // mode
  digitalWrite(11, 0);    // IN-IN mode
  setFunction(9, "OUT");  // a phase
  setFunction(10, "OUT"); // a enable
  setFunction(21, "OUT"); // b phase
  setFunction(22, "OUT"); // b enable

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
  digitalWrite(11, 0);
  digitalWrite(9, 0);  // AIN1
  digitalWrite(21, 0); // BIN1
  digitalWrite(10, 1); // AIN2
  digitalWrite(22, 1); // BIN2
}

function rev() {
  digitalWrite(11, 0);
  digitalWrite(9, 1);	 // AIN1
  digitalWrite(10, 0); // AIN2
  digitalWrite(21, 1); // BIN1
  digitalWrite(22, 0); // BIN2
}

function spinLeft() {
  digitalWrite(11, 0);
  digitalWrite(9, 1);	 // AIN1
  digitalWrite(10, 0); // AIN2
  digitalWrite(21, 0); // BIN1
  digitalWrite(22, 1); // BIN2
}

function spinRight() {
  digitalWrite(11, 0);
  digitalWrite(9, 0);	 // AIN2
  digitalWrite(10, 1); // AIN2
  digitalWrite(21, 1); // BIN2
  digitalWrite(22, 0); // BIN2
}

function stop() {
  digitalWrite(11, 0);
  digitalWrite(9, 0);	 // AIN1
  digitalWrite(10, 0); // AIN2
  digitalWrite(21, 0); // BIN1
  digitalWrite(22, 0); // BIN2
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
