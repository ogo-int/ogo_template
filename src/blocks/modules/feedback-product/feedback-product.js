// Отзывы о продукте
$(function () {
  $(".b-feedback-product").livequery(function () {
    var $context = $(this),
      $item = $(".b-feedback-product__item", $context),
      $thumbs = $(".link-thumbup, .link-thumbdown", $item),
      $resultTextContainer = $("#vote-result .b-form-success-modal__content-holder");

    $thumbs.on("click", function (e) {
      var $this = $(this),
        $parent = $this.parent(),
        $up = $(".link-thumbup", $parent),
        $down = $(".link-thumbdown", $parent);
      preloader();
      $.ajax({
        url: "/ajax/new/voteFeedback.php",
        data: {
          "ID": $this.data("element"),
          "INCREMENT": $this.data("increment")
        },
        method: "post",
        dataType: "json",
        success: function (result) {
          if (result.status == "success") {
            $resultTextContainer.html("<p>Ваш голос принят, спасибо!</p>");
            $up.html("<span>" + result.for+"</span>");
            $down.html("<span>" + result.contra + "</span>");
          } else {
            $resultTextContainer.html("<p>" + result.message + "</p>");
          }
          $.fancybox.open(
            $("#vote-result"), {
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
            }
          );
          preloader();
        },

        error: function () {
          console.log("bad");
        }
      });
    });

    $context.adaptBlock({
      maxWidth: {
        550: "_mx550",
        480: "_mx480"
      }
    });
  });
});