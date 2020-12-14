// Попап запроса оценки эксперта
$(function () {
  $(".b-configurator-mail").livequery(function () {
    var $context = $(this);
    var $form = $("form", $context);

    function sendChangesToServer(e) {
      e.preventDefault();

      //if(!checkMandatory())
      //  return;

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

  });
});