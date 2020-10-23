// Превью категорий на главной
$(function () {
  $(".b-category-preview").livequery(function () {
    var $context = $(this);

    $context.removeClass("_nojs");

    function heightEqualizer($elem) {
      $elem.css("height", "");
      setTimeout(function () {
        requestAnimFrame(function () {
          $elem.height($elem.height());
        });
      }, 100);
    }

    heightEqualizer($context);

    $context.on("resize.block", function () {
      heightEqualizer($context);
    });

    $context.adaptBlock({
      maxWidth: {
        990: "_mx990",
        680: "_mx680",
        450: "_mx450"
      }
    });
  });
});
