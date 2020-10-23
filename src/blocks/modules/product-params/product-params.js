// Параметры продукта
$(function () {
  $(".b-product-params").livequery(function () {
    var $context = $(this);
    var $sectionCaptions = $(".b-product-params__section-caption", $context);
    var $sectionContainers = $(".b-product-params__section-holder", $context);

    function toggleSection() {
      var $caption = $(this);
      var $container = $caption.next();

      $container.slideToggle(400);

      $caption.toggleClass("b-product-params__section-caption_active");
      $container.toggleClass("b-product-params__section-holder_active");
    }

    $context.adaptBlock({
      maxWidth: {
      }
    });

    $sectionContainers.filter(":not(.b-product-params__section-holder_active)").slideUp(0);
    $sectionCaptions.on("click", toggleSection);
  });
});
