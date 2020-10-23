// Плиток категорий товаров
$(function () {
  $(".b-subcategory-plates").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        740: "_mx740",
        465: "_mx465",
        400: "_mx400"
      }
    });
  });
});
