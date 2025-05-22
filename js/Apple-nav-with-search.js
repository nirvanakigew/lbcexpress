$(document).ready(function() {
  $("#searchbox").click(function() {
    $(".menu-item").addClass("hide-item");
    $(".search-formNav").addClass("active");
    $(".closeNav").addClass("active");
      
      setTimeout(function(){
      $(".search-formNav").children().find('.inputsearch-nav').focus();
    }, 1100);
      
  });
  $(".closeNav").click(function() {
    $(".menu-item").removeClass("hide-item");

    $(".search-formNav").removeClass("active");
    $(".closeNav").removeClass("active");
     
    
  });
});



