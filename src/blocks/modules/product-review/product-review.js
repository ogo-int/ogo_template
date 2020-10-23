// Обзор продукта
$(function () {
  $(".b-product-review").livequery(function () {
    var $context = $(this);
    var $moreBtn = $(".b-product-review__more", $context);
    var $moreHolder = $(".b-product-review__more-holder", $context);
    var $moreText = $(".b-product-review__full-text", $context);

    function showMore () {
      $moreText.slideDown(400);
      $moreHolder.addClass("_more-open");
      $moreText.addClass("_more-open");
      return false;
    }

    $moreBtn.on("click", showMore);

    $context.adaptBlock({
      maxWidth: {
        930: "_mx930"
      }
    });
  });
});
