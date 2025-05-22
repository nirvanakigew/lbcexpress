
/*  select ipp  */
$('.ext-select-sets-ipp').click(function(e){
  if ( $(this).hasClass('actlive') ) {
      $(this).removeClass('actlive');
  } else {

      $('.ext-select-sets-ipp.actlive').removeClass('actlive');
   $(this).addClass('actlive');
   $('.ext-sets-ipp').show();


/*  Closes other ipp select */
   $(".ext-sets-ipp2").hide();
     $('.ext-select-sets-ipp2.actlive').removeClass('actlive');
     $(".ext-sets-ipp3").hide();
       $('.ext-select-sets-ipp3.actlive').removeClass('actlive');
/*  Closes other ipp select */


    e.stopPropagation();
  }


});

$(document).click(function(){
    $(".ext-sets-ipp").hide();
      $('.ext-select-sets-ipp.actlive').removeClass('actlive');

});

$('.ext-sets-ipp').click(function(e){
  e.stopPropagation();
});



$('.ext-wahp-ipp').click(function(e){
  $('.ext-select-sets-ipp.actlive').removeClass('actlive');
     //$('.pTest').text($(this).text());
  $('.exttitle-ipp').html($(this).html());

  	//alert($(this).text());
   //$('.ext-sets').slideToggle("slow");
   $('.ext-sets-ipp').hide();
    e.stopPropagation();
});
/*end select ipp  */


/*  select ipp 2 */
$('.ext-select-sets-ipp2').click(function(e){
  if ( $(this).hasClass('actlive') ) {
      $(this).removeClass('actlive');
  } else {

      $('.ext-select-sets-ipp2.actlive').removeClass('actlive');
   $(this).addClass('actlive');
   $('.ext-sets-ipp2').show();

/*  Closes other ipp select */
   $(".ext-sets-ipp").hide();
     $('.ext-select-sets-ipp.actlive').removeClass('actlive');
     $(".ext-sets-ipp3").hide();
       $('.ext-select-sets-ipp3.actlive').removeClass('actlive');
/*  Closes other ipp select */


    e.stopPropagation();
  }


});

$(document).click(function(){
    $(".ext-sets-ipp2").hide();
      $('.ext-select-sets-ipp2.actlive').removeClass('actlive');

});
$('.ext-sets-ipp2').click(function(e){
  e.stopPropagation();
});



$('.ext-wahp-ipp2').click(function(e){
  $('.ext-select-sets-ipp2.actlive').removeClass('actlive');
     //$('.pTest').text($(this).text());
  $('.exttitle-ipp2').html($(this).html());

  	//alert($(this).text());
   //$('.ext-sets').slideToggle("slow");
   $('.ext-sets-ipp2').hide();
    e.stopPropagation();
});
/*end select ipp 2  */



/*  select ipp 3 */
$('.ext-select-sets-ipp3').click(function(e){
  if ( $(this).hasClass('actlive') ) {
      $(this).removeClass('actlive');
  } else {

      $('.ext-select-sets-ipp3.actlive').removeClass('actlive');
   $(this).addClass('actlive');
   $('.ext-sets-ipp3').show();

/*  Closes other ipp select */
   $(".ext-sets-ipp").hide();
     $('.ext-select-sets-ipp.actlive').removeClass('actlive');
     $(".ext-sets-ipp2").hide();
       $('.ext-select-sets-ipp2.actlive').removeClass('actlive');
       /*  Closes other ipp select */

    e.stopPropagation();
  }


});

$(document).click(function(){
    $(".ext-sets-ipp3").hide();
      $('.ext-select-sets-ipp3.actlive').removeClass('actlive');

});
$('.ext-sets-ipp3').click(function(e){
  e.stopPropagation();
});



$('.ext-wahp-ipp3').click(function(e){
  $('.ext-select-sets-ipp3.actlive').removeClass('actlive');
     //$('.pTest').text($(this).text());
  $('.exttitle-ipp3').html($(this).html());

  	//alert($(this).text());
   //$('.ext-sets').slideToggle("slow");
   $('.ext-sets-ipp3').hide();
    e.stopPropagation();
});
/*end select ipp 3  */



































/*  select country 1 curreny  */
$('.ctry1-ext-select-sets').click(function(e){
  if ( $(this).hasClass('actlive') ) {
      $(this).removeClass('actlive');
  } else {

      $('.ctry1-ext-select-sets.actlive').removeClass('actlive');
   $(this).addClass('actlive');
   $('.ctry1-ext-sets').show();
    e.stopPropagation();
  }


});

$(document).click(function(){
    $(".ctry1-ext-sets").hide();
      $('.ctry1-ext-select-sets.actlive').removeClass('actlive');

});
$('.ctry1-ext-sets').click(function(e){
  e.stopPropagation();
});



$('.ctry1-ext-wahp').click(function(e){
  $('.ctry1-ext-select-sets.actlive').removeClass('actlive');
     //$('.pTest').text($(this).text());
  $('.ctry1-exttitle').html($(this).html());

  	//alert($(this).text());
   //$('.ext-sets').slideToggle("slow");
   $('.ctry1-ext-sets').hide();
    e.stopPropagation();
});
/*end  select country 1 curreny  */










/*  select country 2 curreny  */
$('.ctry2-ext-select-sets').click(function(e){
  if ( $(this).hasClass('actlive') ) {
      $(this).removeClass('actlive');
  } else {

      $('.ctry2-ext-select-sets.actlive').removeClass('actlive');
   $(this).addClass('actlive');
   $('.ctry2-ext-sets').show();
    e.stopPropagation();
  }


});

$(document).click(function(){
    $(".ctry2-ext-sets").hide();
      $('.ctry2-ext-select-sets.actlive').removeClass('actlive');

});
$('.ctry2-ext-sets').click(function(e){
  e.stopPropagation();
});



$('.ctry2-ext-wahp').click(function(e){
  $('.ctry2-ext-select-sets.actlive').removeClass('actlive');
     //$('.pTest').text($(this).text());
  $('.ctry2-exttitle').html($(this).html());

  	//alert($(this).text());
   //$('.ext-sets').slideToggle("slow");
   $('.ctry2-ext-sets').hide();
    e.stopPropagation();
});
/*end  select country 2 curreny  */
