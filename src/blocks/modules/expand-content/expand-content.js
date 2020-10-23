// Контент в экспандере
$(function () {
  $(".b-expand-content").livequery(function () {
    var $context  = $(this);
    var $link = $(".b-expand-content__link", $context);
    var $holder = $(".b-expand-content__content-holder", $context);

    function toggleContainer () {
      if($link.hasClass("_open")){
        $link.removeClass("_open");
        $holder.slideUp(300);
      } else {
        $link.addClass("_open");
        $holder.slideDown(300, function () {
          $("*", $holder).trigger("resize.block");
        });
      }

      return false;
    }

    if($link.hasClass("_open")) {
      $holder.slideDown(300);
    } else {
      $holder.slideUp(300);
    }

    $link.on("click", toggleContainer);
  });
});
