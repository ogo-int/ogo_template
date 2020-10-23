// Адрес курьерской доставки
$(function () {
  $(".b-delivery-address").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        380: "_mx380"
      }
    });
  });
});
