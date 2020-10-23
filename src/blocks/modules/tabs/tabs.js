// Ссылки на содержимое карточки продукта
$(function () {
  $(".b-tabs").livequery(function () {
    var $context = $(this);
    var $tabs = $(".b-tabs__col", $context);
    var $tabHolders = $(".b-tabs__holder", $context);
    var collapseWidth = $context.data("collapse") || 300;

    var adaptParams = {
      maxWidth: {},
      minWidth: {}
    };

    function changeTab () {
      var $item = $(this);
      var $link = $(".b-tabs__link", $item);
      var index = $tabs.index($item);

      if($item.hasClass("b-tabs__col_active") || $link.hasClass("_disabled")) return false;

      $tabs.removeClass("b-tabs__col_active");
      $item.addClass("b-tabs__col_active");
      $tabHolders.removeClass("b-tabs__holder_active");
      $tabHolders.eq(index).addClass("b-tabs__holder_active");

      $("*", $tabHolders.eq(index)).trigger("resize.block");

      return false;
    }

    $tabs.on("click", changeTab);

    adaptParams.maxWidth[collapseWidth] = "_collapsed";

    $context.adaptBlock(adaptParams);
  });
});
