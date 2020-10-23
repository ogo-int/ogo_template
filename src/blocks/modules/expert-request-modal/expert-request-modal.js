// Попап запроса оценки эксперта
$(function () {
  $(".b-expert-request").livequery(function () {
    var $context = $(this);
    var $form = $("form", $context);

    function sendChangesToServer(e) {
      e.preventDefault();

      if(!checkMandatory())
        return;

      $form.ajaxSubmit({
        success: function () {
          $.fancybox.close();
          $.fancybox.open({
            href: "#form-success-modal"
          });
          console.log("good");
        },

        error: function () {
          console.log("bad");
        }
      });
    }

    $form.on("submit", function(e) {sendChangesToServer(e);});

    $context.adaptBlock({
      maxWidth: {
        610: "_mx610",
        450: "_mx450"
      }
    });
  });
});