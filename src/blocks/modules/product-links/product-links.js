// Ссылки на содержимое карточки продукта
$(function () {
  $(".b-product-links").livequery(function () {
    var $context = $(this);
    var $links = $(".b-product-links__link", $context);

    function slowScroll (e) {
      var $this = $(this);
      var $target = $($this.attr("href"));

      if($target.length == 0) return;

      $("body").animate({
        scrollTop: ($target.offset().top - 80)
      }, 300);

      e.preventDefault();
    }

    $links.on("click", slowScroll);

    $context.adaptBlock({
      maxWidth: {
        720: "_mx720"
      }
    });
  });
});
