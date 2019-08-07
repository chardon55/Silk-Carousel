/*							Slideshow						*
 *	Edition: 2.0 beta-3										*
 *	Created by: dy55										*
 *	Created date: Aug. 3, 2019								*/

var slideNo = 0;

var defaultWidth = "60%";
var defaultHeight = "450px";

var pauseTime = 500;
var slideInterval = 5000 + pauseTime;

var InitialDisplay = "Initializing...";
var NoImageDisplay = "Printing...";

//var webkitPara = 70;
//var thisBrowserPara = window.outerHeight - window.innerHeight;

var internalEventReference;
$(() => {

});


function SlideRun(_target, width, height, imageSrcs, anchorHrefs, _outline = true) {

	var slideInfo = {
		slideTarget: _target,
		curWidth: new String(),
		curHeight: new String(),
		curSlide: 1,
		imageArray: imageSrcs,
		anchorArray: anchorHrefs,
		outline: _outline
	}

	slideNo++;

	if (width == null)
		slideInfo.curWidth = defaultWidth;
	else
		slideInfo.curWidth = width;
	if (height == null)
		slideInfo.curHeight = defaultHeight;
	else
		slideInfo.curHeight = height;
	////

	FormatSet(slideInfo);
	ProgressBarSetPut(slideInfo);
	//buttonsBuild();
	Init(slideInfo);

	////
}

function FormatSet(slideInfo) {
	$(slideInfo.slideTarget).css({
		"height": slideInfo.curHeight,
		"width": slideInfo.curWidth,
		"background-position": "center",
		"background-size": "cover",
		"transition": "background " + pauseTime + "ms",
		"cursor": "pointer",
		"overflow": "hidden",
		"outline": () => {
			if (slideInfo.outline)
				return "1.5px black solid";
			else
				return "none";
		}
	});
}

function Init(slideInfo) {
	$(slideInfo.slideTarget).css("background-image", "url(" + slideInfo.imageArray[slideInfo.curSlide - 1] + ")")
		.click(() => {
			window.location.href = slideInfo.anchorArray[slideInfo.curSlide - 1];
		});


	internalEventReference = setInterval(() => {
		TurnNext(slideInfo);
	}, slideInterval);
	setTimeout(() => {
		barReset(slideInfo);
	}, pauseTime);
}

function ProgressBarSetPut(slideInfo) {
	$(slideInfo.slideTarget).append("<div class='barSet'></div>");
	for (var i = 0; i < slideInfo.imageArray.length; i++) {
		$(slideInfo.slideTarget + " > .barSet").append("<div class='" + barClassName + " bar" + i + "' role='progressbar'></div>");
			
		$(slideInfo.slideTarget + " > .barSet > .bar" + i).click(() => {
			clearInterval(internalEventReference);
			TurnTo(i + 1, slideInfo);
		});
	}

	$(slideInfo.slideTarget + " > .barSet").css({
		"height": "3%",
		"display": "relative",
		"width": "100%",
		"margin-top": () => {
			var adjPara = 30;
			return (parseFloat(slideInfo.curHeight) - parseFloat(slideInfo.curHeight) / adjPara) + SliceToUnit(slideInfo.curHeight);
		},
		"z-index": "1"
	});
	var gap = 0.25;//%
	$(slideInfo.slideTarget + " ." + barClassName).css({
		"display": "relative",
		"height": "100%",
		"width": 100 / slideInfo.imageArray.length - gap + "%",
		"display": "inline-block",
		"margin-right": gap + "%"
	});
}

function SliceToUnit(str) {
	for (var i = 1; str[i] >= '0' && str[i] <= '9'; i++);
	return str.substring(i);
}

function TurnTo(toSlide, slideInfo) {
	slideInfo.curSlide = toSlide;

	$(() => {
		$(slideInfo.slideTarget).css("background-image", "url(" + slideInfo.imageArray[toSlide - 1] + ")");
		$(slideInfo.slideTarget).click(() => {
			window.location.href = slideInfo.anchorArray[toSlide - 1];
		});

		setTimeout(() => {
			barReset(slideInfo);
		}, pauseTime);
	});
}

function TurnNext(slideInfo) {
	if (++slideInfo.curSlide > slideInfo.imageArray.length)
		TurnTo(1, slideInfo);
	else
		TurnTo(slideInfo.curSlide, slideInfo);
}

function TurnPrev(slideInfo) {
	if (--slideInfo.curSlide < 1)
		TurnTo(slideInfo.imageArray.length, slideInfo);
	else
		TurnTo(slideInfo.curSlide, slideInfo);
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

function barReset(slideInfo) {

	$(() => {

		$(slideInfo.slideTarget + " ." + barClassName + " > div").css({
			"transition": "none",
			"width": "0"
		});

		$(slideInfo.slideTarget + " .bar" + (slideInfo.curSlide - 1) + " > div").css({
			"transition": "all " + (slideInterval - pauseTime) + "ms linear"
		});

		if (firstTime) {
			if (!isEdge()) {
				////Transition Effect Adjustment Buffer
				var offsetTime = 0;
				while ($(slideInfo.slideTarget + " .bar" + (slideInfo.curSlide - 1) + " > div").css("transition") != "all " + (slideInterval - offsetTime) + "ms linear"
					&&
					offsetTime < slideInterval) {
					setTimeout(() => {

						$(slideInfo.slideTarget + " .bar" + (slideInfo.curSlide - 1) + " > div").css({
							"transition": "all " + (slideInterval - offsetTime - pauseTime) + "ms linear"
						});

					}, offsetTime += 100)
				}
				delete offsetTime;
				////
			}
			else {
				
			}
			firstTime = false;
		}

		$(slideInfo.slideTarget + " .bar" + (slideInfo.curSlide - 1) + " > div").css({
			"width": "100%"
		});

	});

}

function isEdge() {
	return navigator.userAgent.includes("Edge") || navigator.userAgent.includes("Chrome / 70.0.3538.102");
}


var btnLeftId = "slideshowButtonLeft";
var btnRightId = "slideshowButtonRight";

function buttonsBuild(slideInfo) {
	$(slideInfo.slideTarget).prepend("<a class='" + buttonClassName + "' id='" + btnLeftId + "'><</a><a class='" + buttonClassName + "' id='" + btnRightId + "'>></a>");

}

///////////////////////////////////////

//Button Embedded 1.0 alpha
//Created by: dy55
//Aug.5 2019

var buttonClassName = "button";

var size = "30px";
var sizeSmall = "15px";

var fontSize = "25px";
var fontSizeSmall = "12.5px";

var bgColor = "#ffffff";
var color = "#000000";
var borderInfo = "0.6px black solid";

$(() => {
	$("." + buttonClassName).css({
		"width": size,
		"height": size,
		"border-radius": "50%",
		"background-color": bgColor,
		"color": color,
		"border": borderInfo,
		"display": "inline-block",
		"text-align": "center",
		"transition": "all 0.3s",
		"font-size": fontSize,
		"position": "relative"
	});

	addEventListener("resize", () => {
		if (window.innerWidth < 800 && $("." + buttonClassName).css("width") == size)
			$("." + buttonClassName).css({
				"width": sizeSmall,
				"height": sizeSmall,
				"font-size": fontSizeSmall
			});
		else if (window.innerWidth >= 800 && $("." + buttonClassName).css("width") == sizeSmall)
			$("." + buttonClassName).css({
				"width": size,
				"height": size,
				"font-size": fontSize
			});
	});
});

function hoverEffect(hoverTarget, mouseonAction, mouseleaveAction) {
	$(hoverTarget).mouseover(mouseonAction);
	$(hoverTarget).mouseleave(mouseleaveAction);
}

///////////////////////////////////////
/*
$(() => {
	$("." + buttonClassName).css({
		"opacity": "0"
	});
});*/