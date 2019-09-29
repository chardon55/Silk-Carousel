//Loli Pink Theme Scheme
//2019-8-26
//for Carousel v2.3.1+
//v1.0.3
//This theme needs bootstrap to work properly

var pausemouseover = "url(../images/loli-pink/pause/pause-mo.png)";
var playmouseover = "url(../images/loli-pink/play/play-mo.png)";

var pausemousedown = "url(../images/loli-pink/pause/pause-md.png)";
var playmousedown = "url(../images/loli-pink/play/play-md.png)";

function otherPreset() {
	pauseimgUrl = "url(../images/loli-pink/pause/pause-ml.png)";
	playimgUrl = "url(../images/loli-pink/play/play-ml.png)";
}

function otherOperation() {

	var playPause = carouselInfo.carouselTarget + " .playPause";

	$(playPause).hover(
		() => {
			if (playStatus != pause)
				$(playPause).css("background-image", pausemouseover);
			else
				$(playPause).css("background-image", playmouseover);
		},
		() => {
			if (playStatus != pause)
				$(playPause).css("background-image", pauseimgUrl);
			else
				$(playPause).css("background-image", playimgUrl);
		}
	)
		.mousedown(
			() => {
				if (playStatus != pause)
					$(playPause).css("background-image", pausemousedown);
				else
					$(playPause).css("background-image", playmousedown);
			}
	);
}