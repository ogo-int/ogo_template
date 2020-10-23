// Список вакансий
$(function () {
  $(".b-jobs-list").livequery(function () {
    var $context = $(this);
    var $itemLinks = $(".b-jobs-list__item-caption", $context);
    var $itemContainers = $(".b-jobs-list__item-content", $context);
    var $containers = $(".b-jobs-list__item-content", $context);

    function expandContent() {
      var $link = $(this);
      var $container = $link.nextAll(".b-jobs-list__item-content").eq(0);

      if ($link.hasClass("_open")) {
        $container.slideUp(400);
        $link.removeClass("_open");
      } else {
        $containers.slideUp(400);
        $itemLinks.removeClass("_open");
        $container.slideDown(400);
        $link.addClass("_open");
      }

      return false;
    }

    function init() {
      $itemLinks.each(function () {
        var $this = $(this);
        if (!$this.hasClass("_open")) {
          $this.nextAll(".b-jobs-list__item-content").eq(0).slideUp(0);
        }
      });
    }

    init();
    $itemLinks.on("click", expandContent);
  });
});