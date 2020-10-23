// Фильтр товаров каталога
$(function () {
  $(".b-smart-filter").livequery(function () {
    var $context = $(this);
    var $paramLinks = $(".b-smart-filter__params-name", $context);

    $context.removeClass("_nojs");

    function toggleParams() {
      var $item = $(this).closest(".b-smart-filter__params-item");
      var $container = $(".b-smart-filter__params-holder", $item);
      $item.toggleClass("_opened");
      $container.slideToggle(400);
      return false;
    }

    function slideUp() {
      $(".b-smart-filter__params-item:not(._opened) .b-smart-filter__params-holder", $context).slideUp(0);
    }

    slideUp();
    $paramLinks.on("click", toggleParams);
  });
});
