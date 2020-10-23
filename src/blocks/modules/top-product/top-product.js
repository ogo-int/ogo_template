// Продукт с отзывом
$(function () {
  $(".b-top-product").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        470: "_mx470"
      }
    });
  });
});
