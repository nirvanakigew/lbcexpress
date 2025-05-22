
  (function ($) {

      $.fn.rsearchit2 = function (options){

          return this.each(function () {

              $.fn.rsearchit2.globals = $.fn.rsearchit2.globals || {
                  counter: 3
              }
              $.fn.rsearchit2.globals.counter++;
              var $counter = $.fn.rsearchit2.globals.counter;

              var $t = $(this);
              var opts = $.extend({}, $.fn.rsearchit2.defaults, options);

              // Setup default text field and class
     if (opts.textField == null) {
                  $t.before("<input  class='ratesorde'  placeholder='Choose Country' type='textbox' id='__searchit" + $counter + "'><br>");
                  opts.textField = $('#__searchit' + $counter);
              }
              if (opts.textField.length > 1) opts.textField = $(opts.textField[0]);

              if (opts.textFieldClass) opts.textField.addClass(opts.textFieldClass);
              //MY CODE-------------------------------------------------------------------
             
              //MY CODE ENDS HERE -------------------------------------------------------
    if (opts.dropDown) {
        $t
    //     .css("margin-top", "10px")
      //  .css("Font-family", "MyriadPro")
// .css(" -webkit-appearance", "none")
   
  // .css("border", "solid #D80A28 1px")
 //   .css("background-color", "#fff")
   // .css("color", "#D80A28")
  //   .css("z-index", "1030")
  //   .css("margin-left", "-70px")
  //  .css("text-decoration", "none")
  //  .css("outline", "none")
  //  .css("width", "100%")
   //  .css("padding", "15px")
   // .css("position", "relative") 
   // .css("font-size", "20px");
     
        .css("padding", "15px")
         .css("overflow", "auto;")
      .css("min-height", "120px")
        .css("max-height", "320px")
   .css("border", "solid #fff 1px")
    .css("color", "#D80A28")
    .css("text-decoration", "none")
    .css("outline", "none")
    .css("font-size", "20px")
    .css("z-index", "1030")
     .css("position", "relative")
        
        
        
        
        

                  $t.wrap("<div id='__searchitWrapper" + $counter + "' />");
                  opts.wrp = $('#__searchitWrapper' + $counter);
                  opts.wrp.css("display", "inline-block")
.css("vertical-align", "top")
.css("Font-family", "MyriadPro")
.css("margin-top", "-5px")
.css("position", "absolute")
.css("outline", "none")
.css("text-decortation", "none")


.hide();
if (opts.dropDownClass) opts.wrp.addClass(opts.dropDownClass);
              }

              opts.optionsFiltered = [];
              opts.optionsCache = [];

              // Save listbox current content
              $t.find("option").each(function (index) {
                  opts.optionsCache.push(this);
              });

              // Save options 
              $t.data('opts', opts);

              // Hook listbox click
              $t.click(function (event) {
                  _opts($t).textField.val($(this).find(":selected").text());
                  _opts($t).wrp.hide();
                  event.stopPropagation();
              });

              // Hook html page click to close dropdown
              $("html").click(function () {
                  _opts($t).wrp.hide();
              });

              // Hook the keyboard and we're done
              _opts($t).textField.keyup(function (event) {
                  if (event.keyCode == 13) {
                      $(this).val($t.find(":selected").text());
                      _opts($t).wrp.hide();
                      return;
                  }
                  setTimeout(_findElementsInListBox($t, $(this)), 50);
              })

          })


          function _findElementsInListBox(lb, txt) {

              if (!lb.is(":visible")) {
                  _showlb(lb);
              }

              _opts(lb).optionsFiltered = [];
              var count = _opts(lb).optionsCache.length;
              var dropDown = _opts(lb).dropDown;
              var searchText = txt.val().toLowerCase();

              // find match (just the old classic loop, will make the regexp later)
              $.each(_opts(lb).optionsCache, function (index, value) {
                  if ($(value).text().toLowerCase().indexOf(searchText) > -1) {
                      // save matching items 
                      _opts(lb).optionsFiltered.push(value);
                  }

                  // Trigger a listbox reload at the end of cycle    
                  if (!--count) {
                      _filterListBox(lb);
                  }
              });
          }

          function _opts(lb) {
              return lb.data('opts');
          }

          function _showlb(lb) {
              if (_opts(lb).dropDown) {
                  var tf = _opts(lb).textField;
                  lb.attr("size", _opts(lb).size);
                  _opts(lb).wrp.show().offset({
                      top: tf.offset().top + tf.outerHeight(),
                      left: tf.offset().left
                  });
                  _opts(lb).wrp.css("width", tf.outerWidth() + "px");
                  lb.css("width", (tf.outerWidth() + 5) + "px");
              }
          }

          function _filterListBox(lb) {
              lb.empty();

              if (_opts(lb).optionsFiltered.length == -1) {
                  lb.append("<option>" + _opts(lb).noElementText + "</option>");
              } else {
                  $.each(_opts(lb).optionsFiltered, function (index, value) {
                      lb.append(value);
                  });
                  lb[0].selectedIndex = -1;
              }
          }
      }

      $.fn.rsearchit2.defaults = {
          textField: null,
          textFieldClass: null,
          dropDown: true,
          dropDownClass: null,
          size: 5,
          filtered: true,
          noElementText: "No elements found",
          //MY CODE------------------------------------------
          selected: false
          //MY CODE ENDS ------------------------------------
      }

  }(jQuery))

   $("#tothephil1").rsearchit2({
      textFieldClass: 'newsearch-rates',
      selected: true
  });
   $("#fromthephil2").rsearchit2({
      textFieldClass: 'newsearch-rates',
      selected: true
  });




