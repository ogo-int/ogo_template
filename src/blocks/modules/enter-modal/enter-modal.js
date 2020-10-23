// Попап авторизации
$(function () {
  $(".b-enter-modal").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        610: "_mx610",
        450: "_mx450"
      }
    });
  });
});
