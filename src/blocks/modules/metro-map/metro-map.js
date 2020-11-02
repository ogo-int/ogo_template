// Карта метро
$(function () {
  $(".b-metro-map").livequery(function () {
    var $context = $(this);
    var $dotLinks = $(".b-metro-map__header-link", $context);
    var $dotsHolder = $(".b-metro-map__dots", $context);
    var items = [];

    function fillMap () {
      $dotLinks.each(function () {
        var $this = $(this).closest(".b-metro-map__header-link-item");
        var $dot = $("<div class=\"b-metro-map__dot\"></div>");
        var coords = $(this).data("offset").split(",");
        var mod = "";

        if(coords[0] > 50) mod += " _right";

        var templates = buildPlacemark({
          iconContent: $this.find(".b-metro-map__icon-content").html(),
          address: $this.find(".b-metro-map__address").html(),
          phone: $this.find(".b-metro-map__phone").html(),
          hours: $this.find(".b-metro-map__hours").html(),
          link: $(this).data("link"),
          mod: mod
        });

        $dot.css({
          left: coords[0] + "%",
          top: coords[1] + "%"
        });

        $dot.append(templates.icon);
        $dot.append(templates.balloon);

        $dotsHolder.append($dot);

        $dot.on("click", openBalloon);
        items.push($dot);
      });
    }

    function openBalloon () {
      var $this = $(this);
      $(".b-metro-map__dot._active").removeClass("_active");
      $this.addClass("_active");
      $(".b-ymap__balloon__close").on("click", function (e) {
        closeBalloon(e);
      });

      $this.on("click", ".js-shop-info", function (e) {
        var $link = $(this);
        var href = $link.attr("href") || $link.data("href");

        $.fancybox.open( {href : href}, {
          type: "ajax",
          width: 960,
          autoSize: false,
          padding: 0,
          margin: 20,
          fitToView: true,
          scrolling: "visible",
          beforeShow: function () {
            $("html").addClass("fancybox-margin fancybox-lock");
            $(".iblock", this.inner).trigger("resize.block");
          },
          beforeClose: function () {
            $(".fancybox-inner .b-ymap").trigger("destroy.block");
          },
          afterShow: function () {
            $(".fancybox-wrap").livequery();
          }
        });

        e.preventDefault();
      });
      return false;
    }

    function closeBalloon (e) {
      var $target = $(e.target);
      if($target.is(".b-ymap__balloon__close") || ($target.closest(".b-metro-map__dot").length == 0 && !$target.is(".b-metro-map__dot"))) {
        $(".b-metro-map__dot").removeClass("_active");
        e.stopPropagation();
      }
    }

    function buildPlacemark (params) {
      var icon =
					"<div class=\"b-ymap__placemark"+ params.mod +"\">" +
						"<div class=\"b-ymap__placemark-round\"></div>" +
						"<div class=\"b-ymap__placemark-text\">" +
							params.iconContent +
						"</div>" +
					"</div>";

      var balloon =
					"<div class=\"b-ymap__balloon-outer"+ params.mod +"\">" +
						"<div class=\"b-ymap__balloon-outer-holder\">" +
							"<div class=\"b-ymap__balloon-inner"+ params.mod +"\">" +
								"<div class=\"b-ymap__balloon-header\">" +
									"<div class=\"b-ymap__balloon__close\"></div>" +
									"<div class=\"b-ymap__balloon-address\">" + params.address + "</div>" +
								"</div>" +
								"<div class=\"b-ymap__balloon-content\">" +
									"<div class=\"b-ymap__balloon-phone\">" + params.phone + "</div>" +
									"<div class=\"b-ymap__balloon-hours\">" + params.hours + "</div>" +
									"<a href=" + params.link + " class=\"b-ymap__balloon-details button js-shop-info\">Подробнее</a>" +
								"</div>" +
							"</div>" +
						"</div>" +
					"</div>";

      return {
        icon: icon,
        balloon: balloon
      };
    }

    fillMap();
    $("body").on("click", closeBalloon);

    $context.adaptBlock({
      maxWidth: {
        790: "_mx790",
        600: "_mx600"
      }
    });
  });
});
