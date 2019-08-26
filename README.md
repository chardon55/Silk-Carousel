# Carousel (version 2.3.1)

## Intro & Features

This is a light-weight web app to build a carousel on the website.

The program is written in JavaScript and CSS.

---

> ### Update version 2.3.1
> 
> ***Carousel 2.3.1 is here!***
>
> Added 2 empty functions (otherPreset(), otherOperation()) for theme creation.
>
> Added a variable (playStatus) for developers to get the play status.
>
> #### Updates for Bundles
>
> Added a new theme scheme called "Loli Pink".

*The min files were created via HookyQR's Minify v0.4.3 for VS Code.*

The updates are coming. Thanks for your support!

---

## Tips

  - Make sure your HTML file has imported jQuery, because the script needs it
  - You can view the demo site to learn how to use it.
  - The demo code about how to use it as follow.

**Basic Use Demo**
	
```JavaScript
//               TARGET        THEME-CLASS-NAME   WIDTH   HEIGHT
carouselRun("#bannerCarousel + the-taste-of-sky", "76%", "500px", [
		"images/qd1.jpg",
		"images/qd2.jpg",
		"images/qd3.jpg",
		"images/qd4.jpg",
		"images/qd5.jpg",
		"images/qd6.jpg",
		"images/qd7.jpg"
	],
		[
			"images/qd1.jpg",
			"images/qd2.jpg",
			"#",
			"images/qd4.jpg",
			"images/qd5.jpg",
			"images/qd6.jpg",
			"#"
		], [
			"<label>Brio of Qingdao</label><h2>May 4th Square</h2>",
			"<h2>The old town in Qingdao</h2>",
			"<h2>Old German Style House</h2>",
			"<h2>The Christian Church in Qingdao</h2>",
			"<h2>Olympic Sailing Center</h2>",
			"<h2>Landing Stage</h2>",
			"Let's find the beauty of Qingdao together!",
		]);

//function overview
carouselRun(target_+_theme_class_name, width, height, images_array, [links_array], [hyper-text_board_content_array],[display_outline], [display_play/pause_button], [mouse_leave_to_hide_btn], [button_s_filter], [hyper-text_board_filter], [display_hyper-text_board_s_background], [learn_more_content_array]);
```
---

## Previous Updates

> ### Update version 2.3.0
>
> The new carousel 2.3.0 is here!
>
> The place displaying "learn more" can be custom.
>
> Custom appearance theme is available.
>
> A new theme scheme is available.
>
> #### Updates for Bundles
>
> New demo site has been added.

> ### Update version 2.2.0
>
> The update restarts to use CSS in order to optimize the source code and improve the accuracy of element selection.
>
> The carousel now can set filters for buttons on each slide.
>
> The carousel now can set filter for hyper-text board on each slide.
>
> The background of hyper-text board can be hidden now.
>
> The action hiding buttons when mouse leaves can be turned off now.
>
> #### Updates for bundles
>
> The file README.md now has changed to use markdown syntax instead of HTML one.

> ### Update version 2.1.2
>
> The source code has been optimized.
>
> The margin of the text at ht-board has been optimized.
>
> The new demo site has been up for test.

> ### Update version 2.1.1
>
> Progress bars have been optimized since the version 2.1.1.
>
> The appearance of play/pause switch has been optimized.
>
> New buttons have been added.

> ### Update version 2.1.0
>
> The new play/pause switch is now on test.
>
> Algorithms have been optimized.

> ### Update version 2.0 (& 2.0 betas)
>
> Recoded the whole program.
>
> Lambda Expressions are used in new version's code to make it more fluent and natural.
>
> The method for it to define width and height has changed, which supports responsive interface.

*The updates before v2.0 are not been showed.*