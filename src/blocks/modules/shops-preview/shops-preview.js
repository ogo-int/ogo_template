// Превью для магазинов на главной
$(function () {
  $(".b-shops-preview").livequery(function () {
    var $context = $(this);
    $context.adaptBlock({
      maxWidth: {
        920: "_mx920",
        590: "_mx590"
      }
    });
  });
});
