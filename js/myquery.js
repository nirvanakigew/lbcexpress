//May 20 2020 remove JS for sticky orange nav and white nav//



/*
$(window).scroll(function(){
  var sticky = $('.nav-2-stick'),
      scroll = $(window).scrollTop();

  if (scroll >= 55) sticky.addClass('fixed-ecom');
  else sticky.removeClass('fixed-ecom');
});

$(window).scroll(function(){
  var sticky = $('.bgservices-newv1'),
      scroll = $(window).scrollTop();

  if (scroll >= 55) sticky.addClass('bgservices-newv1-fixed');
  else sticky.removeClass('bgservices-newv1-fixed');
});
*/




/*
$(window).scroll(function(){
  var sticky = $('.new-3-stick'),
      scroll = $(window).scrollTop();

  if (scroll >= 110) sticky.addClass('new-3-stick-fixed');
  else sticky.removeClass('new-3-stick-fixed');
});


$(window).scroll(function(){
  var sticky = $('.new-3-stick-text'),
      scroll = $(window).scrollTop();

  if (scroll >= 110) sticky.addClass('new-3-stick-fixed-text');
  else sticky.removeClass('new-3-stick-fixed-text');
});

*/
//end May 20 2020 remove JS for sticky orange nav and white nav//


//May 16 2020 update //



$(document).ready(function() {
    $('.shipper-metromanila').select2({
      dropdownPosition: 'below'
    });
     $('.shipper-barangay').select2({
       dropdownPosition: 'below'
     });
    $('.recipient-metromanila').select2({
      dropdownPosition: 'below'
    });
    $('.recipient-barangay').select2({
      dropdownPosition: 'below'
    });
    $('.withinmetroorigin-r2').select2({
      dropdownPosition: 'below'
    });
    $('.withinmetrodestination-r2').select2({
      dropdownPosition: 'below'
    });
    $('.countrydestination-r5').select2({
      dropdownPosition: 'below'
    });
    $('.countryoriginin-r5').select2({
      dropdownPosition: 'below'
    });
});



//end may 16 2020//





//march 21 2020 shakeys-modal//
$(document).ready(function() {

 $('#inernationalopen').click(function(e) {
 $('.prohibitedmodal').show();
     $('.bodydhide').hide();
 });


 $('.promo-x-img').click(function(e) {
 $('.prohibitedmodal').hide();
     $('.bodydhide').show();
 });

 });



 $('#me-modal-btn').click(function(e) {
 	 $('#me-modal').css("display", "block");
  $('.bodydhide').css("display", "none");
     $('html, body').scrollTop( $("#me-modal").offset().top);

  });

 $('.me-menu-top-close-btn').click(function(e) {
 	 $('#me-modal').css("display", "none");
  $('.bodydhide').css("display", "block");

  });
//end march 21 2020 shakeys-modal//




/*march 17 2020 for US form show button when fields has value*/


$('.usn1').bind('keyup change',function(){

    var emptytext2 = $('.usn1').map(function(index, el) {
        return !$(el).val().length ? el : null;
    }).get();


    var submitme2 = $('.us-sub-btn');

    !emptytext2.length ? submitme2.css('display', 'block') : submitme2.hide();
});

/*end march 17 2020 for US form show button when fields has value*/





/* feb 17 2020 new nav for trace-trace */

$(window).scroll(function(){
  var sticky = $('.tracktrace-div'),
      scroll = $(window).scrollTop();

  if (scroll >= 55) sticky.addClass('fixeon');
  else sticky.removeClass('fixeon');
});

/*end feb 17 2020 new nav for trace-trace */



/*new nav focus feb 8 2020 update*/
//$(".burger-container").click(function(){
  //  $(".mobile-searchinput").focus();
//});


var $fcs = $('.mobile-searchinput');
$('.burger-container').on('mousedown', function () {
    $(this).data('inputFocused', $fcs.is(":focus"));
}).click(function () {
    if ($(this).data('inputFocused')) {
        $fcs.blur();
    } else {
        $fcs.focus();
    }
});



$(".hover-nav-search").click(function(){
    $(".inputsearch-nav").focus();

});
/*end new nav focus feb 8 2020 update*/



/*new Index land sea air Jan 16 2020 update*/
$(document).ready(function(){

  $('.indexset').click(function(){
    $('.indexset').removeClass("airset-active");
  $(this).addClass("airset-active");
});

$('.packages-t').click(function(){
    $('.set-packages').addClass("set-active");
$('.set-documents').removeClass("set-active");



});

  $('.documents-t').click(function(){

$('.set-documents').addClass("set-active");
$('.set-packages').removeClass("set-active");
});



});

/*end Index land sea air Jan 16 2020 update*/





/*new Jan 8 2020 update*/
$(document).ready(function(){
  $('.airset').click(function(){
    $('.airset').removeClass("airset-active");
  $(this).addClass("airset-active");
});

$('.packages-t').click(function(){
    $('.set-packages').addClass("set-active");
$('.set-documents').removeClass("set-active");



});

  $('.documents-t').click(function(){

$('.set-documents').addClass("set-active");
$('.set-packages').removeClass("set-active");
});



});

/*end new Jan 8 2020 update*/

/*new Dec 15 2019 update for modal jquery*/
$('.viewvid').click(function(e) {
$('.view-vid').show();
    $('.bodydhide').hide();
});


$(".cop-x-table").on('click', function(){
$('video').trigger('pause');
});




$('.newprohibitedmodal').click(function(e) {
$('.prohibitedmodal').show();
    $('.bodydhide').hide();
});


$('.newsizesmodal').click(function(e) {
$('.sizesmodal').show();
    $('.bodydhide').hide();
});

$('.lsaopenmodal').click(function(e) {

$('.lsalearmoreopen').fadeIn(500)
});

$('.lsaclosemodal').click(function(e) {
$('.lsalearmoreopen').fadeOut(500)

});


/*end Dec 15 2019new update for modal jquery*/
$('.prohibited-x-img').click(function() {


$('.prohibitedmodal').hide();
  $('.ecommercemodal').hide()

  $('.warehousingmodal').hide()
$('.remittancemodal').hide();
$('.listofbillersmodal').hide();
$('.becomeabillermodal').hide();
 $('.countrymobilemap').hide();
   $('.view-vid').hide();

$('.sizesmodal').hide();
 $('.bodydhide').show();

});

$('.openmapmodal').click(function(e) {
$('.countrymobilemap').show();

});



























$('#becomeanlbc-btn').click(function(e) {
$('.becomeabillermodal').show();
    $('.bodydhide').hide();
});

$('#viewbillers-btn').click(function(e) {
$('.remittancemodal').show();
    $('.bodydhide').hide();
     $("html").scrollTop(0);

});
















 $('#remittancemodal').click(function(e) {
 $('.remittancemodal').show();
     $('.bodydhide').hide();
 });







/*

var maxHeight = 0;
$('.services-ms-news').each(function(){
   maxHeight = $(this).height() > maxHeight ? $(this).height() : maxHeight;
});
alert(maxHeight);

*/


 $('#talkcontent').click(function(e) {
 $('.modalBg').show();
     $('.bodydhide').hide();
 });










/*content modal caller*/
$('#content-modal-view').click(function(e) {
 $('.content-global-onoff').css("display", "block");
    $('html, body').scrollTop( $(".content-global-modal").offset().top);

     $('.bodydhide').css("display", "none");
 });


$('#content-modal-view-close').click(function(e) {
 $('.content-global-onoff').css("display", "none");
     $('.bodydhide').css("display", "block");
 });

/*end content modal caller*/






/*content show hide caller*/
$('#open-hidden-content').click(function(e) {
 $('.learnmore-div-2').css("display", "none");

     $('.learnmore-div-2-hidden').css("display", "block");
 });


$('#close-hidden-content').click(function(e) {
 $('.learnmore-div-2').css("display", "flex");
     $('.learnmore-div-2-hidden').css("display", "none");
 });

/*end content modal caller*/






















/*content caller*/
$('#content-bookmodal-1').click(function(e) {
 $('.modalBgBook').css("display", "block");
     $('.bodydhide').css("display", "none");
 });

$('#content-bookmodal-2').click(function(e) {
 $('.modalBgBook').css("display", "block");
     $('.bodydhide').css("display", "none");
 });

$('#content-bookmodal-3').click(function(e) {
 $('.modalBgBook').css("display", "block");
     $('.bodydhide').css("display", "none");
 });

/*end content caller*/



//$(document).ready(function() {
  //  $('.myselect2').select2();
  //  e.preventDefault();
//});

// start customized.html  + mobile//


//end mobile//

// end customized.html //


//sizes modal//
$(document).ready(function() {
  $('#d1-o').click(function() {
$('#d-1').css("display", "none");
$('#d-2').css("display", "block");
 });

    $('#d1-x').click(function() {
$('#d-1').css("display", "block");
$('#d-2').css("display", "none");
 });



   });
//end sizes modal//



//shakeys-modal//
$(document).ready(function() {

 $('#inernationalopen').click(function(e) {
 $('.prohibitedmodal').show();
     $('.shakeysbody').hide();
 });


 $('.promo-x-img').click(function(e) {
 $('.prohibitedmodal').hide();
     $('.shakeysbody').show();
 });

 });


//end shakey's moda//





// lbc-trio//
$(document).ready(function() {

$('.inputtrackntrace').focus();
  $('.inputbrancheessss').focus();

$('.tri-3-rates').click(function() {
     $('.tri-3-rates').addClass( "span-trio-text-active" );
       $('.tri-3-branch').removeClass( "span-trio-text-active" );
       $('.tri-3-tracktrace').removeClass( "span-trio-text-active" );
 $('.rates-content-trio').css({"opacity": "1", "position": "relative", "visibility": "visible"});
$('.trackntrace-content-trio').css("display", "none");
$('.branches-content-trio').css("display", "none");
 });


$('.tri-3-tracktrace').click(function() {
     $('.tri-3-tracktrace').addClass( "span-trio-text-active" );
       $('.tri-3-branch').removeClass( "span-trio-text-active" );
       $('.tri-3-rates').removeClass( "span-trio-text-active" );
 $('.rates-content-trio').css({"opacity": "0", "position": "fixed", "visibility": "hidden"});
$('.trackntrace-content-trio').css("display", "block");
$('.branches-content-trio').css("display", "none");
$('.inputtrackntrace').focus();
 });



$('.tri-3-branch').click(function() {
     $('.tri-3-branch').addClass( "span-trio-text-active" );
       $('.tri-3-tracktrace').removeClass( "span-trio-text-active" );
       $('.tri-3-rates').removeClass( "span-trio-text-active" );
 $('.rates-content-trio').css({"opacity": "0", "position": "fixed", "visibility": "hidden"});
$('.branches-content-trio').css("display", "block");
$('.trackntrace-content-trio').css("display", "none");
$('.inputbrancheessss').focus();
 });




$(".logo-href").click(function() {
 $("html, body").animate({ scrollTop: 0 },  1000);
  return false;
});

 });
// end lbc-trio//
















$(window).load(function(){
     $('.coverload').fadeOut();
});








$(".cod-learnmore").click(function() {
    $('html, body').animate({
        scrollTop: $("#codcop2nd").offset().top-60
    }, 2000);

});


$("#cod-cop-btn").click(function() {
    $('html, body').animate({
        scrollTop: $("#codcop2nd").offset().top
    }, 2000);

});




$("#howitworks-btn").click(function() {
    $('html, body').animate({
        scrollTop: $("#howitworks-body").offset().top-60
    }, 2000);

});









 $('#non-docs-btn').click(function(e) {
     $('#non-docs-btn').addClass( "docactive" );
       $('#docs-title-btn').removeClass( "docactive" );
 $('#sizes-non-docs').show();
     $('#sizes-document').hide();
 });

 $('#docs-title-btn').click(function(e) {
     $('#docs-title-btn').addClass( "docactive" );
       $('#non-docs-btn').removeClass( "docactive" );
 $('#sizes-document').show();
     $('#sizes-non-docs').hide();
 });










 $('#beforeusendpickup').click(function(e) {
 $('.prohibitedmodal').show();
     $('.bodydhide').hide();
 });



 $('#listofbiller-btn').click(function(e) {
 $('.listofbillersmodal').show();
     $('.bodydhide').hide();
 });



 $('#tiletalktous').click(function(e) {
 $('.modalBg').show();
     $('.bodydhide').hide();
 });



 $('#modal-3').click(function(e) {
 $('.modalBg-2').show();
     $('.bodydhide').hide();
 });


 $('#modal-4').click(function(e) {
 $('.modalBg-3').show();
     $('.bodydhide').hide();
 });












 $('.cross-cancel-3').click(function() {
 $('.modalBg-2').hide();
 $('.modalBg-3').hide();
  $('.bodydhide').show();

 });




 $('#opencoldchain').click(function(e) {
 $('.coldchainmodal').show();
     $('.bodydhide').hide();
 });

 $('.coldchain-x-img').click(function() {
 $('.coldchainmodal').hide();
  $('.bodydhide').show();

 });



 $('#warehouse-btn').click(function(e) {
 $('.warehousingmodal').show();
     $('.bodydhide').hide();
 });



 $('#ecommerce-btn').click(function(e) {
 $('.ecommercemodal').show();
     $('.bodydhide').hide();
 });





 $('#prohibitedmodal').click(function(e) {
 $('.prohibitedmodal').show();
     $('.bodydhide').hide();
 });




 $('#sizesmodal').click(function(e) {
 $('.sizesmodal').show();
     $('.bodydhide').hide();
 });



 $('#openagree').click(function(e) {
 $('.modalBg').show();
     $('.bodydhide').hide();
 });










 $('.cross-cancel').click(function() {
 $('.modalBg').hide();
  $('.modalBg-2').hide();
 $('.modalBg-3').hide();
  $('.bodydhide').show();

 });










$('#modalval, #modalval2, #modalval3, #modalval4').bind('keyup change',function(){

    var emptytext = $('#modalval, #modalval2, #modalval3, #modalval4').map(function(index, el) {
        return !$(el).val().length ? el : null;
    }).get();


    var submitme = $('.cappt');

    !emptytext.length ? submitme.css({display: "block"}) : submitme.hide();
});








$('.rates-doc3').click(function(e) {
  e.preventDefault();
 $('.active-doc').css("display", "none");
    $('.active-nondoc').css("display", "initial");
 });


$('.rates-doc1').click(function(e) {
  e.preventDefault();
 $('.active-doc').css("display", "initial");
    $('.active-nondoc').css("display", "none");
 });





$('.close-rates').click(function(e) {
  e.preventDefault();
 $('.modal-boxes-rates').css("display", "none");
 	$('body').css('overflow', 'auto');
 });

$('.package-text').click(function(e) {
  e.preventDefault();
 $('.modal-boxes-rates').css("display", "block");
 	$('body').css('overflow', 'hidden');
 });










$('.view-details-tracking').click(function(e) {
  e.preventDefault();
 $('.track-1-modal').css("display", "block");
 	$('body').css('overflow', 'hidden');
 });


$('.modal-track-close').click(function(e) {
  e.preventDefault();
 $('.track-1-modal').css("display", "none");
 	$('body').css('overflow', 'auto');
 });





/*thank you*/

 $('.span-thankyou-bookagain').click(function() {


/* Single line Reset function executes on click of Reset Button */
/* $("#shipperformres")[0].reset();*/





 $('.modalBgBook').css("display", "block");
 $('.modalBgBookthankyou').css("display", "none");
 $('.bodydhide').css("display", "none");
 });


 $('.span-thankyou-done').click(function() {
 $('.modalBgBook').css("display", "none");
 $('.modalBgBookthankyou').css("display", "none");
 $('.bodydhide').css("display", "block");
 });



 $('.div-submit-active').click(function() {
 $('.modalBgBook').css("display", "none");
 $('.modalBgBookthankyou').css("display", "block");
 });


  $('.div-submit-active-talktous').click(function() {
 $('.modalBg').css("display", "none");
 $('.modalBgBookthankyou-talktous').css("display", "block");
 });

  $('.span-thankyou-done-talktous').click(function() {
 $('.modalBg').css("display", "none");
 $('.modalBgBookthankyou-talktous').css("display", "none");
 $('.bodydhide').css("display", "block");
 });




/*end thank you*/





$('#bookmodal').click(function(e) {
 $('.modalBgBook').css("display", "block");
     $('.bodydhide').css("display", "none");
 });






$('#bookmodal-blue').click(function(e) {
 $('.modalBgBook').css("display", "block");
     $('.bodydhide').css("display", "none");
 });










 $('#bookmodalM').click(function(e) {
 $('.modalBgBook').css("display", "block");
     $('.bodydhide').css("display", "none");
 });




 $('.bookclose').click(function() {

  location.reload(true);
 $('.modalBgBook').css("display", "none");
  $('.bodydhide').css("display", "block");

 });





$('html').click(function() {
    $('.down-service').css("visibility", "visible");
   $('.new-service-drop').css("display", "none");

 })

 $('.new-service-contain-mobile').click(function(e){
     e.stopPropagation();
 });

 $('.new-service-contain-mobile-880').click(function(e){
     e.stopPropagation();
 });

$('.new-service-contain-mobile-880-v2').click(function(e){
     e.stopPropagation();
 });














$(document).ready(function() {

  $('.down-service').click(function(e) {
 $('.new-service-drop').slideToggle("slow");
 $('.down-service').css("visibility", "hidden");
   $('.up-service').css("visibility", "visible");
 });


  $('.up-service').click(function(e) {
 $('.new-service-drop').slideToggle("slow");
      $('.down-service').css("visibility", "visible");
     $('.up-service').css("visibility", "hidden");

 });





});

















$(document).ready(function () {
   $(".detailshavebeentext-confirm").click(function () {
  $(".bookingrefnumber").css("display", "flex");
$(".bookingconfirmall").css("display", "none");


   });
});




$(document).ready(function () {
   $(".submitbooking").click(function () {
$(".toptitlepickup").css("display", "none");
 $(".submitbooking").css("display", "none");

$(".bookingconfirmall").css("display", "flex");
   $('html,body').animate({
        scrollTop: $(".modalBgBook").offset().top},
        'slow');

   });
});



































/*
	$(function() {
				$('.datepicker-time').timepicker({ 'scrollDefault': 'now' });
			});
                        */


$("#takitaki").click(function(){
    $(".accordionFo2 a").click();
    return false;
});





//$("#sendmodito").on('click', function(){
    //location.reload();
    //$('#topform').val("");
// });

$(".closeNav").on('click', function(){
     $('#topform').val('');
});



// $('#topform').bind('keyup change',function(){
// var walanglaman = $('#topform').map(function(index, el) {
// return !$(el).val().length ? el : null; }).get();
// var hanapinsiako = $('.searchText');
//    !walanglaman.length ? hanapinsiako.show() : hanapinsiako.hide();
// });






$(window).scroll(function(){
  var sticky = $('.navi-ecomm2'),
      scroll = $(window).scrollTop();

  if (scroll >= 1) sticky.addClass('navi-ecommF');
  else sticky.removeClass('navi-ecommF');
});



$(window).scroll(function(){
  var sticky = $('.window'),
      scroll = $(window).scrollTop();

  if (scroll >= 45) sticky.addClass('windowF');
  else sticky.removeClass('windowF');
});



$(window).scroll(function(){
  var sticky = $('.window2'),
      scroll = $(window).scrollTop();

  if (scroll >= 1) sticky.addClass('windowF1');
  else sticky.removeClass('windowF1');
});








$(document).ready(function(){
    $(".readfaqs").click(function(){
        $(".fullmodal").show();
        $(".hidden-modal-active").hide();
        $("html,body").scrollTop(0);

    });
    $(".closemodal").click(function(){
        $(".fullmodal").hide();
         $(".hidden-modal-active").show();
    });
});


//$('.closeNav').trigger('reset')

$(document).ready(function() {
   // Transition effect for navbar
   $(window).scroll(function() {
      // checks if window is scrolled more than 500px, adds/removes solid class
      if ($(this).scrollTop() > 100) {
         $(".navi").addClass("navifade");
      $(".headermobile").addClass("headerfade");
      } else {
         $(".navi").removeClass("navifade");
  $(".headermobile").removeClass("headerfade");
      }
   });
});


(function($) {


    $('.accordionFo a').click(function(j) {
        var dropDown = $(this).closest('li').find('ul li');

        $(this).closest('.accordionFo').find('ul li').not(dropDown).slideUp();

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).closest('.accordionFo').find('a.active').removeClass('active');
            $(this).addClass('active');
        }

        dropDown.stop(false, true).slideToggle();

        j.preventDefault();
    });
})(jQuery);





(function($) {


    $('.accordionFo2 a').click(function(j) {
        var dropDown = $(this).closest('li').find('ul li');

        $(this).closest('.accordionFo2').find('ul li').not(dropDown).slideUp();

        if ($(this).hasClass('active2')) {
            $(this).removeClass('active2');
        } else {
            $(this).closest('.accordionFo2').find('a.active').removeClass('active2');
            $(this).addClass('active2');
        }

        dropDown.stop(false, true).slideToggle();

        j.preventDefault(j);
    });
})(jQuery);







$('.codcop-ss1').click(function() {
    $('.codcop-ss2').fadeIn(1600);
    $('.codcop-ss1').fadeOut(800);
    event.stopPropagation()
});
$('.codcop-ss2').click(function() {
    $('.codcop-ss3').fadeIn(1600);
    $('.codcop-ss2').fadeOut(800);
    event.stopPropagation()
});
$('.codcop-ss3').click(function() {
    $('.codcop-ss1').fadeIn(1600);
    $('.codcop-ss3').fadeOut(800);
    event.stopPropagation()
});



   $(document).ready(function() {
        $(".myselect").change(function() {
            location = $(".myselect option:selected").val();
        });
    });












 $('.cross-cancel-2').click(function() {
 $('.listbofbillersbg').hide();

 });






 $('#takitaki').click(function(e) {
 $('.modalBg').show();
$('.bodydhide').hide();
 });


 $('#talktous-text').click(function(e) {
 $('.modalBg').show();
     $('.bodydhide').hide();
 });


 $('#listofbillers').click(function(e) {
 $('.listbofbillersbg').show();
 });



 $('.closeimage').click(function(e) {
 $('.crc').hide();
 });


 $('.country1, .country1-australia, .country1-bahrain, .country1-brunei, .country1-canada, .country1-guam, .country1-hongkong, .country1-italy,  .country1-japan, .country1-korea, .country1-ksa, .country1-kuwait, .country1-malaysia, .country1-qatar, .country1-saipan, .country1-singapore, .country1-taiwan, .country1-uae, .country1-us, .country1-uk').click(function(e) {
 $('.countryselect').show();
$('.country1, .country1-australia, .country1-bahrain, .country1-brunei, .country1-canada, .country1-guam, .country1-hongkong, .country1-italy,  .country1-japan, .country1-korea, .country1-ksa, .country1-kuwait, .country1-malaysia, .country1-qatar, .country1-saipan, .country1-singapore, .country1-taiwan, .country1-uae, .country1-us, .country1-uk').hide();
 });

 $('.countryselect').click(function(e) {
 $('.country1, .country1-australia, .country1-bahrain, .country1-brunei, .country1-canada, .country1-guam, .country1-hongkong, .country1-italy,  .country1-japan, .country1-korea, .country1-ksa, .country1-kuwait, .country1-malaysia, .country1-qatar, .country1-saipan, .country1-singapore, .country1-taiwan, .country1-uae, .country1-us, .country1-uk').show();
 $('.countryselect').hide();
 });


/*

var hasSeenLBConce = localStorage.getItem("countrydiv");
if(!hasSeenLBConce){
  document.getElementById("choosecountrydiv").style.display = "flex";
  localStorage.setItem("countrydiv", "true");
}
*/






$("#paymentsolutions").on('click', function(){
     window.location = "paymentsolutions.html";
});


$("#paybills").on('click', function(){
     window.location = "paybills.html";
});


$("#overview-money").on('click', function(){
     window.location = "money.html";
});
$("#lestestpage-1").on('click', function(){
     window.location = "news.html";
});


$("#sendmoney-1").on('click', function(){
     window.location = "sendmoney.html";
});


$("#paymentsolutions-1").on('click', function(){
     window.location = "paymentsolutions.html";
});


$("#paybills-1").on('click', function(){
     window.location = "paybills.html";
});

$("#businesssolutionspage").on('click', function(){
     window.location = "paybills.html";
});



$("#moneypage").on('click', function(){
     window.location = "money.html";
});



$("#freightpage").on('click', function(){
     window.location = "freight.html";
});



$("#packagespage").on('click', function(){
     window.location = "packages.html";
});


$("#codcoppage").on('click', function(){
     window.location = "codcop.html";
});


$("#leadershippage-1").on('click', function(){
     window.location = "leadership.html";
});

$(document).ready(function() {
$("#newspage-1").on('click', function(){
     window.location = "news.html";
});
    });


$("#codss").on('click', function(){
     window.location = "codcop-ss.html";
});

$("#businesssolutionspage").on('click', function(){
     window.location = "businesssolutions.html";
});

$("#gocountry").on('click', function(){
     window.location = "country.html";
});
$("#gocountry-1").on('click', function(){
     window.location = "country.html";
});

$("#valuespage").on('click', function(){
     window.location = "values.html";
});

$("#valuespage-1").on('click', function(){
     window.location = "values.html";
});

$("#gobranch-1").on('click', function(){
     window.location = "contact-branches.html";
});
$(".visitourbranchesfooter").on('click', function(){
     window.location = "contact-branches.html";
});

$(".visitourbranchesfooter-1").on('click', function(){
     window.location = "contact-branches.html";
});


$("#emaillbc").on('click', function(){
 window.location.href = "mailto:customercare@lbcexpress.com";
});

$("#emaillbc-2").on('click', function(){
 window.location.href = "mailto:customercare@lbcexpress.com";
});

$("#fblbc").on('click', function(){
 window.location.href = "https://www.facebook.com/LBCExpress/";
});


$("#fblbc-2").on('click', function(){
 window.location.href = "https://www.facebook.com/LBCExpress/";
});


$("#packagespage-n1").on('click', function(){
     window.location = "packages.html";
});




$("#freightpage-n1").on('click', function(){
     window.location = "freight.html";
});



$("#moneypage-n1").on('click', function(){
     window.location = "money.html";
});



$("#businesssolutionspage-n1").on('click', function(){
     window.location = "businesssolutions.html";
});
