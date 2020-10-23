// Попап обратной связи
$(function () {
  $(".b-feedback-modal").livequery(function () {
    var $context = $(this);
    var $forms = $("form", $context);

    function sendChangesToServer($form, e) {
      e.preventDefault();

      var required = $("input[required]", $form),
        formFilled = true;

      required.each(function(index, obj)
      {
        if(!$(obj).val())
          formFilled = false;
      });

      if(!formFilled)
        return;

      preloader();

      // accept any $.ajax options
      $form.ajaxSubmit({
        success: function () {
          $.fancybox.open(
            $("#form-success-modal"),
            {
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
          preloader();
        }
      });
    }

    $forms.on("submit", function(e) {sendChangesToServer($(this), e);});

    $context.adaptBlock({
      maxWidth: {
        590: "_mx590"
      }
    });
  });
});
