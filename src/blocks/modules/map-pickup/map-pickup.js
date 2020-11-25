// Список салонов на карте
$(function () {
  $(".b-map-pickup").livequery(function () {
    var $context = $(this),
        $shops = $(".b-points-list__point", $context),
        $map = $(".b-ymap"),
        $mapToggler = $('.b-map-pickup__toggler')
 
    function fillMap() {
      $shops.each(function () {
        var $shop = $(this);
        $map.trigger("resetPlacemarks.block");
        setTimeout(function () {
          $map.trigger("setPlacemark.block",[{
            key: $shop.data('coords'),
            type: $shop.closest(".b-points-list__group").find(".b-points-list__group-name").data("map-title"),
            address: $shop.data("address"),
            coords: $shop.data("coords").split(","),
            metro: $shop.children('.b-points-list__point-metro').html(),
            // Pickup↓ это жесть, надо как-то получше придумать
            pickup: ( $shop.children('.b-points-list__point-pickup-time').data('alt') ? '<b>' + $shop.children('.b-points-list__point-pickup-time').data('alt') + '</b>' : $shop.children('.b-points-list__point-pickup-time').html() ) + ', ' + '<span class="b-ymap__balloon-price">' + $shop.children('.b-points-list__point-pickup-price').html() + '</span>',
            hours: $shop.data('hours'),
            details: false,
            balloonTemplate:
              "<div class=\"b-ymap__balloon-inner\">" +
                "<div class=\"b-ymap__balloon-header\">" +
                  "<div class=\"b-ymap__balloon__close\"></div>" +
                  "<div class=\"b-ymap__balloon-type\">{{properties.type|raw}}</div>" +
                  "<div class=\"b-ymap__balloon-address\">{{properties.address|raw}}</div>" +
                  "{% if properties.metro !== undefined %}" +
                    "<div class=\"b-ymap__balloon-metro\">{{properties.metro|raw}}</div>" +
                  "{% endif %}" +
                "</div>" +
                "<div class=\"b-ymap__balloon-content\">" +
                  "<div class=\"b-ymap__balloon-pickup\">Можно забрать {{properties.pickup|raw}}</div>" +
                  "<div class=\"b-ymap__balloon-hours\">{{properties.hours|raw}}</div>" +
                "</div>" +
              "</div>",
          }]);
        }, 300);
      });
    }

    function showShop() {
      var thisCoordsString = $(this).data('coords');
      $map.trigger(
        'setCenter.block', [thisCoordsString.split(','), 15, thisCoordsString]
      );
      return false;
    }

    $shops.on("click", showShop);

    $map.on("mapReady.block", fillMap);

    $mapToggler.on('click', function(e){
      e.preventDefault();
      var $target = $('#' + $(this).data('target')),
          text = 'Посмотреть на карте',
          swap = 'Только список'
  
      $target.toggle();

      var toggle = $(this).text();
      $(this).text(
        toggle == swap ? text : swap
      );
    });
  });
});
