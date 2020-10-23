// Понравился товар?
$(function () {
  $(".b-product-share").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        860: "_mx860",
        560: "_mx560"
      }
    });
  });
});
