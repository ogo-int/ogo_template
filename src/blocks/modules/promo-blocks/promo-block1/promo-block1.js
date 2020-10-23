// Промоблок 1
$(function () {
  $(".b-promo-block1").livequery(function () {
    var $context = $(this);
    $context.adaptBlock({
      maxWidth: {
        400: "_mx400"
      }
    });
  });
});
