// Выбранные в конфигураторе продукт
$(function () {
  $(".b-configurator-product").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        620: "_mx620",
        415: "_mx415",
        350: "_mx350"
      }
    });
  });
});
