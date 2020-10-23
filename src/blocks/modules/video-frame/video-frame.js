// Видеофрейм
$(function () {
  $(".b-video-frame").livequery(function () {
    var $context = $(this);
    var $iframe = $("iframe", $context);
    var width = $iframe.width();
    var height= $iframe.height();
    var ratio = width / height;

    function setFullVideo () {
      ratio = width / height;
      width = $context.parent().innerWidth();
      height = width / ratio;

      $iframe.width(width);
      $iframe.height(height);
    }

    setFullVideo();
    $(window).on("resize", setFullVideo);
    $context.on("resize.block", setFullVideo);

  });
});
