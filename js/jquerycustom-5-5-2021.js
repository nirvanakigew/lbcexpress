//remittance
$(".sendmoneytoday").click(function() {
    $('html,body').animate({
        scrollTop: $("#sendmoneytoday").offset().top - 50
    }, 'slow');
});


//universal modal prep
$('.myuniversal-modal-btn').click(function(){
    $('body').addClass("universal-noscroll");
    $('.universal-modal').addClass("universal-modal-open");
});
$('.myuniversal-modal-close').click(function(){
    $('body').removeClass("universal-noscroll");
    $('.universal-modal').removeClass("universal-modal-open");
});
//end

//nam soshop click scroll to div
$(".nam-soshop-benefits").click(function() {
    $('html,body').animate({
        scrollTop: $("#soshop-benefits").offset().top - 50
    }, 'slow');
});
$(".nam-soshop-membership").click(function() {
    $('html,body').animate({
        scrollTop: $("#soshop-membership").offset().top - 50
    }, 'slow');
});

$(".nam-soshop-contact").click(function() {
    $('html,body').animate({
        scrollTop: $("#soshop-membership").offset().top - 50
    }, 'slow');
});

//end


//ph remittance go
$(".go-to-cashremittance-scroll-section").click(function() {
    $('html,body').animate({
        scrollTop: $(".cashremittance-scroll-section").offset().top - 50
    }, 'slow');
});
//end




/*scroll click for NAM USA Jan 19 2021*/
$(".nam1-tgr").click(function() {
  $('html,body').animate({
      scrollTop: $(".nam1-dv").offset().top-50},
      'slow');
});
$(".nam2-tgr").click(function() {
  $('html,body').animate({
      scrollTop: $(".nam2-dv").offset().top-50},
      'slow');
});
$(".nam3-tgr").click(function() {
  $('html,body').animate({
      scrollTop: $(".nam3-dv").offset().top-50},
      'slow');
});


/* 10.5.6 search bar */
$('.os-btn-search').click(function(){
  $(".rework-search-input").addClass("btn-show-os");
    $(".os-btn-search").addClass("os-btn-search-hide");
    $('.rework-search-input-style').focus();
});
$('.btn-os-close').click(function(){
  $(".rework-search-input").removeClass("btn-show-os");
    $(".os-btn-search").removeClass("os-btn-search-hide");
    $('.rework-search-input').trigger("reset");
});

$('.js-toggle-menu').click(function(e){
e.preventDefault();
$(".rework-search-input").removeClass("btn-show-os");
  $(".os-btn-search").removeClass("os-btn-search-hide");
      $('.rework-search-input').trigger("reset");
      $('.desktop-m3-2-2020-country.m3-active').removeClass('m3-active');

});

/*end 10.5.6 search bar*/


/* new contact us 9.25.2020 *//* new contact us 9.25.2020 */
/* new contact us 9.25.2020 *//* new contact us 9.25.2020 */
 $('.recontactus').click(function(e) {
 $('.recontactmodal').show();
     $('.bodydhide').hide();
 });

 $('.reclose').click(function() {
 $('.recontactmodal').hide();
  $('.bodydhide').show();
 });

 $('.re-firstloadx').click(function(e) {
      $('.re-load').css("display", "none");
  });


/*end  new contact us 9.25.2020 *//*end new contact us 9.25.2020 */
/*end  new contact us 9.25.2020 *//*end new contact us 9.25.2020 */


/*9.25.2020 select country desktop only*/



$('.desktop-m3-2-2020-country').click( function(){
    if ( $(this).hasClass('m3-active') ) {
        $(this).removeClass('m3-active');
				event.stopPropagation();
    } else {
        $('.desktop-m3-2-2020-country.m3-active').removeClass('m3-active');
        $(this).addClass('m3-active');
				event.stopPropagation();
    }

});



$(document).on("click", function(event)
{
    $('.desktop-m3-2-2020-country.m3-active').removeClass('m3-active');
    $('.mobile-head-sub.desktop-m3-sub-active').removeClass('m3-sub-active');
      $('.mobile-header-nav.mo-active').removeClass('mo-active');
        $('.mobile-menu-toggle.js-toggle-menu.hamburger-menu.open').removeClass('open');
});



/*end 9.25.2020 select country desktop only*/





/* so shop *//* so shop *//* so shop */
/* so shop *//* so shop *//* so shop */
/* so shop *//* so shop *//* so shop */

/*  select date  */
$('.so-container-select-div').click(function(e){
  if ( $(this).hasClass('actlive') ) {
      $(this).removeClass('actlive');
  } else {

      $('.so-container-select-div.actlive').removeClass('actlive');
   $(this).addClass('actlive');


   $('.so-set-section').show();
    e.stopPropagation();
  }


});

$(document).click(function(){
    $(".so-set-section").hide();
      $('.so-container-select-div.actlive').removeClass('actlive');

});

$('.so-set-section').click(function(e){
  e.stopPropagation();
});



$('.so-set-section-list').click(function(e){
  $('.so-container-select-div.actlive').removeClass('actlive');
     //$('.pTest').text($(this).text());
  $('.so-title-select').html($(this).html());

  	//alert($(this).text());
   //$('.ext-sets').slideToggle("slow");
   $('.so-set-section').hide();
    e.stopPropagation();
});
/*end select date  */



/*select tab so shop*/
$(".so-tab-content").hide();
$(".so-tab-content:first").show();


$(".so-tab-trgr").click(function() {
  $(".so-tab-content").hide();
  var activeTab = $(this).attr("rel");
  $("."+activeTab).fadeIn();
});
/*end select tab so shop*/





/*end so shop *//*end so shop *//*end so shop */
/*end so shop *//*end so shop *//*end so shop */
/*end so shop *//*end so shop *//*end so shop */
















$('.lead-modal-trigger').click(function(){
  $(".n2020lead-modal").addClass("show");
    $(".bodydhide").addClass("no-scroll");
    $('html, body').animate({
       scrollTop: $('body').offset().top
    }, 0.1);
});

$('.n2020-lead-modal-close-trigger').click(function(){
  $(".n2020lead-modal").removeClass("show");
    $(".bodydhide").removeClass("no-scroll");
});





  $('.showthankyou').click(function(){
 $('.thankyoumsg').css("display", "block");

  });





$('.trgrscreen').click(function(){
  $(".loadingscreen").addClass("show");
    $("body").addClass("bodyfixed");
setTimeout(function() {
			$(".loadingscreen").removeClass("show");
		}, 3300);

    setTimeout(function() {
    			$("body").removeClass("bodyfixed");
    		}, 3300);
});



$(document).ready(function(){

  $('.phase2sliderselectbtn').click(function(){

      $('.phase2sliderselectbtn.phaseactive').removeClass('phaseactive');
      $(this).addClass('phaseactive');


  });


  $('.doc').click(function(){
    $(".nondocset.phaseshowset").removeClass("phaseshowset");
    $(".docset").addClass("phaseshowset");


  });

  $('.nondoc').click(function(){
       $(".docset.phaseshowset").removeClass("phaseshowset");
    $(".nondocset").addClass("phaseshowset");


  });


});







$('.bookmodal').click(function(e) {
 $('.modalBgBook').css("display", "block");
     $('.bodydhide').css("display", "none");
 });


//remove stick orange
//var stickySidebar = $('.navorange').offset().top;

//$(window).scroll(function() {
  //  if ($(window).scrollTop() > stickySidebar) {
    //    $('.navorange').addClass('stick');
      //  $('.m3-2-2020-mobile').addClass('hide');

    //}
  //  else {
    //    $('.navorange').removeClass('stick');
    //        $('.m3-2-2020-mobile').removeClass('hide');
  //  }
// });





//march 3 2020 new nav

$('.js-toggle-menu').click(function(e){
e.preventDefault();

if ( $('.navorange.hide').hasClass('hide') )
{
    $('.navorange.hide').removeClass('hide');
    event.stopPropagation();
} else {
    $('.navorange').removeClass('hide');
    $('.navorange').addClass('hide');
    event.stopPropagation();
}




if ( $('.mobile-menu-toggle.js-toggle-menu.hamburger-menu').hasClass('open') ) {
    $('.mobile-menu-toggle.js-toggle-menu.hamburger-menu').removeClass('open');
    event.stopPropagation();
} else {
    $('.mobile-menu-toggle.js-toggle-menu.hamburger-menu.open').removeClass('open');
    $('.mobile-menu-toggle.js-toggle-menu.hamburger-menu').addClass('open');
    event.stopPropagation();
}




  if ( $('.mobile-header-nav').hasClass('mo-active') ) {
      $('.mobile-header-nav').removeClass('mo-active');
      event.stopPropagation();
  } else {
      $('.mobile-header-nav.mo-active').removeClass('mo-active');
      $('.mobile-header-nav').addClass('mo-active');
      event.stopPropagation();
  }





});




$(document).ready(function(){

// old drop with no close on main
// $('.tt-d-sec').click(function(){
//    $('.tt-d-sec').removeClass("d-l-active");
//  $(this).addClass("d-l-active");
//});


$('.m3-2-2020-country').click( function(){
    if ( $(this).hasClass('m3-active') ) {
        $(this).removeClass('m3-active');
				event.stopPropagation();
    } else {
        $('.m3-2-2020-country.m3-active').removeClass('m3-active');
        $(this).addClass('m3-active');
				event.stopPropagation();
    }

});


$('.mobile-head-sub').click( function(){
    if ( $(this).hasClass('m3-sub-active') ) {
        $(this).removeClass('m3-sub-active');
				event.stopPropagation();
    } else {
        $('.mobile-head-sub.m3-sub-active').removeClass('m3-sub-active');
        $(this).addClass('m3-sub-active');
				event.stopPropagation();
    }

});

});

$(document).on("click", function(event)
{
    $('.m3-2-2020-country.m3-active').removeClass('m3-active');
    $('.mobile-head-sub.m3-sub-active').removeClass('m3-sub-active');
      $('.mobile-header-nav.mo-active').removeClass('mo-active');
        $('.mobile-menu-toggle.js-toggle-menu.hamburger-menu.open').removeClass('open');
});






//end march 3 2020 new nav





$(function sugoi() {
	$(window).scroll(function() {
		if ($(window).scrollTop() > 50) {
			$(".bg-lbc").addClass("scroll-bt-danger");
		} else {
			$(".bg-lbc").removeClass("scroll-bt-danger");
		}
	});
});

(function sugoime() {
    var xclick = document.querySelector(".burger-container"),
        header = document.querySelector(".headermobile");

    xclick.onclick = function() {
        header.classList.toggle("menu-opened");


    };
})();



// $('.noscroll4me').click(function() {
 //   var $this = $(this);

//    if ($this.hasClass('noscroll4me')) {
// $this.removeClass('noscroll4me').addClass('scroll4me');
 //   } else if ($this.hasClass('scroll4me')) {
 //   $this.removeClass('scroll4me').addClass('noscroll4me');
   // }
// });




$('.burger-container').on('click', function(e){
  e.preventDefault();
  $('body').toggleClass('disableme');
});
