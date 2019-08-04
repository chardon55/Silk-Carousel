/*							Slideshow						*
 *	Edition: 2.0(beta)										*
 *	Created by: dy55										*
 *	Created date: Aug. 3, 2019								*/

var slideNo = 0;
var slideTarget;

var defaultWidth = "60%";
var defaultHeight = "450px";

var curWidth;
var curHeight;

var curSlide = 1;
var slideInterval = 3000;

var imageArray = new Array();
var anchorArray = new Array();

var InitialDisplay = "Initializing...";
var NoImageDisplay = "Printing...";

var internalEventReference;
$(() => {

});


function SlideRun(target, width, height, imageSrcs, anchorHrefs) {

	imageArray = imageSrcs;
	anchorArray = anchorHrefs;

	////
	slideTarget = target;
	slideNo++;

	if (width == null)
		curWidth = defaultWidth;
	else
		curWidth = width;
	if (height == null)
		curHeight = defaultHeight;
	else
		curHeight = height;
	////

	FormatSet();
	ProgressBarSetPut(imageArray.length, anchorArray.length);
	Init(imageArray, anchorArray);

	////
}

function FormatSet() {
	$(slideTarget).css({
		"height": curHeight,
		"width": curWidth,
		"background-position": "center",
		"background-size": "cover",
		"transition": "background 0.5s",
		"cursor": "pointer",
		"overflow": "hidden",
		"outline": "1.5px black solid"
	});
}

function Init(imageArray = new Array(), anchorArray = new Array()) {
	$(slideTarget).css("background-image", "url(" + imageArray[curSlide - 1] + ")")
		.click(() => {
			window.location.href = anchorArray[curSlide - 1];
		});


	internalEventReference = setInterval(() => {
		TurnNext(imageArray.length);
	}, slideInterval);
	barReset(curSlide);
}

function ProgressBarSetPut(barNumber) {
	$(slideTarget).append("<div class='barSet'></div>");
	for (var i = 0; i < barNumber; i++) {
		$(slideTarget + " > .barSet").append("<div class='" + barClassName + " bar" + i + "' role='progressbar'></div>");
			
		$(slideTarget + " > .barSet > bar" + i).click(() => {
			clearInterval(internalEventReference);
			TurnTo(i + 1);
		});
	}

	$(slideTarget + " > .barSet").css({
		"height": "3%",
		"display": "relative",
		"width": "100%",
		"margin-top": () => {
			var adjPara = 30;
			return (parseFloat(curHeight) - parseFloat(curHeight) / adjPara) + SliceToUnit(curHeight);
		},
		"z-index": "1"
	});
	var gap = 0.25;//%
	$(slideTarget + " ." + barClassName).css({
		"display": "relative",
		"height": "100%",
		"width": 100 / barNumber - gap + "%",
		"display": "inline-block",
		"margin-right": gap + "%"
	});
}

function SliceToUnit(str) {
	for (var i = 1; str[i] >= '0' && str[i] <= '9'; i++);
	return str.substring(i);
}

function TurnTo(slideNum) {
	curSlide = slideNum;
	$(slideTarget).css("background-image", "url(" + imageArray[slideNum - 1] + ")");
	$(slideTarget).click(() => {
		window.location.href = anchorArray[slideNum - 1];
	});
	barReset(slideNum);
}

function TurnNext(total) {
	if (++curSlide > total)
		TurnTo(1);
	else
		TurnTo(curSlide);
}

function TurnPrev(total) {
	if (--curSlide < 1)
		TurnTo(total);
	else
		TurnTo(curSlide);
}

///////////////////////////////////////
//progress bar embedded v1.0(alpha)
//Created by dy55 on Aug. 4, 2019

var barClassName = "progressBar";

$(() => {

	barBuild();

});

function barBuild() {
	$("." + barClassName).html("<div></div>");
	$("." + barClassName).css({
		"background-color": "#ffffff4e"
	});
	$("." + barClassName + " > div").css({
		"background-color": "#ffffff",
		"position": "relative",
		"display": "inline-block",
		"height": "100%",
		"z-index": "1"
	});

}

///////////////////////////////////////

function barReset(actNum) {
	$(slideTarget + " ." + barClassName + " > div").css({
		"transition": "none",
		"width": "0"
	});

	$(slideTarget + " ." + barClassName)[actNum - 1].css({
		"transition": "width " + slideInterval + "ms linear",
		"width": "100%"
	});
}