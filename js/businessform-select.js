
/*  select date  */
$('.bform-select-sets-date').click(function(e){
  if ( $(this).hasClass('actlive') ) {
      $(this).removeClass('actlive');
  } else {

      $('.bform-select-sets-date.actlive').removeClass('actlive');
   $(this).addClass('actlive');


   $('.bform-sets-date').show();
    e.stopPropagation();
  }


});

$(document).click(function(){
    $(".bform-sets-date").hide();
      $('.bform-select-sets-date.actlive').removeClass('actlive');

});

$('.bform-sets-date').click(function(e){
  e.stopPropagation();
});



$('.bform-wahp-date').click(function(e){

  $('.bform-select-sets-date.actlive').removeClass('actlive');
     //$('.pTest').text($(this).text());
  $('.exttitle-date').html($(this).html());


   $(".iFormBusinessSolutionsBusinessIndustry").val($(this).find(".bform-select-set-list").html());
   $(".iFormTFCCountry").val($(this).find(".bform-select-set-list").html());
   //$(".iFormBusinessSolutionsBusinessIndustry").val($(this).html());

  	//alert($(this).text());
   //$('.ext-sets').slideToggle("slow");
   $('.bform-sets-date').hide();
    e.stopPropagation();
});
/*end select date  */
