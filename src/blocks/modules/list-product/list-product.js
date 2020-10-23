// comments
$(function () {
  $(".b-list-product").livequery(function () {
    var $context = $(this);
    var $preview = $(".b-list-product__fast-view", $context);

    function showPreview () {
      $.fancybox.open(
        {
          href: $(this).attr("data-href")
        },
        {
          wrapCSS: "_product-preview _ajax-appended",
          type: "ajax",
          fitToView: true,
          autoResize: true,
          padding: 0,
          margin: 20,
          maxWidth: 1200,
          afterLoad: function (current, previous) {
            var $content = $(current.content);

            $content.addClass("_ajax-append");
            current.content = $("<div>").append($content.clone()).html();
            $.fancybox .showLoading();
          },
          afterShow: function () {
            $(".iblock").trigger("resize.block");

            setTimeout(function () {
              $.fancybox .hideLoading();
              $(".fancybox-wrap._ajax-appended").removeClass("_ajax-appended");
              $(".fancybox-wrap .b-product-preview._ajax-append").removeClass("_ajax-append");
              $(".fancybox-wrap").livequery();
            }, 400);
          }
        }
      );
      return false;
    }

    $preview.on("click", showPreview);

    $context.adaptBlock({
      maxWidth: {
        610: "_mx710",
        510: "_mx510",
        370: "_mx370"
      }
    });
  });
});
