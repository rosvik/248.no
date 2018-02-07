
/*
	User variables
*/
var text_height = 13;
var blank_char = '0';
var text_class = ".fill_text";
var startTime = Date.now();

/*
	Inititalize variables
*/
var char_count = 0;
var line_length = 0
var init_text = "";
// Generated at http://patorjk.com/software/taag/#p=testall&f=Contrast&t=hello!
var hello = ":::    ::: :::::::::: :::        :::        ::::::::  ::: \n:+:    :+: :+:        :+:        :+:       :+:    :+: :+: \n+:+    +:+ +:+        +:+        +:+       +:+    +:+ +:+ \n+#++:++#++ +#++:++#   +#+        +#+       +#+    +:+ +#+ \n+#+    +#+ +#+        +#+        +#+       +#+    +#+ +#+ \n#+#    #+# #+#        #+#        #+#       #+#    #+#     \n###    ### ########## ########## ########## ########  ### ";
var art_line_lenght = hello.indexOf("\n")+1;
var art_line_count = (hello.match(/\n/g) || []).length+1;

$(document).ready(function() {


	/*
		Inititalize document
	*/

	var text_element = $(text_class);
	line_length = get_line_length(text_element);
	init_text = blank_char.repeat(line_length).repeat(text_height);
	char_count = init_text.length;
	text_element.html(init_text).lettering();

	myLoop(0, char_count, function(i) {
		// Clear cursor fill
		var char_element = $('.char' + i);
		char_element.css('background-color', 'transparent');

		// Find coordinates
		var y = parseInt(i / line_length);
		var x = i % line_length;
		if (x == 0) x = line_length;

		// Insert art character at [x,y]
		var offset = parseInt(0.5*line_length - 0.5*art_line_lenght);
		insertArtAt(x, y, offset, 3, char_element);

		// Set cursor fill
		var next_char = i+1;
		$('.char' + next_char ).css('background-color', '#555');
	});
});

function myLoop (s, f, action) {
	if (++s < f) {
		action(s);
		setZeroTimeout(function(){
			myLoop(s,f,action)
		});
	} else {
		// After loop finishes
		myLoop(0, char_count, action)
	}
};

function insertArtAt(x, y, dx, dy, element) {
	if (x < art_line_lenght+dx && x > dx &&  // Check if [x,y] in range from
		y < art_line_count+dy && y >= dy) {  // [x+dx, y+dy] to [all+dx, alc+dy]
		var art_char = art_line_lenght * (y-dy) + (x-dx);
		if (hello[art_char-1] != " ") {
			element.html(hello[art_char-1]);
			element.css('color', 'white');
		}
	}
}

function countLetterByLine(element) {
	var lineLetterCount = {};
	for (var i = 0; i < element.children().length; i++) {
		var y = element.children().eq(i).position().top;
		if (lineLetterCount[y] == undefined) {
			lineLetterCount[y] = 1;
		} else {
			lineLetterCount[y] = lineLetterCount[y] + 1;
		}
	}
	return lineLetterCount;
}

function get_line_length(element) {
	element.html('|'.repeat(512));
	element.lettering();

	var top = element.children().eq(0).position().top;
	var n = 0;
	for (var i = 0; i < element.children().length; i++) {
		if (element.children().eq(i).position().top == top) {
			n++;
		} else {
			break;
		}
	}
	element.html('');
	return n;
}
