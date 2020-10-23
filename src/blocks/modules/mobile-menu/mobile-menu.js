// Мобильное меню
$(function () {
  $(".b-mobile-menu").livequery(function () {
    var $context = $(this);
    var $topLinks = $(".b-mobile-menu__top-link", $context);
    var $subLinks = $(".b-mobile-menu__sub-link", $context);
    var $topContainers = $(".b-mobile-menu__container", $context);
    var $returnLink = $(".b-mobile-menu__return-link", $context);

    function openSubMenu () {
      var $link = $(this);
      var index = $topLinks.index($link);
      var $container = $link.siblings(".b-mobile-menu__container");
      $container.addClass("_active");
      $context.addClass("_sub-menu-opened");
      $context.trigger("mobile-menu.open");
      return false;
    }

    function toggleThirdMenu () {
      var $link = $(this);
      var $container = $link.siblings(".b-mobile-menu__sub-container");

      if(!$link.hasClass("_open")) {
        $container.addClass("_active");
        $link.addClass("_open");
      } else {
        $container.removeClass("_active");
        $link.removeClass("_open");
      }
      return false;
    }

    function closeSubMenu () {
      $context.removeClass("_sub-menu-opened");
      $topContainers.removeClass("_active");
      $context.trigger("mobile-menu.close");
      return false;
    }

    $topLinks.filter("._contain").on("click", openSubMenu);
    $subLinks.filter("._contain").on("click", toggleThirdMenu);
    $returnLink.on("click", closeSubMenu);
  });
});
