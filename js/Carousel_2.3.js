/*                          Carousel                        *
 *  Version: 2.3.1                                          *
 *  Created by: dy55                                        *
 *  Created date: Aug. 3, 2019 (v2.0)                       */

const defaultWidth = "60%";
const defaultHeight = "450px";

const pauseTime = 500;
const slideInterval = 5000 + pauseTime;

var initializing = "Initializing...";
var noImage = "No Image";
var learnMore = "Learn more";

var internalEventReference;

var playStatus;
const pause = "paused";
const play = "playing";

var carouselInfo = new Object;

var lang = "en";
//If you would like more local language code, just modify it directly.
//(if there exists the language file in your language at "lang" folder, please ingore it.)

function carouselRun(_targetPlusTheme, width, height, imageSrcs, anchorHrefs = new Array(),
	htBoardTexts = new Array(), _outline = true, playToggleBtn = true, mouseLeaveHideBtn = true,
	buttonsFilter = new Array(), htBoardFilter = new Array(), htBoardBackground = true,
	customLearnMoreContent = new Array()) {

	var tptArray = sliceTargetPlusTheme(_targetPlusTheme);

	carouselInfo = {
		carouselTarget: tptArray[0],
		curWidth: new String(),
		curHeight: new String(),
		curSlide: 1,
		imageArray: imageSrcs,
		anchorArray: anchorHrefs,
		htBoard: htBoardTexts,
		outline: _outline,
		playButton: playToggleBtn,
		filter: buttonsFilter,
		filterhtb: htBoardFilter,
		htBg: htBoardBackground,
		leaveHide: mouseLeaveHideBtn,
		customLearnMore: customLearnMoreContent,
		usedTheme: tptArray[1]
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

	//$(carousel.carouselTarget).attr("lang", lang);

	FormatSet();
	localeCheck();
	otherPreset();	//otherPreset()
	ProgressBarSetPut();
	Init();
	otherOperation();	//otherOperation()

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

	if (carouselInfo.usedTheme != "")
		$(carouselInfo.carouselTarget).addClass(carouselInfo.usedTheme);
	
}


const statusField = "statusField"; //Do NOT edit it.

function Init() {

	$(carouselInfo.carouselTarget).prepend("<span class='" + statusField + "'></span>");
	$(carouselInfo.carouselTarget + " ." + statusField).text(initializing);

	const rightArrowLearnMore = "rightArrowLearnMore"; //Do NOT edit it.

	$(carouselInfo.carouselTarget).prepend("<div class='infoBoard'></div><div class='playPause'></div><div class='" + buttonClassName + " turnBtn btnPrev'></div><div class='" + buttonClassName + " turnBtn btnNext'></div>");
	$(carouselInfo.carouselTarget + " .infoBoard").prepend("<div class='htBoard'></div>");
	if (carouselInfo.leaveHide)
		$(carouselInfo.carouselTarget + " .playPause, " + carouselInfo.carouselTarget + " .turnBtn").addClass("leaveHide");

	$(carouselInfo.carouselTarget + " .htBoard")
		.append("<a class='slideAnchor'><span class='learnmorespan'>" + learnMore + "</span><span class='" + rightArrowLearnMore + "'>></span></a>")
		.prepend("<div class='hText'></div>")
		.css({
		"background-color": () => {
			if (carouselInfo.htBg)
				return "rgba(0, 0, 0, 0.3)";
			else
				return "none";
		}
	});

	$(carouselInfo.carouselTarget + " .infoBoard").css({
		"position": "absolute",
		"width": carouselInfo.curWidth
	});

	$(carouselInfo.carouselTarget + " .playPause").css({
		"display": () => {
			if (carouselInfo.playButton)
				return "inline-block";
			else
				return "none";
		},
		"margin-top": parseFloat(carouselInfo.curHeight) * 3 / 4 + SliceToUnit(carouselInfo.curHeight)
	})
		.click(() => {
			carouselPlayToggle();
		});

	$(carouselInfo.carouselTarget + " .turnBtn").css({
		"margin-top": timesOfHeight(0.49),
		"z-index": "2"
	});

	$(carouselInfo.carouselTarget + " .btnPrev").click(() => {
		carouselPause();
		TurnPrev(false);
	});

	$(carouselInfo.carouselTarget + " .btnNext").click(() => {
		carouselPause();
		TurnNext(false);
	});

	TurnTo(carouselInfo.curSlide, carouselInfo);
	carouselPlay();

	$(carouselInfo.carouselTarget + " ." + statusField).text("");
	$(carouselInfo.carouselTarget).hover(() => {
		$(carouselInfo.carouselTarget + " .leaveHide").css({
			"opacity": "1"
		});
	},
		() => {
			$(carouselInfo.carouselTarget + " .leaveHide").css({
				"opacity": "0"
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
		"margin-top": timesOfHeight(1, -19)
	});
	var gap = 0.25;//%
	$(carouselInfo.carouselTarget + " ." + barClassName).css({
		"width": 100 / carouselInfo.imageArray.length - gap + "%",
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

		if (carouselInfo.filter[carouselInfo.curSlide - 1] != null)
			$(carouselInfo.carouselTarget + " .playPause, " + carouselInfo.carouselTarget + " .turnBtn").css({
				"filter": carouselInfo.filter[carouselInfo.curSlide - 1]
			});
		if (carouselInfo.filterhtb[carouselInfo.curSlide - 1] != null)
			$(carouselInfo.carouselTarget + " .htBoard").css({
				"filter": carouselInfo.filterhtb[carouselInfo.curSlide - 1]
			});

		checkimgurl();
		checklearnMore();
		checkhtText();
		setCustomLabel();

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
//Progress Bar Section

const barClassName = "progressBar"; //Do NOT edit it.

$(() => {

	$("." + barClassName).html("<div></div>");

});

///////////////////////////////////////

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

const buttonClassName = "button";//Do NOT edit it.

function buttonsBuild() {
	$(carouselInfo.carouselTarget).prepend("<a class='" + buttonClassName + "' id='" + btnLeftId + "'><</a><a class='" + buttonClassName + "' id='" + btnRightId + "'>></a>");

}

var pauseimgUrl = "url(../images/pause.png)";
var playimgUrl = "url(../images/start.png)";

function carouselPlay() {
	playStatus = play;
	$(carouselInfo.carouselTarget + " .playPause").css({
		"background-image": pauseimgUrl
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
	playStatus = pause;
	$(carouselInfo.carouselTarget + " .playPause").css({
		"background-image": playimgUrl
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

function setCustomLabel() {

	const lmtext = carouselInfo.customLearnMore[carouselInfo.curSlide - 1];

	if (lmtext != null && lmtext != "")
		$(carouselInfo.carouselTarget + " .learnmorespan").html(lmtext);
	else
		$(carouselInfo.carouselTarget + " .learnmorespan").html(learnMore);

}

//////////////////	Theme Editor	//////////////////

function sliceTargetPlusTheme(str) {
	const strTrim = str.trim();
	var i;
	var found = false;
	for (i = 0; i < strTrim.length; i++)
		if (strTrim[i] == "+") {
			found = true;
			break;
		}
	if(found)
		return [
			strTrim.substring(0, i - 1).trim(),
			strTrim.substring(i + 1).trim()
		];

	return [
		strTrim.trim(),
		""
	];
}
	
function themeClassNameAdj(str){
	if(str[0] == ".")
		return str.substring(1);
	return str;
}

///////////////////////////////////////////////////////

function localeCheck() {
	if ($("html").attr("lang") == null || $("html").attr("lang") != lang)
		$(carouselInfo.carouselTarget).attr("lang", lang);
}

//Additional Functions

function otherPreset(){}
function otherOperation(){}

/////////////////////