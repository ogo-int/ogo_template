// Что нужно знать перед покупкой
$(function () {
  $(".b-know-how").livequery(function () {
    var $context = $(this);
    var $items = $(".b-know-how__item", $context);
    var height = 0;

    function equalizer () {
      height = 0;
      $items.css("height", "");

      setTimeout(function () {
        $items.each(function () {
          height = Math.max($(this).height(), height);
        });

        $items.css("height", height);
      }, 200);

    }

    equalizer();
    $(window).on("resize", equalizer);
    $context.on("resize.block", equalizer);

    $context.adaptBlock({
      maxWidth: {
        700: "_mx700"
      }
    });
  });
});
