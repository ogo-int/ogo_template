// Промоблок 4
$(function () {
  $(".b-promo-block4").livequery(function () {
    var $context = $(this);
    $context.adaptBlock({
      maxWidth: {
        580: "_mx580"
      }
    });
  });
});
