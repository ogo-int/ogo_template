// Дополнительные компоненты конфигуратора
$(function () {
  $(".b-configurator-additional").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        630: "_mx630",
        420: "_mx420"
      },
      minWidth: {
        1000: "_mn1000"
      }
    });
  });
});
