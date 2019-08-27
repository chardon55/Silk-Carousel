# Silk Carousel (version 2.3.1 update 2)

## Intro & Features

A light-weight web app to build a carousel on the website.

The program is written in JavaScript and CSS.

---

> ### Update version 2.3.1u02
>
> The program has been renamed as "Silk".
>
> The less edition style sheet is now on test.
>
> **\*NOTE\* less.js will not work properly on Chrome while the site is opened as local file.**
>
> Added themes dictionaries in Chinese, Japanese and English.

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