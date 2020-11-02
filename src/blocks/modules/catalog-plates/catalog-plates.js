// Список товаров каталога плиткой
$(function () {
  $(".b-catalog-plates").livequery(function() {
    var $context = $(this);
      
    function equalizer() {
      var $container = $(".b-catalog-plates");
      var $platesHolder = $(".b-catalog-plates__items", $container);
      var $plates = $("> div:not(.b-catalog-plates__wide-baner, .catalog-plates-slider_wide-banner)", $platesHolder);
      var height = 0;
      var additional = $platesHolder.parent().hasClass("_additional");
      var time = additional ? 500 : 100;

      if($plates.length == 0) return;

      $plates.not(".is-resized").css("height", "");

      setTimeout(function () {
        requestAnimFrame(function () {
          console.log("equalizer");
          var wW = $(window).width();
          var countInRow = 3;

          if(additional) {
            var countInRow = 4;

            if((wW >= 611 && wW <= 960)) {
              countInRow = 2;
            } else if(wW <= 610) {
              countInRow = 1;
            }
          } else {
            if((wW >= 1024 && wW <= 1140) || (wW > 620 && wW <= 820)) {
              countInRow = 2;
            } else if(wW <= 620) {
              countInRow = 1;
            }
          }

          var s = -1;
          $plates.each(function (i, el) {
            s++;

            if($(el).hasClass("catalog-plates-slider_medium-banner") && !$(el).is(":visible")) {
              s--;
            }

            if($(".catalog-plates-slider_medium-banner").is(":visible") && $(el).prev(".catalog-plates-slider_medium-banner").length == 1) {
              s++;
            }

            if(s % countInRow == 0) {
              var $el = $(this);
              var height = 0;
              // var hasBanner = $el.prev('.catalog-plates-slider_medium-banner').length || $el.next('.catalog-plates-slider_medium-banner').length;
              var count = countInRow - 1;
              var $rowSiblings = $el.nextAll().slice(0, count);

              if($el.is(":visible")) {
                height = Math.max($el.outerHeight(), height);
              }

              if($rowSiblings.is(":visible")) {
                height = Math.max(Math.max.apply(null, $rowSiblings.map(function () {
                  return $(this).height();
                }).get()), height);
              }

              $el.css("height", height);

              $rowSiblings.css("height", height);
            }
          });
        });
      }, time);
    }

    $context.adaptBlock({
      maxWidth: {
        960: "_mx960",
        810: "_mx810",
        610: "_mx610"
      },
      minWidth: {
        1150: "_mn1150"
      }
    });

    $(window).on("resize", equalizer);
    $(document).on("catalog-plates.resize", equalizer);
    equalizer();
  });
});
