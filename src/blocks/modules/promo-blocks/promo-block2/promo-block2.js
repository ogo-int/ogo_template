// Промоблок 2
$(function () {
  $(".b-promo-block2").livequery(function () {
    var $context = $(this);
    var $expandLink = $(".b-promo-block2__expand-link", $context);
    var $closeLink = $(".b-promo-block2__close", $context);

    function expandBlock (e) {
      $context.removeClass("_collapsed");
      e.preventDefault();
    }

    function closeBlock (e) {
      //$context.addClass('_collapsed');
      $context.remove();
      e.preventDefault();
    }

    $expandLink.on("click", expandBlock);
    $closeLink.on("click", closeBlock);

    $context.adaptBlock({
      maxWidth: {
        780: "_mx780",
        700: "_mx700",
      }
    });
  });
});
