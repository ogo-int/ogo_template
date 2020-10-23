// Добавить аксессуары
$(function () {
  $(".b-accessories-choose").livequery(function () {
    var $context = $(this);

    function equalizer() {
      var $platesHolder = $(".b-accessories-choose__items", $context);
      var $plates = $(".b-accessories-choose__item", $platesHolder);
      var height = 0;

      if($plates.length == 0) return;

      $plates.not(".is-resized").css("height", "");

      setTimeout(function () {
        requestAnimFrame(function () {
          var wW = $(window).width();
          var countInRow = 3;

          if((wW >= 1024 && wW <= 1140) || (wW > 620 && wW <= 820)) {
            countInRow = 2;
          } else if(wW <= 620) {
            countInRow = 1;
          }

          console.log($plates.length);

          $plates.each(function (i, el) {
            if(i % countInRow == 0) {
              var $el = $(this);
              var height = 0;
              var $rowSiblings = $el.nextAll().slice(0, countInRow-1);

              if($el.is(":visible") && !$el.hasClass("is-resized")) {
                height = Math.max($el.outerHeight(), height);
              }

              if($rowSiblings.is(":visible") && !$rowSiblings.hasClass("is-resized")) {
                height = Math.max(Math.max.apply(null, $rowSiblings.map(function () {
                  return $(this).height();
                }).get()), height);
              }

              if(!$el.hasClass("is-resized")) {
                $el.addClass("is-resized");
                $el.find(".b-product-small").css("height", height);
              }

              if(!$rowSiblings.hasClass("is-resized")) {
                $rowSiblings.addClass("is-resized");
                $rowSiblings.find(".b-product-small").css("height", height);
              }
            }
          });
        });
      }, 100);
    }

    equalizer();
    $(window).on("resizeWidth", equalizer);
    $(document).on("accessories-choose.resize", equalizer);

    $context.adaptBlock({
      maxWidth: {
        900: "_mx900",
        680: "_mx680",
        590: "_mx590"
      }
    });
  });
});