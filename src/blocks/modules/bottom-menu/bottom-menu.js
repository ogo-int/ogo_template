// Нижнее меню
$(function () {
  $(".b-bottom-menu").livequery(function() {
    var $context = $(this);
    var $items = $(".b-bottom-menu__item", $context);
    var $holders = $(".b-bottom-menu__holder", $context);

    function toggleHolder (e) {
      var $item = $(this);
      var index = parseInt($item.data("tab")) - 1;

      if($("html").hasClass("touch")) {
        if(index == 0) {
          $.fancybox.open($(".b-bottom-menu__wrap", $item).attr("href"), {
            padding: 0,
            margin: 20,
            closeEffect: "none",
            closeSpeed: 0,
            openSpeed: 0,
            openEffect: "none",
            openOpacity: false,
            closeOpacity: false,
            fitToView: true,
            scrolling: "visible",
            beforeShow: function () {
              $("html").addClass("fancybox-margin fancybox-lock");
            },
            afterShow: function () {
              $(".iblock", this.inner).trigger("resize.block");
            }
          });

          return false;
        }

        return true;
      }

      if($item.hasClass("_active")) {
        $items.removeClass("_active");

        $holders.eq(index).removeClass("_active");

        $(".b-bottom-menu").trigger("close.block");
        $context.addClass("_closed");
      } else {

        $items.removeClass("_active");
        $holders.removeClass("_active");
        $items.eq(index).addClass("_active");
        $holders.eq(index).addClass("_active");


        setTimeout(function () {
          $(".b-bottom-menu").not($context).trigger("change.block", [index]);
          $context.removeClass("_closed");
        }, 800);
      }

      requestAnimFrame(function () {
        $(".iblock", $holders.eq(index)).trigger("resize.block");
      });

      e.preventDefault();
    }

    function changeHolder (index) {
      $items.removeClass("_active");
      $holders.removeClass("_active");
      $items.eq(index).addClass("_active");
      $holders.eq(index).addClass("_active");
      $context.removeClass("_closed");
    }

    function closeHolders() {
      $items.removeClass("_active");
      $holders.removeClass("_active");
      $context.addClass("_closed");
    }

    (function () {
      $items.filter("[data-tab]").on("click", toggleHolder);
    })();

    $context.adaptBlock({
      maxWidth: {
        1165: "_mx1165",
        995: "_mx995",
        600: "_mx600",
      }
    });

    $context.on("close.block", function (e) {
      closeHolders();
      e.stopPropagation();
    });

    $context.on("change.block", function (e, index) {
      changeHolder(index);
      e.stopPropagation();
    });
  });
});
