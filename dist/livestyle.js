'use strict';

/* livestyle
 * 
 * that's right, kids, that's not lifestyle but live styling of a web page. 
 * */

var animation,
	speed = 1000,
	pause = 400,
	initialStep = 0;


/* properties animatable by jQuery.animate() incl. jQuery.color */
var animatable = {
	backgroundPositionX: true,
	backgroundPositionY: true,
	borderWidth: true,
	borderBottomWidth: true,
	borderLeftWidth: true,
	borderRightWidth: true,
	borderTopWidth: true,
	borderSpacing: true,
	margin: true,
	marginBottom: true,
	marginLeft: true,
	marginRight: true,
	marginTop: true,
	outlineWidth: true,
	padding: true,
	paddingBottom: true,
	paddingLeft: true,
	paddingRight: true,
	paddingTop: true,
	height: true,
	width: true,
	maxHeight: true,
	maxWidth: true,
	minHeight: true,
	minWidth: true,
	fontSize: true,
	bottom: true,
	left: true,
	right: true,
	top: true,
	letterSpacing: true,
	wordSpacing: true,
	lineHeight: true,
	textIndent: true,

	/* jQuery.color */
	color: true,
	'background-color': true,
	'border-color': true
	/* (made up. not from API. Did I miss somebody? */
};

/* special functions, listed in animation like properties */
var specialOps = {
	
	textswap : function(speed, selector, value) {
	
		console.log("speed " + speed);
		console.log("selector " + selector);
		console.log("value " + value);
	},
	typewrite : function(speed, selector, value) {
	
		console.log("speed " + speed);
		console.log("selector " + selector);
		console.log("value " + value);
	}	
};


$.extend($.easing,
{
	easeOutBack : function (x, t, b, c, d, s) {
		t = t/d-1;
		if (s === undefined) s = 1.70158;
		console( "easeOutBack "+c*((t)*t*((s+1)*t + s) + 1) + b);
		return c*((t)*t*((s+1)*t + s) + 1) + b;
	},
	
	easeOutBounce : function (x, t, b, c, d) {
		t = t/d;
		console.log('t: '+t);
		if ((t) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	}
	
});  /* extend */

    
	
var animate = function( step ) {

	$('#step').text(''+step);

	var animateOptions = {
		duration: speed,
		ease: 'easeOutBounce'
	};
	
	// console.log ("going form step "+ (step-1) + "to" + (step) + "--------------" );
	
	var selectors = animation[step];
	if ( selectors['sentinel'] )
		delete selectors['sentinel'];
	
	for( var selector in selectors) {
		var styles = selectors[selector];
		// un-animatable properties
		var props = {}, value;

		if ( styles['sentinel'] )
			delete styles['sentinel'];
		
		for( var prop in styles ) {
			value = styles[prop];
			console.log("prop "+prop);
			
			// regular animatable property ?
			if ( animatable[prop] )
				continue;
			
			// filter special commands ?
			if ( specialOps[prop] )
			{
				specialOps[prop](speed, selector, value);
				delete specialOps[prop];
			}
			
			props[prop] = value;
			delete styles[prop];
		}
			
		// ---------------------------------------------------
		
		//		console.log( "    selector: " + selector );
		//		console.dir( styles );
		//		console.dir( props );

		// $('.some').animate( 'background','orange');
		$( selector ).css( props )
				     .animate( styles, animateOptions );
	}
	
	// with delay, do next step.
	if (step < animation.length-1)
		setTimeout( 
			function() { animate(step+1); },
			speed + pause
		);
	
};

// exports =============================================
module.exports = {
	init: function( _animation, _speed, _initialStep ) {
		
		if ( typeof _animation !== 'object' ) // falsy considered
		{
			console.error('must initialize with an animation js object.');
			return;
		}
		animation = _animation;
		
		// optional params
		if ( typeof _speed !== 'undefined' )
			speed = _speed;
		
		if ( typeof _initialStep !== 'undefined' )
			initialStep = _initialStep;
	},
	
	start: function() {
		if ( !animation )
		{
				console.error('call init() first');
				return;
		}
		
		console.log('lifestyle init');
		setTimeout( 
				function() { animate(0); }, 
		speed );
	},
	
	rush: function() {
		console.error('needs implementing');
	},
	finish: function() {
		console.error('needs implementing');
	}
	
	
};

