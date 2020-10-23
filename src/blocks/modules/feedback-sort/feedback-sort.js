// Сортировка отзывов
$(function () {
  $(".b-feedback-sort").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        620: "_mx620",
        380: "_mx380"
      }
    });
  });
});
