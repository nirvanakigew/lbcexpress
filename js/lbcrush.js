const items = document.querySelectorAll(".accordion9292023 button");

function toggleAccordion() {
  const itemToggle = this.getAttribute('aria-expanded');
  
  for (i = 0; i < items.length; i++) {
    items[i].setAttribute('aria-expanded', 'false');
  }
  
  if (itemToggle == 'false') {
    this.setAttribute('aria-expanded', 'true');
  }
}

items.forEach(item => item.addEventListener('click', toggleAccordion));




$('.autoplay-1').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  dots: true,
});



$('.cod-autoplay-3 ').slick({
  slidesToShow: 3,
      slidesToScroll: 3,
      autoplay: false,
      autoplaySpeed: 2000,
      dots: false,
responsive: [

{
  breakpoint: 766,
  settings: {
    slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      dots: true,
      
  }
}
]
});






$('.ah-autoplay-3').slick({
  slidesToShow: 3,
      slidesToScroll: 3,
      autoplay: false,
      autoplaySpeed: 2000,
      dots: false,
responsive: [

{
  breakpoint: 766,
  settings: {
    slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      dots: true,
      
  }
}
]
});





$('.ah-autoplay-4').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      dots: true,
responsive: [

{
  breakpoint: 766,
  settings: {
    slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      dots: true,
      
  }
}
]
});










var title = 0;
jQuery(".ah-div-height").each(function(){
  if ($(this).height() > title) { title = $(this).height(); }
});
jQuery(".ah-div-height").height(title);


// on Resize change height

jQuery(window).resize(function(){
  jQuery(".ah-div-height").height("");
  var title = 0;
  jQuery(".ah-div-height").each(function(){
    if ($(this).height() > title) { title = $(this).height(); }
  });
  jQuery(".ah-div-height").height(title);
});

