// create a circle using HTML5 / CSS3 / JS which has a border that only goes part-way around
// the circle .. and which can be smoothly animated from 0% to 100% around the circle

// this solution allows for animation and still results in relatively clean code
// we use four quarter-circles, all hidden away behind a white square to start with..
// all four are rotated out clockwise, and each quarter will stop at it's own maximum:
// q1 at 25%, q2 at 50% .. etc. once we reach a value at or over 25%, all four quarters
// should be out from behind the white square, and we can hide it.. it needs to be
// hidden if we display a value over 75%, or else q4 will end up going in behind it again
// .. also, since the top border will usually sit between the angles of  -45 to 45, we
// rotate everything by an extra -45 to make it all line up with the top nicely

var fromHidden = -90;

// utility funciton to align 0 degrees with top
// takes degrees and returns degrees - 45
function topAlign(degrees) {
    return degrees - 45
};

// utility function to rotate a jQuery element
// takes element and the degree of rotation (from the top) 
function rotate(el, degrees) {
	var degrees = topAlign(degrees || 0);
	el.css(
		'transform', 'rotate('+degrees+'deg)',
		'-webkit-transform', 'rotate('+degrees+'deg)',
		'-moz-transform', 'rotate('+degrees+'deg)',
		'-ms-transform', 'rotate('+degrees+'deg)',
		'-o-transform', 'rotate('+degrees+'deg)'
	)
}

// function to draw semi-circle
// takes a jQuery element and a value (between 0 and 1)
// element must contain four .arc_q elements
function circle(el, normalisedValue) {
	var degrees = normalisedValue * 360;             // turn normalised value into degrees
	var counter = 1;                                 // keeps track of which quarter we're working with
	el.find('.arc_q').each(function(){               // loop over quarters..
		var angle = Math.min(counter * 90, degrees); // limit angle to maximum allowed for this quarter
		rotate($(this), fromHidden + angle);         // rotate from the hiding place
		counter++; // track which quarter we'll be working with in next pass over loop
	});
	if (degrees > 90) {                              // hide the cover-up square soon as we can
		el.find('.arc_cover').css('display', 'none');
	}
}

// uses the the circle function to 'animate' drawing of the semi-circle
// incrementally increses the value passed by 0.01 up to the value required
function animate(el, normalisedValue, current) {
	var current = current || 0;
	circle(el, current);
	if (current < normalisedValue) {
		current += 0.01;
		setTimeout(function () { animate(el, normalisedValue, current); }, 1);
	}
}

// kick things off ..
animate($('.circle'), 0.69);
