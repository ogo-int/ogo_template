// История начислений и списаний
$(function () {
  $(".b-bonus-history").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        550: "_mx550",
        420: "_mx420"
      }
    });
  });
});
