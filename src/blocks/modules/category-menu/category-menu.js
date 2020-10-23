// Меню в подкатегории каталога
$(function () {
  $(".b-category-menu").livequery(function () {
    var $context = $(this);
    var $items = $(".b-category-menu__item", $context);
    var $moreBtns = $(".b-category-menu__more", $context);

    function initExpanders () {
      $moreBtns.each(function () {
        var $btn = $(this);
        var $item = $btn.closest(".b-category-menu__item");
        var $moreHolder = $(".b-category-menu__top-level.js-more", $item);

        if(!$btn.hasClass("_open")) {
          $moreHolder.slideUp();
        } else {
          $moreHolder.slideDown();
        }
      });
    }

    function toggleExpander (e) {
      var $btn = $(this);
      var $item = $btn.closest(".b-category-menu__item");
      var $moreHolder = $(".b-category-menu__top-level.js-more", $item);

      if($btn.hasClass("_open")) {
        $moreHolder.slideUp(400);
        $btn.removeClass("_open");
      } else {
        $moreHolder.slideDown(400);
        $btn.addClass("_open");
      }

      e.preventDefault();
    }

    initExpanders();

    $moreBtns.on("click", toggleExpander);
  });
});
