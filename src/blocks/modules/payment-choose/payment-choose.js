// Выбор способа оплаты
$(function () {
  $(".b-payment-choose").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        930: "_mx930",
        540: "_mx540"
      }
    });
  });
});
