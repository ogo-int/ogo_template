// Промоблок 4
$(function () {
  $(".b-promo-block5").livequery(function () {
    var $context = $(this);
    $context.adaptBlock({
      maxWidth: {
        1120: "_mx1120",
        900: "_mx900",
        500: "_mx500"
      }
    });
  });
});
