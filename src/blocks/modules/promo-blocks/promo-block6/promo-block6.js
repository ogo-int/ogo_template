// Промоблок 4
$(function () {
  $(".b-promo-block6").livequery(function () {
    var $context = $(this);
    $context.adaptBlock({
      maxWidth: {
        1020: "_mx1020",
        950: "_mx950",
        630: "_mx630"
      },
    });
  });
});
