// Смена пароля
$(function () {
  $(".b-password-change").livequery(function () {
    var $context = $(this);
    var $eyeLinks = $(".b-password-change__eye", $context);
    var $inputs = $("input", $context);
    var $saveBtn = $(".b-password-change__save-btn", $context);
    var $form = $("form", $context);
    var $status = $(".b-password-change__status", $context);

    function changeInputType() {
      var $link = $(this);
      var $field = $link.closest(".b-password-change__field");
      var $input = $field.find("input");

      if ($input.attr("type") == "text") {
        $input.attr("type", "password");
        $link.removeClass("_open");
      } else {
        $input.attr("type", "text");
        $link.addClass("_open");
      }
    }

    function saveChanges() {
      if (!$saveBtn.hasClass("_active")) return false;

      sendChangesToServer();
      $saveBtn.removeClass("_active");
      return false;
    }

    function sendChangesToServer() {
      $form.ajaxSubmit({
        success: function () {
          $status.addClass("_active");
          setTimeout(function () {
            $status.removeClass("_active");
          }, 1500);
          console.log("good");
        },
        error: function () {
          console.log("bad");
        }
      });
    }

    $eyeLinks.on("click", changeInputType);
    // $saveBtn.on('click', saveChanges);

    $form.validate({
      ignore: "hidden",
      // rules: {
      // },
      highlight: function (element) {
        if ($(element).parent().hasClass("datepicker")) {
          $(element).parent().removeClass("success").addClass("error");
          $(element).removeClass("success").addClass("error");
        } else {
          $(element).removeClass("success").addClass("error");
        }
        //     $(element).closest('.form__field-row').removeClass('is-ok').addClass('has-error');
      },
      unhighlight: function (element) {
        if ($(element).parent().hasClass("datepicker")) {
          $(element).parent().removeClass("error").addClass("success");
          $(element).removeClass("error").addClass("success");
        } else {
          $(element).removeClass("error").addClass("success");
        }
      },
      onclick: function (element) {
        // click on selects, radiobuttons and checkboxes
        if (element.name in this.submitted) {
          this.element(element);

          // or option elements, check parent select in that case
        } else if (element.parentNode.name in this.submitted) {
          this.element(element.parentNode);
        }
      },
      submitHandler: function (form) {
        sendChangesToServer();
        $saveBtn.removeClass("_active");
      }
    });

    $inputs.on("change", function () {
      $saveBtn.addClass("_active");
    });

    $context.adaptBlock({
      maxWidth: {
        600: "_mx600"
      }
    });
  });
});