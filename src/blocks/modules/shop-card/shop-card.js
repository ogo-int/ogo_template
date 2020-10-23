// Карточка магазина
$(function () {
  $(".b-shop-card").livequery(function () {
    var $context = $(this);
    var $tabLinks = $(".b-shop-card__way-link", $context);
    var $tabContainers = $(".b-shop-card__way-tab", $context);

    function changeTab () {
      var $link = $(this);
      var index = $tabLinks.index($link);

      if($link.hasClass("_active")) return false;

      $tabLinks.removeClass("_active");
      $tabContainers.removeClass("_active");
      $link.addClass("_active");
      $tabContainers.eq(index).addClass("_active");

      return false;
    }

    $tabLinks.on("click", changeTab);

    $context.adaptBlock({
      maxWidth: {
        700: "_mx700",
        625: "_mx625",
        570: "_mx570",
        450: "_mx450"
      }
    });
  });
});
