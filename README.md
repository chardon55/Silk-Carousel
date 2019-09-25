# 🎀 Silk Carousel 🎀

![Version_2.4.0](.github/info/version.svg)

[![Donate_PayPal](.github/info/donatePaypal.svg)](https://paypal.me/dy55)
[![Donate_Alipay](.github/info/donateAlipay.svg)](.github/info/alipayQR_dy55.jpg)
[![Donate_WeChat](.github/info/donateWechat.svg)](.github/info/wechatQR_dy55.png)

**<> with 💗 by dy55**

## ✨ Intro & Features ✨

A light-weight web app which builds a carousel on the website.

The program is written in JavaScript and CSS.

***

*The min files were created via Minify for VS Code v0.4.3 and MinifyAll for VS Code 1.3.4*

The updates are coming. Thanks for your support!

**💖It will be so nice with your donation! (but you don't have to :) )💖**

> ### Update version 2.4.0
>
> **Silk 2.4.0 is here.**
>
> The parameter list of carouselRun() has been completely changed.
>
> Added error report program.
>
> Progress bars' filters is now available.

***

## 📚 Tips 📚

  - Make sure your HTML file has imported jQuery, because the script needs it
  - You can view the demo site to learn how to use it.
  - The demo code about how to use it as follow.

**Basic Use Demo 💻**
	
```JavaScript
carouselRun({
			_targetPlusTheme: "#bannerCarousel + the-taste-of-sky",
			width: "80%",
			height: "550px",
			imageSrcs: [
				"images/qd1.jpg",
				"images/qd2.jpg",
				"images/qd3.jpg",
				"images/qd4.jpg",
				"images/qd5.jpg",
				"images/qd6.jpg",
				"images/qd7.jpg"
			],
			anchorHrefs: [
				"images/qd1.jpg",
				"images/qd2.jpg",
				"#",
				"images/qd4.jpg",
				"images/qd5.jpg",
				"images/qd6.jpg",
				"#"
			],
			htBoardTexts: [
				"<label>Brio of Qingdao</label><h2>May 4th Square</h2>",
				"",
				"",
				"<h2>Christian Church in Qingdao</h2>",
				"<h2>Olympic Sailing Center</h2>",
				"<h2>Landing Stage</h2>",
				"Let's find the beauty of Qingdao together!",
			]});

//function overview
function carouselRun(info = {
	_targetPlusTheme: new String,        //Target Name + Theme Class Name
	width: new String,                   //Width (Default: "60%")
	height: new String,                  //Height (Default: "450px")
	imageSrcs: new Array,                //Images URLs Array
	anchorHrefs: new Array,              //Links Hrefs Array
	htBoardTexts: new Array,             //Hyper-text Board Contents for Each Slide
	_outline: new Boolean,               //Show Outline (Default: true)
	playToggleBtn: new Boolean,          //Show Play/Pause Button (Default: true)
	mouseLeaveHideBtn: new Boolean,      //Hide Buttons When Mouse Leaves (Default: true)
	buttonsFilter: new Array,            //Buttons' Filters for Each Slide
	htBoardFilter: new Array,            //Hyper-text Board Filters for Each Slide
	htBoardBackground: new Boolean,      //Show Background of the Hyper-text Board (Default: true)
	customLearnMoreContent: new Array,   //Custom Content of "Learn More" Button for Each Slide
	startFrom: new Object,               //Start from Which Slide (Default: 1)
	progressBarFilters: new Array        //Progress Bars' Filters for Each Slide
}){...}

```
