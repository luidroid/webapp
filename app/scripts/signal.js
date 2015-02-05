/**
 * Signal Status
 * @param value
 * 			signal percentage
 */
var drawSignal = function(value){
	var x = 10,
		y = 100,
		width = 20,
		height = 20,
		color_signal = "gray",
		color_signal_ok = "#003366", //"#0099FF", blue
		num = value/width,
		rect;
		
	
	var stage = new Kinetic.Stage({
		  container: 'signalContainer',
		  width: 160,
		  height: 125
	});
	var layer = new Kinetic.Layer();
	
	// Signal body
	for(var i=0; i<5; i++){
		rect = new Kinetic.Rect({
	        x: x,
	        y: y,
	        width: width,
	        height: height,
	        stroke: color_signal
	    });
		layer.add(rect);
		
		x = x + width + 10;
		y = y - 20;
		height = height + 20;
	}
	
	// Signal filled
	x = 10 + 1;
	y = 100 + 1;
	width = 20 - 2;
	height = 20 - 2;
	for(var i=0; i<num; i++){
		rect = new Kinetic.Rect({
	        x: x,
	        y: y,
	        width: width,
	        height: height,
	        fill: color_signal_ok
	    });
		layer.add(rect);
		
		x = x + width + 10 + 2;
		y = y - 20;
		height = height + 20;
	}

    stage.add(layer);
	
};