// Получатель заказа
$(function () {
  $(".b-order-recipient").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        520: "_mx520"
      }
    });
  });
});
