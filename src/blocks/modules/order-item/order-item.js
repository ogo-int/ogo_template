// Содержимое заказа
$(function () {
  $(".b-order-item").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        780: "_mx780",
        590: "_mx590",
        479: "_mx479"
      }
    });
  });
});
