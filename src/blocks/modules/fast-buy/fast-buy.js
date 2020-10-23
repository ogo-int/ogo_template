// Купить в 1 клик
$(function () {
  $(".b-fast-buy").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        620: "_mx620"
      }
    });
  });
});
