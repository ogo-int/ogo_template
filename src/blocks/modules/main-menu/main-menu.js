// Главное меню
$(function blockMainMenu() {
  $(".b-main-menu").livequery(function () {
    var $context = $(this);
    var $topLinks = $(".b-main-menu__top-link", $context);
    var $topItems = $(".b-main-menu__top-item", $context);
    var $holders = $(".b-main-menu__top-holder", $context);
    var $subItems = $(".b-main-menu__sub-item", $context);
    var $subLevel = $(".b-main-menu__sub-level", $context);
    var $subHolders = $(".b-main-menu__sub-holder", $context);
    var timeout = 300;
    var timeoutOpenInstance;
    var timeoutCloseInstance;
    var timeoutTabsChangeInstance;
    var timeoutMainChangeInstance;


    _timeout = timeout;

    $context.removeClass("_delay");

    function delaySet() {
      if($context.hasClass("_delay")) {
        clearTimeout(timeoutCloseInstance);
        clearTimeout(timeoutTabsChangeInstance);
      } else {
        clearTimeout(timeoutOpenInstance);
        timeoutOpenInstance = setTimeout(function() {
          $context.addClass("_delay");
        }, timeout);
      }
    }

    function changeTopLink () {
      var $link = $(this);
      var index = $topLinks.index($link);
      // var color = $link.attr('data-color') || 'red';

      clearTimeout(timeoutMainChangeInstance);
      if($link.hasClass("_active")) return false;

      timeoutMainChangeInstance = setTimeout(function () {
        $context.addClass("_expand");
        $holders.removeClass("_expand");
        $topLinks.removeClass("_expand");
        $topItems.removeClass("_expand");
        $subItems.removeClass("_expand");
        $holders.eq(index).addClass("_expand");
        $topItems.eq(index).addClass("_expand");
      }, 300);
    }

    function collapseTopLevel () {
      clearTimeout(timeoutOpenInstance);
      clearTimeout(timeoutTabsChangeInstance);
      timeoutCloseInstance = setTimeout(function () {
        $holders.removeClass("_expand");
        $topLinks.removeClass("_expand");
        $topItems.removeClass("_expand");
        $context.removeClass("_expand _delay");
        $subItems.removeClass("_expand");
      }, timeout);
    }

    function expandSubLevel () {
      var $item = $(this);
      var $activeItem = $subItems.filter("._expand");

      clearTimeout(timeoutTabsChangeInstance);
      if($item.hasClass("_expand")) return;

      timeoutTabsChangeInstance = setTimeout(function() {
        if($activeItem.length > 0) {
          $item.addClass("_expand");
          $activeItem.removeClass("_expand");
        } else {
          $item.addClass("_expand-effect");

          setTimeout(function () {
            $item.addClass("_expand");
          }, timeout);

          setTimeout(function () {
            $item.removeClass("_expand-effect");
          }, timeout*2);
        }
      }, timeout);
    }

    function preventCollapse () {
      clearTimeout(timeoutTabsChangeInstance);
    }

    function preventCollapseMain () {
      clearTimeout(timeoutMainChangeInstance);
    }

    $topLinks.on("mouseenter", changeTopLink);

    $context.on("mouseenter", delaySet);
    $context.on("mouseleave", collapseTopLevel);
    $subItems.on("mouseenter", expandSubLevel);
    $subHolders.on("mouseenter", preventCollapse);
    $holders.on("mouseenter", preventCollapseMain);

    $context.adaptBlock({
      maxWidth: {
        1060: "_mx1060"
      }
    });
  });
});
