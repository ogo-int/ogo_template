// Список товаров конфигуратора
$(function () {
  $(".b-configurator-items").livequery(function () {
    var $context = $(this);
    var $checkboxes = $(".b-checkbox", $context);

    $checkboxes.on("click touch", function () {
      return false;
    });

    $context.adaptBlock({
      maxWidth: {
        600: "_mx600",
        350: "_mx350"
      }
    });
  });
});
