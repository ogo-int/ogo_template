// Форма добавления адреса
$(function () {
  $(".b-address-form").livequery(function () {
    var $context = $(this);
    var $townInput = $(".b-address-form__town-input", $context);

    $context.adaptBlock({
      maxWidth: {
        500: "_mx500"
      },
      minWidth: {
      }
    });
  });
});
