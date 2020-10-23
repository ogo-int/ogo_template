// Плиток категорий товаров
$(function () {
  $(".b-main-plates").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        960: "_mx960",
        740: "_mx740",
        475: "_mx475"
      }
    });
  });
});
