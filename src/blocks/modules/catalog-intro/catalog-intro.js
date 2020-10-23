function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

// Интроблок
$(function () {
  $(".b-catalog-intro").livequery(function () {
    var $context = $(this);
    var $closeBtn = $(".b-catalog-intro__close", $context);
    var $openBtn = $(".js-open-catalog-content", $context);

    function hideBlock () {
      $context.addClass("_hide");
      // setCookie('hideCatalogIntro', 1, {
      // 	expires: (1*24*60*60*1000), // 1 day
      // 	path: window.location.pathname
      // });
      return false;
    }

    function showBlock () {
      $context.removeClass("_hide");
      // setCookie('hideCatalogIntro', 0, {
      // 	expires: (1*24*60*60*1000), // 1 day
      // 	path: window.location.pathname
      // });
      return false;
    }

    $closeBtn.on("click", hideBlock);
    $openBtn.on("click", showBlock);

    // if(getCookie('hideCatalogIntro') == 1) {
    // $closeBtn.trigger('click');
    // }

    $context.adaptBlock({
      maxWidth: {
        890: "_mx890"
      }
    });
  });


});
