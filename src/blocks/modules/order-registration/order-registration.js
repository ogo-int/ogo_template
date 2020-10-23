// Заверешние регистрации после оформления
$(function () {
  $(".b-order-registration").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        820: "_mx820",
        420: "_mx420"
      }
    });
  });
});
