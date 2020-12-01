// Универсальный аккордион
$(function () {
  $(document).ready(function(){
    accordion.init({
      speed: 100,
      single: false
    });

    $(document).on('click', '.b-product-delivery__popup', function(e){
      e.preventDefault();
      $.fancybox.open({
        href: $(this).attr('href')
      }, {
        //options
        type: 'ajax',
        autoSize: true,
        fitToView: true,
        maxWidth: 1280,
        padding: 0,
        beforeShow: function () {
          $('html').addClass('fancybox-margin fancybox-lock');
          
          if (typeof ymaps !== "undefined") {
            ymaps.ready(function () {
              $(document).trigger("ymapAPIready");
              $(window).trigger("ymapAPIready");
              ymapAPIready = true;
            });
          }
          
          $('.iblock', this.inner).trigger('resize.block');
        },
        beforeClose: function () {
          $('.fancybox-inner .b-ymap').trigger('destroy.block');
        },
        afterShow: function () {
          $('.fancybox-wrap').livequery();
        }
      })
    });
  });
});
