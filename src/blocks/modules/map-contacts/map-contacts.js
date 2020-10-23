// Список салонов на карте
$(function () {
  $(".b-map-contacts").livequery(function () {
    var $context = $(this);
    var $cols = $(".b-map-contacts__cols", $context);
    var $shops = $(".b-shops-list__shop", $context);
    var $map = $(".b-ymap");

    function equalize () {
      $cols.css("height", "");
      setTimeout(function () {
        $cols.css("height", $cols.height());
      }, 200);
    }

    function fillMap() {
      $shops.each(function () {
        var $shop = $(this);
        $map.trigger("resetPlacemarks.block");
        setTimeout(function () {
          $map.trigger("setPlacemark.block",[{
            coords: $shop.data("coords").split(","),
            address: $(".b-shops-list__shop-address", $shop).html(),
            phone: $(".b-shops-list__shop-phone", $shop).html(),
            hours: $(".b-shops-list__shop-hours", $shop).html(),
            link: $shop.data("link"),
            type: $shop.closest(".b-shops-list__group").find(".b-shops-list__group-name").data("map-title")
          }]);
        }, 300);
      });
    }

    function showShop() {
      $map.trigger("setCenter.block", [$(this).data("coords").split(","), 14]);
      return false;
    }

    $shops.on("click", showShop);

    equalize();
    $(window).on("resize", equalize);
    $context.on("resize.block", equalize);

    $map.on("mapReady.block", fillMap);

    $context.adaptBlock({
      maxWidth: {
        880: "_mx880"
      }
    });
  });
});
