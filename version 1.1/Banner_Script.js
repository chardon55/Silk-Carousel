// Slide Banner Script (GitHub Edition)
//	<> by dy55	2019-5-2, 5-3, 5-4, 5-19, 8-4
//  Version: 1.2.0

/*	CAUTION: The script needs jQuery js-file to work in order	*/


var _width = 1250;			//  <- Width (Default: 1250)
var _height = 500;			//  <- Height(Default: 500)


var BannerArray = new Array;
var AnchorArray = new Array;


var Interval_value = 5000;		//	<- Interval (Default: 5000ms)

var _Banner_Repeat = 0;
var Pro_Width = 0;


var Cur_Slide = 1;


var Margin_adjust = -21.3;
var Distance = 0.8;

var Slide_ID = null;


function Slide_Run(Slide_id, width = 1250, height = 500, banners = new Array(), anchors = new Array()) {

	_width = width;
	_height = height;
	BannerArray = banners;
	AnchorArray = anchors;

	Slide_ID = Slide_id;

    _Banner_Repeat = BannerArray.length;

    Pro_Width = _width / _Banner_Repeat;


    Cur_Slide = 1;

    $(Slide_id).width(_width);
    $(Slide_id).height(_height);

    $(Slide_id).html('<a><img /></a>');
    $(Slide_id).append("<div>");
    for (var i = 0; i < _Banner_Repeat; i++)
        $(Slide_id).append('<a class="Bottom_Anchors" id="Inner_Anchor_' + i + '"><progress></progress></a>');
    $(Slide_id).append("</div>");

    $(Slide_id + " > a").attr("href", AnchorArray[0]);
    $(Slide_id + " img").attr("src", BannerArray[0]);
    for (i = 0; i < _Banner_Repeat; i++)
        $("#Inner_Anchor_" + i).attr("href", AnchorArray[i]);
    $(Slide_id + " progress").attr("class", "Progress_bar");
    $(".Progress_bar").attr("max", 100);
    $(".Progress_bar").attr("value", 0);
    $(".Progress_bar").width(Pro_Width);


    Pro_Width -= Distance;


    $(".Bottom_Anchors").css("cursor", "pointer");

    $(Slide_id + " img").width(_width);
    $(Slide_id + " img").height(_height);
	$(Slide_id + " img").css("border-radius", "5px");
	$(Slide_id).css({
		"border-radius": "5px",
		"box-shadow": "0px 0px 5px",
		"position": "relative",
		"overflow": "hidden"
	});

    $(".Progress_bar").css("margin-right", Distance + 'px');
    $(".Progress_bar").width(Pro_Width);
    $(".Progress_bar").height(5);

    $(Slide_id + " > div").css("margin-top", Margin_adjust + "px");

    $(Slide_id + " > div").css("position", "relative");

    $(Slide_id + " *").css("text-align", "center");


    $("#Inner_Anchor_0 progress").animate({ value: 100 }, Interval_value, "linear");
    $("#Inner_Anchor_0 progress").animate({ value: 0 }, 1000);
    setInterval(TurnTo_next, Interval_value);
}


function TurnTo_next() {
    $(Slide_ID + " > div > :first-child > progress").attr("value", 100);
    if (Cur_Slide++ >= _Banner_Repeat) {
        Cur_Slide = 1;
        for (var i = 0; i < _Banner_Repeat; i++)
            $("#Inner_Anchor_" + i + " progress").attr("value", 0);
    }
    TurnTo(Cur_Slide);
}

function TurnTo(Slide_Number){
	Cur_Slide = Slide_Number;
    $("#Inner_Anchor_" + (Cur_Slide - 1) + " progress").animate({ value: 100 }, Interval_value, "linear");
    $("#Inner_Anchor_" + (Cur_Slide - 1) + " progress").animate({ value: 0 }, 1000);
	for(var i = 0; i < _Banner_Repeat; i++)
		if(i >= Slide_Number - 1)
			$("#Inner_Anchor_"+i+" > progress").attr("value",0);
    $(Slide_ID + " img").attr("src", BannerArray[Slide_Number - 1]);
    $(Slide_ID + " > a").attr("href", AnchorArray[Slide_Number - 1]);
}

