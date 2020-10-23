// Баннер о доставке в ваш город
$(function () {
  $(".b-town-delivery").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        400: "_mx400",
        290: "_mx290"
      }
    });
  });
});
