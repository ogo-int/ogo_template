// Привязка аккаунта к соцсетям
$(function () {
  $(".b-socials-bind").livequery(function () {
    var $context = $(this);
    var $socialLinks = $(".b-socials-bind__social-link", $context);
    var $status = $(".b-socials-bind__status", $context);
    var $statusSubstring = $(".b-socials-bind__status-sub", $context);
    var statusTimeout;

    function bindLink ($link) {
      var $item = $link.closest(".b-socials-bind__item");
      var linkStatus = $link.find(".b-socials-bind__link-status").text();

      $item.addClass("b-socials-bind__item_active");
      $link.addClass("b-socials-bind__social-link_active");

      $statusSubstring.text(linkStatus + " привязан");
      $status.addClass("b-socials-bind__status_active");
      clearTimeout(statusTimeout);
      statusTimeout = setTimeout(function () {
        $status.removeClass("b-socials-bind__status_active");
      }, 1500);
    }

    function unbindLink ($link) {
      var $item = $link.closest(".b-socials-bind__item");
      var linkStatus = $link.find(".b-socials-bind__link-status").text();

      $item.removeClass("b-socials-bind__item_active");
      $link.removeClass("b-socials-bind__social-link_active");

      $statusSubstring.text(linkStatus + " удален");
      $status.addClass("b-socials-bind__status_active");
      clearTimeout(statusTimeout);
      statusTimeout = setTimeout(function () {
        $status.removeClass("b-socials-bind__status_active");
      }, 1500);
    }

    function toggleBinding () {
      var $link = $(this);

      if($link.hasClass("b-socials-bind__social-link_active")) {
        unbindLink($link);
      } else {
        bindLink($link);
      }
      return false;
    }

    $socialLinks.on("click", toggleBinding);

    $context.adaptBlock({
      maxWidth: {
        680: "_mx680"
      }
    });
  });
});
