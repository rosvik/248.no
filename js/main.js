
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
var char_count = 0;
var line_length = 0
var init_text = "";
// Generated at http://patorjk.com/software/taag/
var hello = ":::    ::: :::::::::: :::        :::        ::::::::  ::: \n:+:    :+: :+:        :+:        :+:       :+:    :+: :+: \n+:+    +:+ +:+        +:+        +:+       +:+    +:+ +:+ \n+#++:++#++ +#++:++#   +#+        +#+       +#+    +:+ +#+ \n+#+    +#+ +#+        +#+        +#+       +#+    +#+ +#+ \n#+#    #+# #+#        #+#        #+#       #+#    #+#     \n###    ### ########## ########## ########## ########  ### ";

var hello2 = "::::::::::: ::: ::::    ::::       ::::::::::: ::::::::  :::    ::: ::::    ::: \n    :+:     :+  +:+:+: :+:+:+          :+:    :+:    :+: :+:    :+: :+:+:   :+: \n    +:+         +:+ +:+:+ +:+          +:+    +:+    +:+ +:+    +:+ :+:+:+  +:+ \n    +#+         +#+  +:+  +#+          +#+    +#+    +:+ +#++:++#++ +#+ +:+ +#+ \n    +#+         +#+       +#+          +#+    +#+    +#+ +#+    +#+ +#+  +#+#+# \n    #+#         #+#       #+#      #+# #+#    #+#    #+# #+#    #+# #+#   #+#+# \n###########     ###       ###       #####      ########  ###    ### ###    #### ";

var hello3 = "::::::::: :::    ::: :::::::::   :::::::::  \n     :+:  :+:    :+: :+:    :+: :+:     :+: \n    +:+   +:+    +:+ +:+    +:+        +:+  \n   +#+    +#+    +:+ +#++:++#+        +#+   \n  +#+     +#+    +#+ +#+            +#+     \n #+#      #+#    #+# #+#                    \n#########  ########  ###            ###     ";

var hello4 = " ::::::::   :::      ::::::::      ::::    :::  ::::::::  \n:+:    :+: :+:      :+:    :+:     :+:+:   :+: :+:    :+: \n      +:+ +:+ +:+   +:+    +:+     :+:+:+  +:+ +:+    +:+ \n    +#+  +#+  +:+    +#++:++#      +#+ +:+ +#+ +#+    +:+ \n  +#+   +#+#+#+#+#+ +#+    +#+     +#+  +#+#+# +#+    +#+ \n #+#          #+#   #+#    #+# #+# #+#   #+#+# #+#    #+# \n##########    ###    ########  ### ###    ####  ########  ";

var art_line_lenght = hello.indexOf("\n")+1;
var art_line_count = (hello.match(/\n/g) || []).length+1;
var text_element = null;
var dx = parseInt(0.5*line_length - 0.5*art_line_lenght) + 1;

$(document).ready(function() {
	// Inititalize document (only first time)
	text_element = $(text_class);
	text_element.html('|'.repeat(512));
	text_element.lettering();
	line_length = get_line_length(text_element);
	text_element.html('');
	init_text = blank_char.repeat(line_length).repeat(text_height);
	char_count = init_text.length;
	text_element.html(init_text).lettering();
	dx = parseInt(0.5*line_length - 0.5*art_line_lenght) + 1;

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

	if (s <= f && (need_replace(s) || need_insert(s, x, y))) {
	//if (s <= f) {
		action(s, x, y);
		// console.log("woo");
		setZeroTimeout(function(){
			myLoop(s,f,action);
		});
	} else if (s <= f) {
		myLoop(s,f,action);
	} else if (s > f) {
		// After loop finishes
		init_document()
		hello = hello4;
		art_line_lenght = hello.indexOf("\n")+1;
		// myLoop(0, char_count, function(i) {
		// 	setLetter(i);
		// });
	}

	function need_replace(i) {
		var char_element = $('.char' + i);
		// console.log(char_element.html() != 0);
		return char_element.html() != 0;
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
	var char_element = $('.char' + i);
	char_element.css('background-color', 'transparent');

	// Insert art character in center of canvas
	// dx = parseInt(0.5*line_length - 0.5*art_line_lenght) + 1;
	insertArtAt(x, y, dx, dy, char_element);

	// Set cursor fill
	var next_char = i+1;
	$('.char' + next_char ).css('background-color', cursor_color);

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
			element.html('0');
			element.css('color', 'inherit');
		}
	}
}
