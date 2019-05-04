// JavaScript Document
//	<> by dy55	2019-5-2, 5-3, 5-4

/*	CAUTION: The script needs jQuery js-file to work in order	*/


var _width = 1250;			//  <- Edit width here	(Unit: px)
var _height = 500;			//  <- Edit height here	(Unit: px)


var BannerArray = new Array;
var AnchorArray = new Array;

//	Edit here ->

/*  You can change the number of the element in the arrays  */

BannerArray[0] = /* Enter Path here */;
BannerArray[1] = /* Enter Path here */;
BannerArray[2] = /* Enter Path here */;
BannerArray[3] = /* Enter Path here */;
BannerArray[4] = /* Enter Path here */;


AnchorArray[0] = /* Enter Path here */;
AnchorArray[1] = /* Enter Path here */;
AnchorArray[2] = /* Enter Path here */;
AnchorArray[3] = /* Enter Path here */;
AnchorArray[4] = /* Enter Path here */;

//	<- Edit here

var Interval_value = 5000;		            //	<- Edit Interval Here (Unit: ms)

var Return_Animation_Duration = 1000;       //  <- Edit Return Animation Duration here (Unit: ms)

var _Banner_Repeat = BannerArray.length;

var Pro_Width = _width / _Banner_Repeat;


//	STRUCTURE ->

$("#banner").width(_width);
$("#banner").height(_height);

$("#banner").html('<a><img /></a>');
$("#banner").append("<div>");
for(var i = 0; i < _Banner_Repeat; i++)
	$("#banner").append('<a class="Bottom_Anchors" id="Inner_Anchor_'+i+'"><progress></progress></a>');
$("#banner").append("</div>");

$("#banner > a").attr("href",AnchorArray[0]);
$("#banner img").attr("src",BannerArray[0]);
for(i = 0; i < _Banner_Repeat; i++)
	$("#Inner_Anchor_"+i).attr("href",AnchorArray[i]);
$("#banner progress").attr("class","Progress_bar");
$(".Progress_bar").attr("max",100);
$(".Progress_bar").attr("value",0);
$(".Progress_bar").width(Pro_Width);


//	<- STRUCTURE




//	LAYOUT ->

var Margin_adjust = -21.3;
var Distance = 0.8;
Pro_Width -= Distance;


$(".Bottom_Anchors").css("cursor","pointer");

$("#banner img").width(_width);
$("#banner img").height(_height);
$("#banner img").css("border-radius","5px");
$("#banner").css("border-radius","5px");
$("#banner").css("box-shadow","0px 0px 5px");
$("#banner").css("position","relative");
$("#banner").css("overflow","hidden");

$(".Progress_bar").css("margin-right",Distance+'px');
$(".Progress_bar").width(Pro_Width);
$(".Progress_bar").height(5);

$("#banner > div").css("margin-top",Margin_adjust+"px");

$("#banner > div").css("position","relative");

$("#banner :nth-child(n)").css("text-align","center");


//	<- LAYOUT


//	FUNCTIONS ->

var Cur_Slide = 1;


$(document).ready(function(){
    $("#Inner_Anchor_0 progress").animate({ value: 100 }, Interval_value, "linear");
    $("#Inner_Anchor_0 progress").animate({ value: 0 }, Return_Animation_Duration);
	setInterval(TurnTo_next,Interval_value);
});

function TurnTo(Slide_Number){
	Cur_Slide = Slide_Number;
    $("#Inner_Anchor_" + (Cur_Slide - 1) + " progress").animate({ value: 100 }, Interval_value, "linear");
    $("#Inner_Anchor_" + (Cur_Slide - 1) + " progress").animate({ value: 0 }, Return_Animation_Duration);
	for(var i = 0; i < _Banner_Repeat; i++)
		if(i >= Slide_Number - 1)
			$("#Inner_Anchor_"+i+" > progress").attr("value",0);
	$("#banner img").attr("src",BannerArray[Slide_Number-1]);
	$("#banner > a").attr("href",AnchorArray[Slide_Number-1]);
}

function TurnTo_next(){
	$("#banner > div > :first-child > progress").attr("value",100);
	if(Cur_Slide++ >= _Banner_Repeat){
		Cur_Slide = 1;
		for(var i = 0; i < _Banner_Repeat; i++)
			$("#Inner_Anchor_"+i+" progress").attr("value",0);
	}
	TurnTo(Cur_Slide);
}

//	<-	FUNCTIONS
