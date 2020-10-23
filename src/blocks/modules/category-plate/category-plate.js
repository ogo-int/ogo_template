// Одиночная плитка категории
$(function () {
  $(".b-category-plate").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        220: "_mx220"
      }
    });
  });
});
