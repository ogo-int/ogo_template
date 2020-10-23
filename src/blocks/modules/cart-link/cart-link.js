// Ссылка на корзину
$(function () {
  $(".b-cart-link").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        350: "_mx350"
      }
    });
  });
});
