// Мобильный хедер
$(function () {
  $(".b-mobile-header").livequery(function () {
    var $context = $(this);
    var $searchLink = $(".b-mobile-header__search-link", $context);
    var $searchHolder = $(".b-mobile-header__search-line", $context);
    var $searchInput = $(".b-search-line__input", $context);

    function showSearchLine () {
      $context.addClass("_search-open");
      return false;
    }

    function hideSearchLine (e) {
      if($(e.target).is($searchHolder) || $(e.target).closest($searchHolder).length > 0) return true;
      $context.removeClass("_search-open");
    }

    $searchLink.on("click", showSearchLine);
    $("body").on("click", hideSearchLine);

    $(window).on("resize", function () {
      $context.removeClass("_search-open");
    });

    $context.adaptBlock({
      maxWidth: {
        680: "_mx680",
        440: "_mx440"
      }
    });
  });
});
