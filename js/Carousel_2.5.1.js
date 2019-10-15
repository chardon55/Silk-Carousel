/*                       Silk Carousel                      *
 *  Version: 2.5.1                                          *
 *  Created by: dy55                                        *
 *  Created date: Aug. 3, 2019 (v2.0)                       */

const defaultWidth = "60%";
const defaultHeight = "450px";

const pauseTime = 500;
const interval = 5000;
const slideInterval = interval + pauseTime;

var initializing = "Initializing...";
var noImage = "No Image";
var learnMore = "Learn more";

//Error Info
var cErr = "Error from carousel: ";

var errNoTarget = "No target";

var stopWithErr = "The carousel program has stopped";

////////////

var internalEventReference;

var playStatus;
var pause = "Paused";
var play = "Playing";
const statusBox = "statusBox";

var carouselInfo;

var lang = "en";
//If you would like more local language code, just modify it directly.
//(if there exists the language file in your language at "lang" folder, please ingore it.)

const defaultInfo = {
	_target: null,
	theme: null,
	width: "60%",
	height: "450px",
	imageSrcs: new Array,
	anchorHrefs: new Array,
	htBoardTexts: new Array,
	_outline: true,
	playToggleBtn: true,
	mouseLeaveHideBtn: true,
	buttonsFilter: new Array,
	htBoardFilter: new Array,
	htBoardBackground: true,
	customLearnMoreContent: new Array,
	startFrom: 1,
	progressBarFilters: new Array,
	showStatus: true
};

function carouselRun(info = {
	_target: new String,
	theme: new String,
	width: new String,
	height: new String,
	imageSrcs: new Array,
	anchorHrefs: new Array,
	htBoardTexts: new Array,
	_outline: new Boolean,
	playToggleBtn: new Boolean,
	mouseLeaveHideBtn: new Boolean,
	buttonsFilter: new Array,
	htBoardFilter: new Array,
	htBoardBackground: new Boolean,
	customLearnMoreContent: new Array,
	startFrom: new Number,
	progressBarFilters: new Array,
	showStatus: new Boolean
}) {

	//If the target variable was not been defined
	if (info._target == undefined || info._target == null) {
		errReport(errNoTarget, true, true);
		return;
	}

	carouselInfo = {
		carouselTarget: info._target,
		curWidth: info.width == undefined ? defaultInfo.width : info.width,
		curHeight: info.height == undefined ? defaultInfo.height : info.height,
		curSlide: info.startFrom == undefined ? defaultInfo.startFrom : info.startFrom,
		imageArray: info.imageSrcs == undefined ? defaultInfo.imageSrcs : info.imageSrcs,
		anchorArray: info.anchorHrefs == undefined ? defaultInfo.anchorHrefs : info.anchorHrefs,
		htBoard: info.htBoardTexts == undefined ? defaultInfo.htBoardTexts : info.htBoardTexts,
		outline: info._outline == undefined ? defaultInfo._outline : info._outline,
		playButton: info.playToggleBtn == undefined ? defaultInfo.playToggleBtn : info.playToggleBtn,
		filter: info.buttonsFilter == undefined ? defaultInfo.buttonsFilter : info.buttonsFilter,
		filterhtb: info.htBoardFilter == undefined ? defaultInfo.htBoardFilter : info.htBoardFilter,
		htBg: info.htBoardBackground == undefined ? defaultInfo.htBoardBackground : info.htBoardBackground,
		leaveHide: info.mouseLeaveHideBtn == undefined ? defaultInfo.mouseLeaveHideBtn : info.mouseLeaveHideBtn,
		customLearnMore: info.customLearnMoreContent == undefined ? defaultInfo.customLearnMoreContent : info.customLearnMoreContent,
		usedTheme: info.theme == undefined ? defaultInfo.theme : info.theme,
		barFilters: info.progressBarFilters == undefined ? defaultInfo.progressBarFilters : info.progressBarFilters,
		showStatus: info.showStatus == undefined ? defaultInfo.showStatus : info.showStatus
	}

	////

	FormatSet();
	localeCheck();
	otherPreset();      //otherPreset()
	ProgressBarSetPut();
	Init();
	otherOperation();   //otherOperation()

	////
}

function FormatSet() {
	$(carouselInfo.carouselTarget).css({
		"height": carouselInfo.curHeight,
		"width": carouselInfo.curWidth,
		"transition": "background " + pauseTime + "ms",
		"outline": carouselInfo.outline ? "1.5px black solid" : "none"
	});

	if (carouselInfo.usedTheme != null)
		$(carouselInfo.carouselTarget).addClass(carouselInfo.usedTheme);
	
}


const statusField = "statusField"; //Do NOT edit it.

function Init() {

	$(carouselInfo.carouselTarget).prepend("<span class='" + statusField + "'></span>")
		.addClass("silkCarousel");
	$(carouselInfo.carouselTarget + " ." + statusField).text(initializing);

	const rightArrowLearnMore = "rightArrowLearnMore"; //Do NOT edit it.

	$(carouselInfo.carouselTarget).prepend("<div class='infoBoard'></div><div class='playPause'></div><div class='" + buttonClassName + " turnBtn btnPrev'></div><div class='" + buttonClassName + " turnBtn btnNext'></div>");

	if(carouselInfo.showStatus)
		$(carouselInfo.carouselTarget).append("<div class='" + statusBox + "'></div>");

	$(carouselInfo.carouselTarget + " .infoBoard").prepend("<div class='htBoard'></div>");
	if (carouselInfo.leaveHide)
		$(carouselInfo.carouselTarget + " .playPause, " + carouselInfo.carouselTarget + " .turnBtn").addClass("leaveHide");

	$(carouselInfo.carouselTarget + " .htBoard")
		.append("<a class='slideAnchor'><span class='learnmorespan'>" + learnMore + "</span><span class='" + rightArrowLearnMore + "'>></span></a>")
		.prepend("<div class='hText'></div>")
		.css({
		"background-color": carouselInfo.htBg ? "rgba(0, 0, 0, 0.3)" : "none"
	});

	$(carouselInfo.carouselTarget + " .infoBoard").css({
		"position": "absolute",
		"width": carouselInfo.curWidth
	});

	$(carouselInfo.carouselTarget + " .playPause").css({
		"display": carouselInfo.playButton ? "inline-block" : "none",
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
		if (playStatus == pause)
			TurnPrev(false);
		else {
			barHalt();
			TurnPrev();
			setSlideInterval(slideInterval, true);
		}
	});

	$(carouselInfo.carouselTarget + " .btnNext").click(() => {
		if (playStatus == pause)
			TurnNext(false)
		else {
			barHalt();
			TurnNext();
			setSlideInterval(slideInterval, true);
		}
	});

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
	
	TurnTo(carouselInfo.curSlide, carouselInfo);
	carouselPlay(false);
}

var offset = 0;//%
function ProgressBarSetPut() {
	$(carouselInfo.carouselTarget).append("<div class='barSet'></div>");
	for (let i = 0; i < carouselInfo.imageArray.length; i++) {
		const cNum = i + 1;
		$(carouselInfo.carouselTarget + " > .barSet").append("<div class='" + barClassName + " bar" + i + "'></div>");
		
		$(carouselInfo.carouselTarget + " .bar" + i).click(() => {
			if (playStatus == pause)
				TurnTo(cNum, false);
			else {
				TurnTo(cNum);
				setSlideInterval(slideInterval, true);
			}
		});
	}

	$(carouselInfo.carouselTarget + " > .barSet").css({
		"margin-top": timesOfHeight(1, -19)
	});
	var gap = 0.25;//%
	$(carouselInfo.carouselTarget + " ." + barClassName).css({
		"width": 100 / carouselInfo.imageArray.length - gap + offset + "%",
		"margin-right": gap + "%"
	});
}

function SliceToUnit(str) {
	for (var i = 1; str[i] >= '0' && str[i] <= '9'; i++);
	return str.substring(i);
}

var barResetTimeout;

function TurnTo(toSlide, transitionBar = true) {

	barHalt();
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

		if (carouselInfo.barFilters[carouselInfo.curSlide - 1] != null) {
			$(carouselInfo.carouselTarget + " .barSet").css({
				"filter": carouselInfo.barFilters[carouselInfo.curSlide - 1]
			});
			$(carouselInfo.carouselTarget + " ." + statusBox).css({
				"filter": carouselInfo.barFilters[carouselInfo.curSlide - 1]
			});
		}
		
		checkimgurl();
		checklearnMore();
		checkhtText();
		setCustomLabel();

		barResetTimeout = setTimeout(() => {
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
			"transition": transitionBar ? "all " + interval + "ms linear" : "none"
		});

		$(carouselInfo.carouselTarget + " .bar" + (carouselInfo.curSlide - 1) + " > div").css({
			"width": "100%"
		});

	});

}

const btnLeftId = "CarouselButtonLeft";
const btnRightId = "CarouselButtonRight";

const buttonClassName = "button";//Do NOT edit it.

function buttonsBuild() {
	$(carouselInfo.carouselTarget).prepend("<a class='" + buttonClassName + "' id='" + btnLeftId + "'><</a><a class='" + buttonClassName + "' id='" + btnRightId + "'>></a>");

}

var pauseimgUrl = "url(../images/pause.png)";
var playimgUrl = "url(../images/start.png)";

var statusBoxTimeout;
var timeoutRefer;

function carouselPlay(resume = true) {
	playStatus = play;
	$(carouselInfo.carouselTarget + " .playPause").css({
		"background-image": pauseimgUrl
	});

	$(carouselInfo.carouselTarget + " ." + statusBox).text(playStatus);
	statusBoxTimeout = setTimeout(() => {
		$(carouselInfo.carouselTarget + " ." + statusBox).fadeOut();
	}, 1000);

	const bar = carouselInfo.carouselTarget + " .bar" + (carouselInfo.curSlide - 1);
	if (!resume || $(bar + " > div").width() >= $(bar).width() - parseFloat($(bar).css("border-width"))) {
		setSlideInterval(slideInterval);
		barResetTimeout = setTimeout(() => {
			barReset();
		}, pauseTime);
		TurnTo(carouselInfo.curSlide);
	}
	else {
		const bar = carouselInfo.carouselTarget + " .bar" + (carouselInfo.curSlide - 1);
		const remainTime = interval - widthToTime($(bar + " > div").width());
		$(bar + " > div").css({
			"width": "100%",
			"transition": remainTime + "ms linear"
		});
		timeoutRefer = setTimeout(() => {
			TurnNext();
			setSlideInterval(slideInterval, true);
		}, remainTime);
	}
}

function carouselPause() {
	playStatus = pause;
	$(carouselInfo.carouselTarget + " .playPause").css({
		"background-image": playimgUrl
	});
	clearInterval(internalEventReference);
	clearTimeout(barResetTimeout);
	clearTimeout(statusBoxTimeout);
	clearTimeout(timeoutRefer);
	barHalt();
	$(carouselInfo.carouselTarget + " ." + statusBox).fadeIn().text(playStatus);
}

function carouselPlayToggle() {
	if (playStatus == pause)
		carouselPlay();
	else
		carouselPause();
}

function checkimgurl() {
	const bgImg = $(carouselInfo.carouselTarget).css("background-image");
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
}

function checkhtText() {
	const htBoard = carouselInfo.htBoard[carouselInfo.curSlide - 1];
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
	const href = $(carouselInfo.carouselTarget + " .slideAnchor").attr("href");
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

function localeCheck() {
	if ($("html").attr("lang") == null || $("html").attr("lang") != lang)
		$(carouselInfo.carouselTarget).attr("lang", lang);
}

//Additional Functions

function otherPreset(){}     //This function is safe to be overwritten.
function otherOperation(){}  //This function is safe to be overwritten.

/////////////////////

function errReport(prompt, programWillStop = false, writeOut = false) {
	if (writeOut)
		document.writeln(cErr + prompt + programWillStop ? stopWithErr : "");
	else
		$(carouselInfo.carouselTarget + " ." + statusField).html(cErr + prompt + "<br>" + programWillStop ? stopWithErr : "");
}

////////////////////

function widthToTime(width) {
	const full = $(carouselInfo.carouselTarget + " > .barSet > ." + barClassName).width();
	const times = width / full;
	const time = interval * times;
	return time.toPrecision(1);
}

function setSlideInterval(intervalTime, reset = false) {
	if (reset)
		clearInterval(internalEventReference);
	internalEventReference = setInterval(() => {
		TurnNext();
	}, intervalTime);
}

function barHalt() {
	const barDiv = carouselInfo.carouselTarget + " .bar" + (carouselInfo.curSlide - 1) + " > div";
	$(barDiv).css({
		"width": $(barDiv).width(),
		"transition": "none"
	});
}