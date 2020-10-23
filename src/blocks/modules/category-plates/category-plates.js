// Плиток категорий товаров
$(function () {
  $(".b-category-plates").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        700: "_mx700",
        475: "_mx475"
      }
    });
  });
});
