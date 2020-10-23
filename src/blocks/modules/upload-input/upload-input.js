//
$(function () {
  $(".b-upload-input").each(function () {
    var $context = $(this);
    var $input = $("input[type=\"file\"]", $context);
    var $form = $input.closest("form");

    $input.on("change", function () {
      var fullPath = $input.val();
      if (fullPath) {
        var startIndex = (fullPath.indexOf("\\") >= 0 ? fullPath.lastIndexOf("\\") : fullPath.lastIndexOf("/"));
        var filename = fullPath.substring(startIndex);
        if (filename.indexOf("\\") === 0 || filename.indexOf("/") === 0) {
          filename = filename.substring(1);
        }

        $context.addClass("is-active");
        $context.prepend("<p class=\"b-upload-input__filename\">" + fullPath + "</p>");

        if ($form.hasClass("b-feedback-vacancy-form") && $form.validate().checkForm()) { // checks form for validity
          $form.find("[type=\"submit\"]").prop("disabled", false);
          $form.find("[name=\"save\"]").prop("disabled", false);
        } else {
          $form.find("[type=\"submit\"]").prop("disabled", true);
          $form.find("[name=\"save\"]").prop("disabled", true);
        }

        $(".b-upload-input__remove").on("click", function() {
          $(".b-upload-input__filename").remove();
          $context.removeClass("is-active");
          $input.val("");

          $form.find("[type=\"submit\"]").prop("disabled", true);
          $form.find("[name=\"save\"]").prop("disabled", true);
        });
      }
    });
  });
});
