// Блок консультанта на главной
$(function () {
  $(".b-main-consult").livequery(function () {
    var $context = $(this);
    var $messagesHolder = $(".b-main-consult__messages-holder", $context);
    var api;

    setTimeout(function () {
      $messagesHolder.jScrollPane();
      api = $messagesHolder.data("jsp");
    }, 400);

    $context.on("resize.block", function () {
      api.reinitialise();
    });

    $context.adaptBlock({
      maxWidth: {
        420: "_mx420"
      }
    });
  });
});
