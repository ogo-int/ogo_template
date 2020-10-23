// Выбранные в конфигураторе продукт
$(function () {
  $(".b-cart-product").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        950: "_mx950",
        850: "_mx850",
        730: "_mx730"
      }
    });
  });
});
