// Баннер с инструкциями к бонусной карте
$(function () {
  $(".b-bonus-instruction").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        760: "_mx760",
        420: "_mx420"
      }
    });
  });
});
