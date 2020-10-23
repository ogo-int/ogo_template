// Попап регистрации
$(function () {
  $(".b-registration-modal").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        610: "_mx610",
        450: "_mx450"
      }
    });
  });
});
