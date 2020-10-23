// Боковая панель в мобильной версии
$(function() {
  $(".b-mobile-aside").livequery(function () {
    var $context = $(this);

    $context.on("mobile-menu.open", function () {
      $context.addClass("_sub-menu-opened");
    });

    $context.on("mobile-menu.close", function () {
      $context.removeClass("_sub-menu-opened");
    });
  });
});
