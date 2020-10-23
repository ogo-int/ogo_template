// Плиток категорий товаров
$(function () {
  $(".b-intro-plates").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        880: "_mx880",
        590: "_mx590",
        480: "_mx480",
        475: "_mx475"
      },
      minWidth: {
        1010: "_mn1010"
      }
    });
  });
});
