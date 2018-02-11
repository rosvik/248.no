
/*
	User variables
*/
var text_height = 13;
var blank_char = '0';
var text_class = ".fill_text";
var cursor_color = 'red';
var dy = 3;

/*
	Inititalize variables
*/
var char_count = 0,
	line_length = 0,
	init_text = "",
	art_line_lenght = 0,
	art_line_count = 0,
	dx = 0,
	text_element = null,
	prev_char_element = null;

// Generated at http://patorjk.com/software/taag/
var hello = ":::    ::: :::::::::: :::        :::        ::::::::  ::: \n:+:    :+: :+:        :+:        :+:       :+:    :+: :+: \n+:+    +:+ +:+        +:+        +:+       +:+    +:+ +:+ \n+#++:++#++ +#++:++#   +#+        +#+       +#+    +:+ +#+ \n+#+    +#+ +#+        +#+        +#+       +#+    +#+ +#+ \n#+#    #+# #+#        #+#        #+#       #+#    #+#     \n###    ### ########## ########## ########## ########  ### ";

var hello2 = "::::::::::: ::: ::::    ::::       ::::::::::: ::::::::  :::    ::: ::::    ::: \n    :+:     :+  +:+:+: :+:+:+          :+:    :+:    :+: :+:    :+: :+:+:   :+: \n    +:+         +:+ +:+:+ +:+          +:+    +:+    +:+ +:+    +:+ :+:+:+  +:+ \n    +#+         +#+  +:+  +#+          +#+    +#+    +:+ +#++:++#++ +#+ +:+ +#+ \n    +#+         +#+       +#+          +#+    +#+    +#+ +#+    +#+ +#+  +#+#+# \n    #+#         #+#       #+#      #+# #+#    #+#    #+# #+#    #+# #+#   #+#+# \n###########     ###       ###       #####      ########  ###    ### ###    #### ";

var hello3 = "::::::::: :::    ::: :::::::::   :::::::::  \n     :+:  :+:    :+: :+:    :+: :+:     :+: \n    +:+   +:+    +:+ +:+    +:+        +:+  \n   +#+    +#+    +:+ +#++:++#+        +#+   \n  +#+     +#+    +#+ +#+            +#+     \n #+#      #+#    #+# #+#                    \n#########  ########  ###            ###     ";

var hello4 = " ::::::::   :::      ::::::::      ::::    :::  ::::::::  \n:+:    :+: :+:      :+:    :+:     :+:+:   :+: :+:    :+: \n      +:+ +:+ +:+   +:+    +:+     :+:+:+  +:+ +:+    +:+ \n    +#+  +#+  +:+    +#++:++#      +#+ +:+ +#+ +#+    +:+ \n  +#+   +#+#+#+#+#+ +#+    +#+     +#+  +#+#+# +#+    +#+ \n #+#          #+#   #+#    #+# #+# #+#   #+#+# #+#    #+# \n##########    ###    ########  ### ###    ####  ########  ";

$(document).ready(function() {
	// Inititalize document (only first time)
	text_element = $(text_class);
	text_element.html(blank_char.repeat(512));
	text_element.lettering();
	line_length = get_line_length(text_element);
	text_element.html('');
	init_text = blank_char.repeat(line_length).repeat(text_height);
	char_count = init_text.length;
	text_element.html(init_text).lettering();

	// Inititalize document (on every loop)
	init_document();

	// Start cursor loop
	myLoop(0, char_count, function(i, x, y) {
		setLetter(i, x, y);
	});
});


/*
	Cursor loop
*/
function myLoop (s, f, action) {

	++s;

	// Calculate coordinates
	var y = parseInt(s / line_length);
	var x = s % line_length;
	if (x == 0) x = line_length;

	// Run action() on every character
	//if(s<=f) {

	// Run action() if needed
	if (s <= f && (need_replace(s) || need_insert(s, x, y))) {

		action(s, x, y);
		// console.log("woo");
		setZeroTimeout(function(){
			myLoop(s,f,action);
		});
	} else if (s <= f) {
		myLoop(s,f,action);
	} else if (s > f) {
		// After loop finishes
		hello = hello4;
		init_document();
		myLoop(0, char_count, function(i, x, y) {
			setLetter(i, x, y);
		});
	}

	function need_replace(i) {
		var char_element = $('.char' + i);
		// console.log(char_element.html() != 0);
		return char_element.html() != blank_char;
	}

	function need_insert(i, x, y) {
		if (x < art_line_lenght+dx && x > dx &&  // Check if [x,y] in range from
			y < art_line_count+dy && y >= dy) {  // [x+dx, y+dy] to [all+dx, alc+dy]
			var art_char = art_line_lenght * (y-dy) + (x-dx) - 1;
			if (hello[art_char] != " ") {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
};


/*
	Inititalize document (on every loop)
*/
function init_document() {
	// Calculate variables
	line_length = get_line_length(text_element);
	art_line_lenght = hello.indexOf("\n")+1;
	art_line_count = (hello.match(/\n/g) || []).length+1;
	dx = parseInt(0.5*line_length - 0.5*art_line_lenght) + 1;
}

/*
	Calculate with of window in characters
*/
function get_line_length(element) {
	var top = element.children().eq(0).position().top;
	var n = 0;
	for (var i = 0; i < element.children().length; i++) {
		if (element.children().eq(i).position().top == top) {
			n++;
		} else {
			break;
		}
	}
	return n;
}


/*
	Do character calculations and change letter
*/
function setLetter(i, x, y) {
	// Clear cursor fill
	if (prev_char_element != null) prev_char_element.css('background-color', 'transparent');
	var char_element = $('.char' + i);
	char_element.css('background-color', cursor_color);

	// Insert art character in center of canvas
	// dx = parseInt(0.5*line_length - 0.5*art_line_lenght) + 1;
	insertArtAt(x, y, dx, dy, char_element);

	prev_char_element = char_element;

	/*
		Insert art character at [x,y]
	*/
	function insertArtAt(x, y, dx, dy, element) {
		if (x < art_line_lenght+dx && x > dx &&  // Check if [x,y] in range from
			y < art_line_count+dy && y >= dy) {  // [x+dx, y+dy] to [all+dx, alc+dy]

			// Set character from art
			var art_char = art_line_lenght * (y-dy) + (x-dx) - 1;
			if (hello[art_char] != " ") {
				element.html(hello[art_char]);
				element.css('color', 'white');
			} else {
				char_reset();
			}
		} else {
			char_reset();
		}
		function char_reset() {
			element.html(blank_char);
			element.css('color', 'inherit');
		}
	}
}
