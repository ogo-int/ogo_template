// Форма выбора города
$(function () {
  $(".b-town-modal").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        450: "_mx450"
      }
    });
  });
});
