/*
var input = document.getElementById( 'careerupload2022' );
var infoArea = document.getElementById( 'file-upload-filename' );

input.addEventListener( 'change', showFileName );

function showFileName( event ) {

// the change event gives us the input it occurred in
var input = event.srcElement;

// the input has an array of files in the `files` property, each one has a name that you can use. We're just using the name here.
var fileName = input.files[0].name;

// use fileName however fits your app best, i.e. add it into a div
infoArea.textContent = 'File name: ' + fileName;
}

*/






$('.autoplay-1').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  dots: true,
});





$(window).on("resize", function(e) {
  checkScreenSize();
});

checkScreenSize();

function checkScreenSize() {
  var newWindowWidth = $(window).width();
  if (newWindowWidth < 481) {
    $('.aboutus-autoplay-3').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      dots: true,
    });
  } else {
    $('.aboutus-autoplay-3').slick({
      slidesToShow: 3,
      slidesToScroll: 3,
      autoplay: true,
      autoplaySpeed: 2000,
      dots: true,
    });
  }
}





/*modal*/

$('.proudka-v2-popup').click(function(e) {
     $('.proudka-v2-video-container').show();
     $('.proudka-v2-popup-sh').hide();
 });

 $('.proudka-v2-x-button').click(function(e) {
      $('.proudka-v2-video-container').hide();
      $('.proudka-v2-popup-sh').show();
  });

  /*end modal*/






/*  select 1  */
$(document).on("click", '.careersv2-select-sets-drop-1', function (e) {
//$('.careersv2-select-sets-drop-1').click(function(e){
  if ( $(this).hasClass('actlive') ) {
      $(this).removeClass('actlive');
  } else {

      $('.careersv2-select-sets-drop-1.actlive').removeClass('actlive');
   $(this).addClass('actlive');


   $('.careers-sets-contain-1').show();
    e.stopPropagation();
  }

  $(".careers-sets-contain-2").hide();
    $('.careersv2-select-sets-drop-2.actlive').removeClass('actlive');
  $(".careers-sets-contain-3").hide();
    $('.careersv2-select-sets-drop-3.actlive').removeClass('actlive');



});

$(document).click(function(){
    $(".careers-sets-contain-1").hide();
      $('.careersv2-select-sets-drop-1.actlive').removeClass('actlive');

});

$(document).on("click", '.careers-sets-contain-1', function (e) {
//$('.careers-sets-contain-1').click(function(e){
  e.stopPropagation();
});

  

$(document).on("click", '.careersv2-wahp-1', function (e) {  
//$('.careersv2-wahp-1').click(function(e){
  $('.careersv2-select-sets-drop-1.actlive').removeClass('actlive');
     //$('.pTest').text($(this).text());
  $('.careersv2-exttitle-date').html($(this).html());

    //alert($(this).text());
   //$('.ext-sets').slideToggle("slow");

   $(".inputCareerPositionLocation").val($(this).find(".val_career_position_city_id").html());
  listCareerPositionData();  


   $('.careers-sets-contain-1').hide();
    e.stopPropagation();
});
/*end select 1  */




/*  select 2  */
$(document).on("click", '.careersv2-select-sets-drop-2', function (e) {
//$('.careersv2-select-sets-drop-2').click(function(e){
  
  
  if ( $(this).hasClass('actlive') ) {
      $(this).removeClass('actlive');
  } else {

      $('.careersv2-select-sets-drop-2.actlive').removeClass('actlive');
   $(this).addClass('actlive');


   $('.careers-sets-contain-2').show();
    e.stopPropagation();
  }


  $(".careers-sets-contain-1").hide();
    $('.careersv2-select-sets-drop-1.actlive').removeClass('actlive');
  $(".careers-sets-contain-3").hide();
    $('.careersv2-select-sets-drop-3.actlive').removeClass('actlive');


});


$(document).click(function(){
    $(".careers-sets-contain-2").hide();
      $('.careersv2-select-sets-drop-2.actlive').removeClass('actlive');

});


$(document).on("click", '.careers-sets-contain-2', function (e) {
//$('.careers-sets-contain-2').click(function(e){
  e.stopPropagation();
});


$(document).on("click", '.careersv2-wahp-2', function (e) {
//$('.careersv2-wahp-2').click(function(e){
  $('.careersv2-select-sets-drop-2.actlive').removeClass('actlive');
     //$('.pTest').text($(this).text());
  $('.careersv2-exttitle-date-2').html($(this).html());


//alert($(this).find(".val_career_position_section_id").html());

$(".inputCareerPositionSection").val($(this).find(".val_career_position_section_id").html());
listCareerPositionData();

    //alert($(this).text());
   //$('.ext-sets').slideToggle("slow");
   $('.careers-sets-contain-2').hide();
    e.stopPropagation();
});
/*end select 2  */




/*  select 3  */
$(document).on("click", '.careersv2-select-sets-drop-3', function (e) {
//$('.careersv2-select-sets-drop-3').click(function(e){
  if ( $(this).hasClass('actlive') ) {
      $(this).removeClass('actlive');
  } else {

      $('.careersv2-select-sets-drop-3.actlive').removeClass('actlive');
   $(this).addClass('actlive');

   $('.careers-sets-contain-3').show();
    e.stopPropagation();
  }


  $(".careers-sets-contain-1").hide();
    $('.careersv2-select-sets-drop-1.actlive').removeClass('actlive');
  $(".careers-sets-contain-2").hide();
    $('.careersv2-select-sets-drop-2.actlive').removeClass('actlive');

});

$(document).click(function(){
    $(".careers-sets-contain-3").hide();
      $('.careersv2-select-sets-drop-3.actlive').removeClass('actlive');

});

$(document).on("click", '.careers-sets-contain-3', function (e) {
//$('.careers-sets-contain-3').click(function(e){
  e.stopPropagation();
});


$(document).on("click", '.careersv2-wahp-3', function (e) {
//$('.careersv2-wahp-3').click(function(e){
  $('.careersv2-select-sets-drop-3.actlive').removeClass('actlive');
     //$('.pTest').text($(this).text());
  $('.careersv2-exttitle-date-3').html($(this).html());


  $(".inputCareerPositionLevel").val($(this).find(".val_career_position_level_id").html());
  listCareerPositionData();

  //alert($(this).find(".val_career_position_level_id").html());

    //alert($(this).text());
   //$('.ext-sets').slideToggle("slow");
   $('.careers-sets-contain-3').hide();
    e.stopPropagation();
});
/*end select 3  */
