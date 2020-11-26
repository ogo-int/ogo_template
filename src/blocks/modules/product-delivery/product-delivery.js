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
        type: 'inline',
        autoSize: true,
        fitToView: true,
        maxWidth: 1280,
        padding: 0
      })
    })
  });
});
