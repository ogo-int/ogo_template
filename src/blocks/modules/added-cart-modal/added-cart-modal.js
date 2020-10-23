// Попап товар добавлен в корзину
$(function () {
  $(".b-added-cart").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        610: "_mx610",
        450: "_mx450"
      }
    });
  });
});