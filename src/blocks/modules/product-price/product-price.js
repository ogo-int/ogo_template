// Стоимость в карточке товара
$(function () {
  $(".b-product-price").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        480: "_mx480",
        380: "_mx380"
      }
    });
  });
});
