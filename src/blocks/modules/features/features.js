// Преимущества
$(function () {
  $(".b-features").livequery(function () {
    var $context = $(this);
    var $platesHolder = $(".b-catalog-plates__items", $context);
    var $plates = $(".b-features__feature", $context);

    $context.removeClass("._nojs");

    function equalizer() {
      var _tmp = 0;
      var heights = [];
      var iterations = 0;

      if($plates.length == 0) return;

      $plates.css("min-height", 0);

      setTimeout(function () {
        requestAnimFrame(function () {
          contextWidth = $context.width();
          if(contextWidth == 0) return;

          plateWidth = $plates.eq(0).outerWidth();
          _tmp = Math.round(contextWidth/plateWidth);
          iterations = $plates.length / _tmp;
          for(var r = 0; r < iterations; r++) {
            for(var i = 0; i<_tmp; i++) {
              if(heights[r] === undefined) {
                heights[r] = $plates.eq(r*_tmp + i).outerHeight();
              } else {
                heights[r] = Math.max($plates.eq(r*_tmp + i).outerHeight(), heights[r]);
              }
            }
          }

          for(var r = 0; r < iterations; r++) {
            for(var i = 0; i<_tmp; i++) {
              $plates.eq(r*_tmp + i).css("min-height", heights[r]);
            }
          }
        });
      }, 100);
    }

    equalizer();
    $(window).on("resizeWidth", equalizer);
    $context.on("resize.block", function () {
      equalizer();
    });

    $(document).on("catalog-plates.resize", equalizer);
    $context.adaptBlock({
      maxWidth: {
        1000: "_mx1000",
        500: "_mx500"
      }
    });
  });
});
