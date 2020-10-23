// Внутреннее меню
$(function () {
  $(".b-inner-menu").livequery(function() {
    var $context = $(this);
    var $topLinks = $(".b-inner-menu__top-link", $context);
    var $topItems = $(".b-inner-menu__top-item", $context);

    function openSubMenu () {
      var $link = $(this);
      var $item = $link.closest(".b-inner-menu__top-item");
      var $container = $(".b-inner-menu__sub-level", $item);

      if(!$link.hasClass("b-inner-menu__top-link_contain")) return true;

      if($item.hasClass("_opened")) {
        $container.slideUp(400);
        $item.removeClass("_opened");
      } else {
        $container.slideDown(400);
        $item.addClass("_opened");
      }
      return false;
    }

    function init() {
      var $containers = $(".b-inner-menu__sub-level", $topItems.filter(":not(._opened)"));
      $containers.slideUp(0);
    }

    init();
    $topLinks.on("click", openSubMenu);
  });
});
