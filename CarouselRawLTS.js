/*                          Carousel                        *
 *  Edition: Long-Term Service                              *
 *  Version: 2                                              *
 *  Created by: dy55                                        *
 *  Created date: Aug. 11, 2019                             */
//  This file is targeted on sites importing http address of the raw of it directly.
//  LTS file will not be renamed, moved or deleted, unless there is something forces to do them compulsorily.

var defaultWidth = "60%";
var defaultHeight = "450px";

var pauseTime = 500;
var slideInterval = 5000 + pauseTime;

var initializing = "Initializing...";
var noImage = "No Image";
var learnMore = "Learn more";

//var webkitPara = 70;
//var thisBrowserPara = window.outerHeight - window.innerHeight;

var internalEventReference;

var carouselInfo;

$(() => {

});


function carouselRun(_target, width, height, imageSrcs, anchorHrefs, htBoardTexts = new Array(), _outline = true, playToggleBtn = true) {

	carouselInfo = {
		carouselTarget: _target,
		curWidth: new String(),
		curHeight: new String(),
		curSlide: 1,
		imageArray: imageSrcs,
		anchorArray: anchorHrefs,
		htBoard: htBoardTexts,
		outline: _outline,
		playButton: playToggleBtn
	}

	if (width == null)
		carouselInfo.curWidth = defaultWidth;
	else
		carouselInfo.curWidth = width;
	if (height == null)
		carouselInfo.curHeight = defaultHeight;
	else
		carouselInfo.curHeight = height;
	////

	FormatSet();
	ProgressBarSetPut();
	//buttonsBuild();
	Init();

	////
}

function FormatSet() {
	$(carouselInfo.carouselTarget).css({
		"height": carouselInfo.curHeight,
		"width": carouselInfo.curWidth,
		"background-position": "center",
		"background-size": "cover",
		"transition": "background " + pauseTime + "ms",
		"overflow": "hidden",
		"outline": () => {
			if (carouselInfo.outline)
				return "1.5px black solid";
			else
				return "none";
		}
	});
}


var statusField = "statusField";

function Init() {

	$(carouselInfo.carouselTarget).prepend("<span class='" + statusField + "'></span>");
	$(carouselInfo.carouselTarget + " ." + statusField).text(initializing)
		.css({
			"position": "absolute",
			"color": "#ff0000",
			"z-index": "0",
			"font-weight": "bold",
			"font-size": "120%"
		});

	var rightArrowLearnMore = "rightArrowLearnMore";

	$(carouselInfo.carouselTarget).prepend("<div class='infoBoard'></div><div class='playPause leaveHide'></div><div class='" + buttonClassName + " turnBtn btnPrev leaveHide'></div><div class='" + buttonClassName + " turnBtn btnNext leaveHide'></div>");
	$(carouselInfo.carouselTarget + " .infoBoard").prepend("<div class='htBoard'></div>");

	$(carouselInfo.carouselTarget + " .htBoard").append("<a class='slideAnchor'>" + learnMore + "<span class='" + rightArrowLearnMore + "'>></span></a>")
		.prepend("<div class='hText'></div>")
		.css({
			"color": "white",
			"padding": "1%",
			"font-family": "Calibri, DengXian, 'HGGothicM'"
		});


	$(carouselInfo.carouselTarget + " .leaveHide").css({
		"opacity": "0"
	});

	var anchorColor = "white";

	$(carouselInfo.carouselTarget + " .infoBoard").css({
		"position": "absolute",
		"width": carouselInfo.curWidth
	});

	$(carouselInfo.carouselTarget + " .slideAnchor").css({
		"padding": "1%",
		"text-align": "center",
		"color": anchorColor,
		"position": "relative",
		"transition": "all 0.3s",
		"text-decoration": "none",
		"margin-top": "1%"
	});
	$(carouselInfo.carouselTarget + " ." + rightArrowLearnMore).css({
		"position": "relative",
		"margin-left": "5px",
		"display": "inline-block",
		"transition": "all 0.3s"
	});

	hoverEffect(carouselInfo.carouselTarget + " .slideAnchor",
		() => {
			$(carouselInfo.carouselTarget + " .slideAnchor").css({
				"text-decoration": "underline"
			});
			$(carouselInfo.carouselTarget + " ." + rightArrowLearnMore).css({
				"transform": "translateX(5px)"
			});
		},
		() => {
			$(carouselInfo.carouselTarget + " .slideAnchor").css({
				"text-decoration": "none"
			});
			$(carouselInfo.carouselTarget + " ." + rightArrowLearnMore).css({
				"transform": "translateX(0px)"
			});
		});


	$(carouselInfo.carouselTarget + " .playPause").css({
		"display": () => {
			if (carouselInfo.playButton)
				return "inline-block";
			else
				return "none";
		},
		"margin-top": "1%",
		"width": "50px",
		"height": "35px",
		"transition": "all 0.3s",
		"cursor": "pointer",
		"background-color": "#ffffff",
		"position": "absolute",
		"margin-top": parseFloat(carouselInfo.curHeight) * 3 / 4 + SliceToUnit(carouselInfo.curHeight),
		"box-shadow": "1px 0 6px black",
		"background-size": "32%",
		"background-position": "center",
		"background-repeat": "no-repeat",
		"border-radius": "0 17.5px 17.5px 0",
		"z-index": "2"
	})
		.click(() => {
			carouselPlayToggle();
		});

	$(carouselInfo.carouselTarget + " .htBoard").css({
		"background-color": "rgba(0, 0, 0, 0.3)",
		"min-height": "20px",
		"width": "90%"
	});

	$(carouselInfo.carouselTarget + " .turnBtn").css({
		"margin-top": timesOfHeight(0.49),
		"z-index": "2"
	});

	$(carouselInfo.carouselTarget + " .btnPrev").css({
		"float": "left",
		"background-image": "url(../images/prev.png)",
		"background-size": "cover",
		"background-repeat": "no-repeat",
		"background-position": "center"
	}).click(() => {
		carouselPause();
		TurnPrev(false);
	});

	$(carouselInfo.carouselTarget + " .btnNext").css({
		"float": "right",
		"background-image": "url(../images/prev.png)",
		"transform": "rotate(180deg)",
		"background-size": "cover",
		"background-repeat": "no-repeat",
		"background-position": "center"
	}).click(() => {
		carouselPause();
		TurnNext(false);
	});

	TurnTo(carouselInfo.curSlide, carouselInfo);
	carouselPlay();

	$(carouselInfo.carouselTarget + " ." + statusField).text("");

	hoverEffect(carouselInfo.carouselTarget,
		() => {
			$(carouselInfo.carouselTarget + " .leaveHide").css({
				"opacity": "1"
			});
		},
		() => {
			$(carouselInfo.carouselTarget + " .leaveHide").css({
				"opacity": "0"
			});
		});

	hoverEffect(carouselInfo.carouselTarget + " .playPause",
		() => {
			$(carouselInfo.carouselTarget + " .playPause").css({
				"background-color": "#e0e0e0"
			});
		},
		() => {
			$(carouselInfo.carouselTarget + " .playPause").css({
				"background-color": "#ffffff"
			});
		});
}

function ProgressBarSetPut() {
	$(carouselInfo.carouselTarget).append("<div class='barSet'></div>");
	for (var i = 0; i < carouselInfo.imageArray.length; i++) {
		const cNum = i + 1;
		$(carouselInfo.carouselTarget + " > .barSet").append("<div class='" + barClassName + " bar" + i + "'></div>");
		
		$(carouselInfo.carouselTarget + " .bar" + i).click(() => {
			carouselPause();
			TurnTo(cNum, false);
		});
	}

	$(carouselInfo.carouselTarget + " > .barSet").css({
		"height": "3%",
		"display": "relative",
		"width": "100%",
		"margin-top": timesOfHeight(1, -19),
		"z-index": "1",
		"cursor": "pointer"
	});
	var gap = 0.25;//%
	$(carouselInfo.carouselTarget + " ." + barClassName).css({
		"display": "relative",
		"height": "100%",
		"width": 100 / carouselInfo.imageArray.length - gap + "%",
		"display": "inline-block",
		"margin-right": gap + "%"
	});
}

function SliceToUnit(str) {
	for (var i = 1; str[i] >= '0' && str[i] <= '9'; i++);
	return str.substring(i);
}

function TurnTo(toSlide, transitionBar = true) {
	carouselInfo.curSlide = toSlide;

	$(() => {

		$(carouselInfo.carouselTarget).css("background-image", "url(" + carouselInfo.imageArray[toSlide - 1] + ")");
		$(carouselInfo.carouselTarget + " .slideAnchor").attr("href", carouselInfo.anchorArray[toSlide - 1]);

		checkimgurl();
		checklearnMore();
		checkhtText();


		setTimeout(() => {
			barReset(transitionBar);
		}, pauseTime);
	});
}

function TurnNext(transitionBar = true) {
	if (++carouselInfo.curSlide > carouselInfo.imageArray.length)
		TurnTo(1, transitionBar);
	else
		TurnTo(carouselInfo.curSlide, transitionBar);
}

function TurnPrev(transitionBar = true) {
	if (--carouselInfo.curSlide < 1)
		TurnTo(carouselInfo.imageArray.length, transitionBar);
	else
		TurnTo(carouselInfo.curSlide, transitionBar);
}

///////////////////////////////////////
//progress bar embedded v1.1
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
		"height": "100%",
		"width": "0",
		"z-index": "2"
	});

}

///////////////////////////////////////

var firstTime = true;

function barReset(transitionBar = true) {

	$(() => {

		$(carouselInfo.carouselTarget + " ." + barClassName + " > div").css({
			"transition": "none",
			"width": "0"
		});

		$(carouselInfo.carouselTarget + " .bar" + (carouselInfo.curSlide - 1) + " > div").css({
			"transition": () => {
				if (transitionBar)
					return "all " + (slideInterval - pauseTime) + "ms linear";
				else
					return "none";
			}
		});

		if (firstTime) {
			if (!isEdge()) {
				////Transition Effect Adjustment Buffer
				var offsetTime = 0;
				while ($(carouselInfo.carouselTarget + " .bar" + (carouselInfo.curSlide - 1) + " > div").css("transition") != "all " + (slideInterval - offsetTime) + "ms linear"
					&&
					offsetTime < slideInterval) {
					setTimeout(() => {

						$(carouselInfo.carouselTarget + " .bar" + (carouselInfo.curSlide - 1) + " > div").css({
							"transition": "all " + (slideInterval - offsetTime - pauseTime) + "ms linear"
						});

					}, offsetTime += 200)
				}
				delete offsetTime;
				////
			}
			else {
				
			}
			firstTime = false;
		}

		$(carouselInfo.carouselTarget + " .bar" + (carouselInfo.curSlide - 1) + " > div").css({
			"width": "100%"
		});

	});

}

function isEdge() {
	return navigator.userAgent.includes("Edge") || navigator.userAgent.includes("Chrome / 70.0.3538.102");
}


var btnLeftId = "CarouselButtonLeft";
var btnRightId = "CarouselButtonRight";

function buttonsBuild() {
	$(carouselInfo.carouselTarget).prepend("<a class='" + buttonClassName + "' id='" + btnLeftId + "'><</a><a class='" + buttonClassName + "' id='" + btnRightId + "'>></a>");

}

///////////////////////////////////////

//Button Embedded 1.0
//Created by: dy55
//Aug.5 2019

var buttonClassName = "button";

var size = "42px";
var sizeSmall = "30px";

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
		"display": "inline-block",
		"text-align": "center",
		"font-size": fontSize,
		"cursor": "pointer",
		"box-shadow": "0 0 3px"
	});

	setTimeout(() => {
		$("." + buttonClassName).css("transition", "all 0.3s");
	}, 10);

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

function carouselPlay() {
	$(carouselInfo.carouselTarget + " .playPause").css({
		"background-image": "url(../images/pause.png)"
	});

	internalEventReference = setInterval(() => {
		TurnNext();
	}, slideInterval);
	setTimeout(() => {
		barReset();
	}, pauseTime);
	TurnTo(carouselInfo.curSlide);
}

function carouselPause() {
	$(carouselInfo.carouselTarget + " .playPause").css({
		"background-image": "url(../images/start.png)"
	});
	clearInterval(internalEventReference);
	internalEventReference = null;
	$(carouselInfo.carouselTarget + " .bar" + (carouselInfo.curSlide - 1) + " > div").css({
		"width": "100%",
		"transition": "none",
		"background-position": "center"
	});
}

function carouselPlayToggle() {
	if (internalEventReference == null)
		carouselPlay();
	else
		carouselPause();
}

function checkimgurl() {

	//
	var bgImg = $(carouselInfo.carouselTarget).css("background-image");
	if (bgImg == 'url("' + document.URL + '")'
		||
		bgImg == 'url("' + document.URL + '#")'
		||
		bgImg == ""
		||
		bgImg == "#")
		$(carouselInfo.carouselTarget + " ." + statusField).text(noImage);
	else
		$(carouselInfo.carouselTarget + " ." + statusField).text("");
	//

}

function checkhtText() {
	var htBoard = carouselInfo.htBoard[carouselInfo.curSlide - 1];
	if ((htBoard == null || htBoard == "" || htBoard == undefined) && $(carouselInfo.carouselTarget + " .slideAnchor").css("display") == "none")
		$(carouselInfo.carouselTarget + " .htBoard").fadeOut();
	else
		$(carouselInfo.carouselTarget + " .htBoard").fadeIn();

	if (htBoard != undefined)
		$(carouselInfo.carouselTarget + " .hText").html(carouselInfo.htBoard[carouselInfo.curSlide - 1]);
	else
		$(carouselInfo.carouselTarget + " .hText").html("");
}

function checklearnMore() {
	var href = $(carouselInfo.carouselTarget + " .slideAnchor").attr("href");
	if (href == "#" || href == "" || href == null)
		$(carouselInfo.carouselTarget + " .slideAnchor").css("display", "none");
	else
		$(carouselInfo.carouselTarget + " .slideAnchor").css("display", "inline-block");
}

function timesOfWidth(times, offset = 0) {
	return parseFloat(carouselInfo.curWidth) * times + offset + SliceToUnit(carouselInfo.curWidth);
}

function timesOfHeight(times, offset = 0) {
	return parseFloat(carouselInfo.curHeight) * times + offset + SliceToUnit(carouselInfo.curHeight);
}