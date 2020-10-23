// Сортировка каталога
$(function () {
  $(".b-catalog-sort").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        1000: "_mx1000",
        767: "_mx767",
        479: "_mx479"
      }
    });
  });
});
