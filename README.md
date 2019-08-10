# Carousel
<h4>This repository contains script for making an js carousel.</h4>
<br>
<p>The Carousel version 2.0 beta has finally come!</p>
<p>The algorithm has been changed to adapt to some testing features.</p>
<p>Added play/pause button for test.</p>
<p>"Learn more" button has been formattedly modified.</p>
<br>
<p>Lambda Expressions are used in new version's code to make it more fluent and natural.</p>
<p>The method for it to define width and height has changed, which supports responsive interface.</p>
<br>
<p>The update is coming. Thanks for your support!</p>

<hr>
<h2>Tips to use it:</h2>
<ul>
  <li>Make sure your HTML file has imported jQuery, because the script needs it</li>
  <li>You can change how many elements in the arrays are, because the script will adjust the banner depending on it</li>
  <li>The demo code about how to use it as follow.</li>
  <li>You can view the demo site to learn the example about how to use it.</li>
</ul>

<code>

	//	The number of the element in the array can be changed
	//		  TARGET   WIDTH   HEIGHT
	carouselRun("#Slide", "60%", "450px", [	//IMAGES
		"Demo_imgs/InternChina-Qingdao-coast-at-night.jpg",
		"Demo_imgs/Qingdao-China.jpg",
		"Demo_imgs/a191fb_f9d0d32934a341138b3f439df2e17261.jpg_srz_1532_1021_85_22_0.50_1.20_0.jfif.jpg",
		"Demo_imgs/b083fe955a7417b503fd01.jpg",
		"Demo_imgs/qingdao03.jpg"
	], [	//LINKS
		"#",
		"#",
		"#",
		"#",
		"#"
	]);
</code>
