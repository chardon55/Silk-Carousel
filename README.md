# Slideshow_Banner
This repository contains script for making an HTML banner that can do slideshow.

<p>The Slideshow 2.0 beta version has finally come!</p>
<p>The code at 2.0 beta is completely different with previous version.</p>
<p>Thanks for your support!</p>

<i>The old version has updated to 1.2.0, whose code and function structure has been changed.</i>

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
	SlideRun("#Slide", "60%", "450px", [	//IMAGES
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
