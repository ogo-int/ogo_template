// Точка получения заказа
$(function () {
  $(".b-pickpoint-confirm").livequery(function () {
    var $context = $(this);
    var $map = $(".b-ymap", $context);

    function equalize () {
      $context.css("height", "");
      setTimeout(function () {
        $context.css("height", $context.height());
      }, 300);
    }

    equalize();
    $(window).on("resize", equalize);
    $context.on("resize.block", function () {
      equalize();
    });

    $context.adaptBlock({
      maxWidth: {
        750: "_mx750"
      }
    });

  });
});
