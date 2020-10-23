// Форма добавления адреса
$(function () {
  $(".b-feedback-form").livequery(function () {
    var $context = $(this);
    var $townInput = $(".b-feedback-form__town-input", $context);

    $context.adaptBlock({
      maxWidth: {
        500: "_mx500"
      },
      minWidth: {
      }
    });
  });
});
