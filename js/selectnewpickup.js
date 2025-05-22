$('.biller-select-list').each(function(){
    var $this14 = $(this), numberOfOptions14 = $(this).children('option').length;
  
    $this14.addClass('select-hidden24'); 
    $this14.wrap('<div class="select24"></div>');
    $this14.after('<div class="select-styled24"></div>');

    var $styledSelect14 = $this14.next('div.select-styled24');
    $styledSelect14.text($this14.children('option').eq(0).text());
  
    var $list14 = $('<ul />', {
        'class': 'select-options24'
    }).insertAfter($styledSelect14);
  
    for (var i12 = 0; i12 < numberOfOptions14; i12++) {
        $('<li />', {
            text: $this14.children('option').eq(i12).text(),
            rel: $this14.children('option').eq(i12).val()
        }).appendTo($list14);
    }
  
    var $listItems14 = $list14.children('li');
  
    $styledSelect14.click(function(e) {
        e.stopPropagation();
        $('div.select-styled24.active').not(this).each(function(){
$(this).removeClass('active').next('ul.select-options24').hide();
        });
$(this).toggleClass('active').next('ul.select-options24').toggle();
    });
  
    $listItems14.click(function(e) {
        e.stopPropagation();
        $styledSelect14.text($(this).text()).removeClass('active');
        $this14.val($(this).attr('rel'));
        $list14.hide();
        //console.log($this2.val());
    });
  
    $(document).click(function() {
        $styledSelect14.removeClass('active');
        $list14.hide();
    });

});


$('.becomeabiller-select-list').each(function(){
    var $this14 = $(this), numberOfOptions14 = $(this).children('option').length;
  
    $this14.addClass('select-hidden25'); 
    $this14.wrap('<div class="select25"></div>');
    $this14.after('<div class="select-styled25"></div>');

    var $styledSelect14 = $this14.next('div.select-styled25');
    $styledSelect14.text($this14.children('option').eq(0).text());
  
    var $list14 = $('<ul />', {
        'class': 'select-options25'
    }).insertAfter($styledSelect14);
  
    for (var i12 = 0; i12 < numberOfOptions14; i12++) {
        $('<li />', {
            text: $this14.children('option').eq(i12).text(),
            rel: $this14.children('option').eq(i12).val()
        }).appendTo($list14);
    }
  
    var $listItems14 = $list14.children('li');
  
    $styledSelect14.click(function(e) {
        e.stopPropagation();
        $('div.select-styled25.active').not(this).each(function(){
$(this).removeClass('active').next('ul.select-options25').hide();
        });
$(this).toggleClass('active').next('ul.select-options25').toggle();
    });
  
    $listItems14.click(function(e) {
        e.stopPropagation();
        $styledSelect14.text($(this).text()).removeClass('active');
        $this14.val($(this).attr('rel'));
        $list14.hide();
        //console.log($this2.val());
    });
  
    $(document).click(function() {
        $styledSelect14.removeClass('active');
        $list14.hide();
    });

});












$('.new-select-pickup-place').each(function(){
    var $this4 = $(this), numberOfOptions4 = $(this).children('option').length;
  
    $this4.addClass('select-hidden4'); 
    $this4.wrap('<div class="select4"></div>');
    $this4.after('<div class="select-styled4"></div>');

    var $styledSelect4 = $this4.next('div.select-styled4');
    $styledSelect4.text($this4.children('option').eq(0).text());
  
    var $list4 = $('<ul />', {
        'class': 'select-options4'
    }).insertAfter($styledSelect4);
  
    for (var i4 = 0; i4 < numberOfOptions4; i4++) {
        $('<li />', {
            text: $this4.children('option').eq(i4).text(),
            rel: $this4.children('option').eq(i4).val()
        }).appendTo($list4);
    }
  
    var $listItems4 = $list4.children('li');
  
    $styledSelect4.click(function(e) {
        e.stopPropagation();
        $('div.select-styled4.active4').not(this).each(function(){
            $(this).removeClass('active4').next('ul.select-options4').hide();
        });
        $(this).toggleClass('active4').next('ul.select-options4').toggle();
    });
  
    $listItems4.click(function(e) {
        e.stopPropagation();
        $styledSelect4.text($(this).text()).removeClass('active4');
        $this4.val($(this).attr('rel'));
        $list4.hide();
        //console.log($this4.val());
    });
  
    $(document).click(function() {
        $styledSelect4.removeClass('active4');
        $list4.hide();
    });

});










$('.rates-select-1').each(function(){
    var $this2 = $(this), numberOfOptions2 = $(this).children('option').length;
  
    $this2.addClass('select-hidden2'); 
    $this2.wrap('<div class="select2"></div>');
    $this2.after('<div class="select-styled2"></div>');

    var $styledSelect2 = $this2.next('div.select-styled2');
    $styledSelect2.text($this2.children('option').eq(0).text());
  
    var $list2 = $('<ul />', {
        'class': 'select-options2'
    }).insertAfter($styledSelect2);
  
    for (var i2 = 0; i2 < numberOfOptions2; i2++) {
        $('<li />', {
            text: $this2.children('option').eq(i2).text(),
            rel: $this2.children('option').eq(i2).val()
        }).appendTo($list2);
    }
  
    var $listItems2 = $list2.children('li');
  
    $styledSelect2.click(function(e) {
        e.stopPropagation();
        $('div.select-styled2.active').not(this).each(function(){
$(this).removeClass('active').next('ul.select-options2').hide();
        });
$(this).toggleClass('active').next('ul.select-options2').toggle();
    });
  
    $listItems2.click(function(e) {
        e.stopPropagation();
        $styledSelect2.text($(this).text()).removeClass('active');
        $this2.val($(this).attr('rel'));
        $list2.hide();
        //console.log($this2.val());
    });
  
    $(document).click(function() {
        $styledSelect2.removeClass('active');
        $list2.hide();
    });

});


$('.rates-select-1-remittance').each(function(){
    var $this2 = $(this), numberOfOptions2 = $(this).children('option').length;
  
    $this2.addClass('select-hidden2'); 
    $this2.wrap('<div class="select2"></div>');
    $this2.after('<div class="select-styled2"></div>');

    var $styledSelect2 = $this2.next('div.select-styled2');
    $styledSelect2.text($this2.children('option').eq(0).text());
  
    var $list2 = $('<ul />', {
        'class': 'select-options2'
    }).insertAfter($styledSelect2);
  
    for (var i2 = 0; i2 < numberOfOptions2; i2++) {
        $('<li />', {
            text: $this2.children('option').eq(i2).text(),
            rel: $this2.children('option').eq(i2).val()
        }).appendTo($list2);
    }
  
    var $listItems2 = $list2.children('li');
  
    $styledSelect2.click(function(e) {
        e.stopPropagation();
        $('div.select-styled2.active').not(this).each(function(){
$(this).removeClass('active').next('ul.select-options2').hide();
        });
$(this).toggleClass('active').next('ul.select-options2').toggle();
    });
  
    $listItems2.click(function(e) {
        e.stopPropagation();
        $styledSelect2.text($(this).text()).removeClass('active');
        $this2.val($(this).attr('rel'));
        $list2.hide();
        //console.log($this2.val());
    });
  
    $(document).click(function() {
        $styledSelect2.removeClass('active');
        $list2.hide();
    });

});


$('.rates-select-1-route').each(function(){
    var $this2 = $(this), numberOfOptions2 = $(this).children('option').length;
  
    $this2.addClass('select-hidden2'); 
    $this2.wrap('<div class="select2"></div>');
    $this2.after('<div class="select-styled2"></div>');

    var $styledSelect2 = $this2.next('div.select-styled2');
    $styledSelect2.text($this2.children('option').eq(0).text());
  
    var $list2 = $('<ul />', {
        'class': 'select-options2'
    }).insertAfter($styledSelect2);
  
    for (var i2 = 0; i2 < numberOfOptions2; i2++) {
        $('<li />', {
            text: $this2.children('option').eq(i2).text(),
            rel: $this2.children('option').eq(i2).val()
        }).appendTo($list2);
    }
  
    var $listItems2 = $list2.children('li');
  
    $styledSelect2.click(function(e) {
        e.stopPropagation();
        $('div.select-styled2.active').not(this).each(function(){
$(this).removeClass('active').next('ul.select-options2').hide();
        });
$(this).toggleClass('active').next('ul.select-options2').toggle();
    });
  
    $listItems2.click(function(e) {
        e.stopPropagation();
        $styledSelect2.text($(this).text()).removeClass('active');
        $this2.val($(this).attr('rel'));
        $list2.hide();
        //console.log($this2.val());
    });
  
    $(document).click(function() {
        $styledSelect2.removeClass('active');
        $list2.hide();
    });

});




$('.rates-select-1-document').each(function(){
    var $this2 = $(this), numberOfOptions2 = $(this).children('option').length;
  
    $this2.addClass('select-hidden2'); 
    $this2.wrap('<div class="select2"></div>');
    $this2.after('<div class="select-styled2"></div>');

    var $styledSelect2 = $this2.next('div.select-styled2');
    $styledSelect2.text($this2.children('option').eq(0).text());
  
    var $list2 = $('<ul />', {
        'class': 'select-options2'
    }).insertAfter($styledSelect2);
  
    for (var i2 = 0; i2 < numberOfOptions2; i2++) {
        $('<li />', {
            text: $this2.children('option').eq(i2).text(),
            rel: $this2.children('option').eq(i2).val()
        }).appendTo($list2);
    }
  
    var $listItems2 = $list2.children('li');
  
    $styledSelect2.click(function(e) {
        e.stopPropagation();
        $('div.select-styled2.active').not(this).each(function(){
$(this).removeClass('active').next('ul.select-options2').hide();
        });
$(this).toggleClass('active').next('ul.select-options2').toggle();
    });
  
    $listItems2.click(function(e) {
        e.stopPropagation();
        $styledSelect2.text($(this).text()).removeClass('active');
        $this2.val($(this).attr('rel'));
        $list2.hide();
        //console.log($this2.val());
    });
  
    $(document).click(function() {
        $styledSelect2.removeClass('active');
        $list2.hide();
    });

});



$('.rates-select-1-weight').each(function(){
    var $this2 = $(this), numberOfOptions2 = $(this).children('option').length;
  
    $this2.addClass('select-hidden2'); 
    $this2.wrap('<div class="select2"></div>');
    $this2.after('<div class="select-styled2"></div>');

    var $styledSelect2 = $this2.next('div.select-styled2');
    $styledSelect2.text($this2.children('option').eq(0).text());
  
    var $list2 = $('<ul />', {
        'class': 'select-options2'
    }).insertAfter($styledSelect2);
  
    for (var i2 = 0; i2 < numberOfOptions2; i2++) {
        $('<li />', {
            text: $this2.children('option').eq(i2).text(),
            rel: $this2.children('option').eq(i2).val()
        }).appendTo($list2);
    }
  
    var $listItems2 = $list2.children('li');
  
    $styledSelect2.click(function(e) {
        e.stopPropagation();
        $('div.select-styled2.active').not(this).each(function(){
$(this).removeClass('active').next('ul.select-options2').hide();
        });
$(this).toggleClass('active').next('ul.select-options2').toggle();
    });
  
    $listItems2.click(function(e) {
        e.stopPropagation();
        $styledSelect2.text($(this).text()).removeClass('active');
        $this2.val($(this).attr('rel'));
        $list2.hide();
        //console.log($this2.val());
    });
  
    $(document).click(function() {
        $styledSelect2.removeClass('active');
        $list2.hide();
    });

});














$('.rates-select-3').each(function(){
    var $this3 = $(this), numberOfOptions3 = $(this).children('option').length;
  
    $this3.addClass('select-hidden3'); 
    $this3.wrap('<div class="select3"></div>');
    $this3.after('<div class="select-styled3"></div>');

    var $styledSelect3 = $this3.next('div.select-styled3');
    $styledSelect3.text($this3.children('option').eq(0).text());
  
    var $list3 = $('<div/>', {
        'class': 'select-options3'
    }).insertAfter($styledSelect3);
  
    for (var i3 = 0; i3 < numberOfOptions3; i3++) {
        $('<option/>', {
            text: $this3.children('option').eq(i3).text(),
            rel: $this3.children('option').eq(i3).val()
        }).appendTo($list3);
    }
  
    var $listItems3 = $list3.children('option');
  
    $styledSelect3.click(function(e) {
        e.stopPropagation();
        $('div.select-styled3.active3').not(this).each(function(){
$(this).removeClass('active3').next('div.select-options3').hide();
        });
        $(this).toggleClass('active3').next('div.select-options3').toggle();
    });
  
    $listItems3.click(function(e) {
        e.stopPropagation();
        $styledSelect3.text($(this).text()).removeClass('active3');
        $this3.val($(this).attr('rel'));
        $list3.hide();
        //console.log($this2.val());
    });
  
    $(document).click(function() {
        $styledSelect3.removeClass('active3');
        $list3.hide();
    });

});














$('.new-select-pickup').each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;
  
    $this.addClass('select-hidden'); 
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());
  
    var $list = $('<ul/>', {
        'class': 'select-options'
    }).insertAfter($styledSelect);
  
    for (var i = 0; i < numberOfOptions; i++) {
        $('<li/>', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }
  
    var $listItems = $list.children('li');
  
    $styledSelect.click(function(e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function(){
$(this).removeClass('active').next('ul.select-options').hide();
        });
$(this).toggleClass('active').next('ul.select-options').toggle();
    });
  
    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
        //console.log($this.val());

          ///Navicode Custom
        //alert($(".dateSelectInput").val());
        //////////////////////////////////////////////////////
        
        if(($("#dateselect").val()!='') && ($("#timeselect").val()!='hide')){
            $(".btnConfirmDates").show();
            // $(".donedates").html($("#timeselect").text()+", "+$("#dateselect").text());
        }else{ 
            $(".btnConfirmDates").hide();
        }
        checkFormBooking();


        
    });
  
    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });

});