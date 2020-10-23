// Промоблок с картой
$(function () {
  $(".b-bonus-promo").each(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        700: "_mx700"
      }
    });
  });
});
