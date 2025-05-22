
$('#me-modal-btn').click(function(e) {
	 $('#me-modal').css("display", "block");
 $('.shakeysbody').css("display", "none");
    $('html, body').scrollTop( $("#me-modal").offset().top);

 });

$('.me-menu-top-close-btn').click(function(e) {
	 $('#me-modal').css("display", "none");
 $('.shakeysbody').css("display", "block");

 });








var elements = document.getElementsByClassName('services-ms-news');

var elementHeights = Array.prototype.map.call(elements, function(el)  {
  return el.clientHeight;
});

var maxHeight = Math.max.apply(null, elementHeights);

Array.prototype.forEach.call(elements, function(el) {
  el.style.height = maxHeight + "px"
});









$(function sugoi2() {
	$(".csc-body-left-scroll").scroll(function() {
		if ($(".csc-body-left-scroll").scrollTop() > 1) {
			$(".csc-title-country").addClass("csc-shadow");
		} else {
			$(".csc-title-country").removeClass("csc-shadow");
		}
	});
});



$(function sugoitrio() {
	$(".csc-body-trio-scroll").scroll(function() {
		if ($(".csc-body-trio-scroll").scrollTop() > 1) {
			$(".branchesss-lbc-trio-div").addClass("csc-shadow");
		} else {
			$(".branchesss-lbc-trio-div").removeClass("csc-shadow");
		}
	});
});




$(window).scroll(function () { 
var newSize = $(window).scrollTop()/0.8;
  $('.scrollhand').css({left:newSize});
});








$(document).ready(function() {
$(".scrollhand").css({"right":"-600px"}).animate({"right":"0px"}, "slow");
 });




$(window).scroll(function () { 
var newSize2 = $(window).scrollTop()/2;
  $('.scrollhand2').css({top:newSize2});
});

$(document).ready(function() {
$(".scrollhand2").css({"bottom":"-600px"}).animate({"bottom":"0px"}, "slow");
 });











