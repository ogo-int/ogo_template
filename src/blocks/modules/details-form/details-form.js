// Форма добавления адреса
$(function () {
  $(".b-details-form").livequery(function () {
    var $context = $(this);
    var $manualSection = $(".b-details-form__manual-section", $context);
    var $recognizerSection = $(".b-details-form__recognizer-section", $context);

    window.openRecognizer = function () {
      $recognizerSection.addClass("_active");
      $manualSection.removeClass("_active");
    };

    window.openManual = function () {
      $recognizerSection.removeClass("_active");
      $manualSection.addClass("_active");
    };

    $context.on("open-recognizer.block", function(e) {
      openRecognizer();
      e.stopPropagation();
    });

    $context.on("open-manual.block", function(e) {
      openManual();
      e.stopPropagation();
    });

    $context.adaptBlock({
      maxWidth: {
        500: "_mx500"
      }
    });
  });
});
