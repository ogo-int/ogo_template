// Выбор способа доставки
$(function () {
  $(".b-delivery-choose").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        680: "_mx680"
      }
    });
  });
});
