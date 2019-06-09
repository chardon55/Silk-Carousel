# Slideshow_Banner
This repository contains script for making an HTML banner that can do slideshow.

<b>The version 1.1 has finally come!</b><br>
<b>Thanks for your support!</b><br>
<b><i>The version 2.0 will come soon.</i></b>

<i>There are many problems in the script. I'm trying to improve its compatibility. I'm sorry for it.</i>

<h2>Tips to use it:</h2>
<ul>
  <li>Make sure your HTML file has imported jQuery, because the script needs it</li>
  <li>You can change how many elements in the arrays are, because the script will adjust the banner depending on it</li>
  <li>The demo code about how to use it as follow.</li>
  <li>You can view the demo site to learn the example about how to use it.</li>
</ul>

<code>
	//	The number of the element in the array can be changed
			
	_width = 1000;				// <- Custom width	default:1250
	_height = 480;				// <- Custom height default:500

	Interval_value = 5000;		//	<- Interval		default: 5000ms

	BannerArray[0] = "#";
	BannerArray[1] = "#";
	BannerArray[2] = "#";
	BannerArray[3] = "#";
	BannerArray[4] = "#";

	AnchorArray[0] = "#";
	AnchorArray[1] = "#";
	AnchorArray[2] = "#";
	AnchorArray[3] = "#";
	AnchorArray[4] = "#";

	Slide_Run(/*	String of Tag/ID/Class	*/);
</code>
