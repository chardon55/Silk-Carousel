/*							Slideshow						*
 *	Edition: 2.0 beta-2										*
 *	Created by: dy55										*
 *	Created date: Aug. 3, 2019								*/

var slideNo = 0;
var slideTarget;

var defaultWidth = "60%";
var defaultHeight = "450px";

var curWidth;
var curHeight;

var curSlide = 1;
var pauseTime = 500;
var slideInterval = 5000 + pauseTime;

var imageArray = new Array();
var anchorArray = new Array();

var InitialDisplay = "Initializing...";
var NoImageDisplay = "Printing...";

//var webkitPara = 70;
//var thisBrowserPara = window.outerHeight - window.innerHeight;

var internalEventReference;
$(() => {

});


function SlideRun(target, width = defaultWidth, height = defaultHeight, imageSrcs, anchorHrefs) {

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
		"transition": "background " + pauseTime + "ms",
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
	setTimeout(() => {
		barReset(curSlide);
	}, pauseTime);
}

function ProgressBarSetPut(barNumber) {
	$(slideTarget).append("<div class='barSet'></div>");
	for (var i = 0; i < barNumber; i++) {
		$(slideTarget + " > .barSet").append("<div class='" + barClassName + " bar" + i + "' role='progressbar'></div>");
			
		$(slideTarget + " > .barSet > .bar" + i).click(() => {
			clearInterval(internalEventReference);
			//TurnTo(i + 1);
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

	$(() => {
		$(slideTarget).css("background-image", "url(" + imageArray[slideNum - 1] + ")");
		$(slideTarget).click(() => {
			window.location.href = anchorArray[slideNum - 1];
		});

		setTimeout(() => {
			barReset(slideNum);
		}, pauseTime);
	});
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
		"background-color": "rgba(255,255,255,0.4)"
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

var firstTime = true;

function barReset(actNum) {

	$(() => {

		$(slideTarget + " ." + barClassName + " > div").css({
			"transition": "none",
			"width": "0"
		});

		$(slideTarget + " .bar" + (actNum - 1) + " > div").css({
			"transition": "all " + (slideInterval - pauseTime) + "ms linear"
		});

		if (firstTime) {
			if (!isEdge()) {
				////Transition Effect Adjustment Buffer
				var offsetTime = 0;
				while ($(slideTarget + " .bar" + (actNum - 1) + " > div").css("transition") != "all " + (slideInterval - offsetTime) + "ms linear"
					&&
					offsetTime < slideInterval) {
					setTimeout(() => {

						$(slideTarget + " .bar" + (actNum - 1) + " > div").css({
							"transition": "all " + (slideInterval - offsetTime - pauseTime) + "ms linear"
						});

					}, offsetTime += 20)
				}
				delete offsetTime;
				////
			}
			else {
				
			}
			firstTime = false;
		}

		$(slideTarget + " .bar" + (actNum - 1) + " > div").css({
			"width": "100%"
		});

	});

}

function isEdge() {
	return navigator.userAgent.includes("Edge") || navigator.userAgent.includes("Chrome / 70.0.3538.102");
}