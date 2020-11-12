// comments
$(function () {
  // code here...
});

// Fn to allow an event to fire after all images are loaded
$.fn.imagesLoaded = function () {

  // get all the images (excluding those with no src attribute)
  var $imgs = this.find("img[src!=\"\"]");
  // if there's no images, just return an already resolved promise
  if (!$imgs.length) {return $.Deferred().resolve().promise();}

  // for each image, add a deferred object to the array which resolves when the image is loaded (or if loading fails)
  var dfds = [];  
  $imgs.each(function(){

    var dfd = $.Deferred();
    dfds.push(dfd);
    var img = new Image();
    img.onload = function(){dfd.resolve();};
    img.onerror = function(){dfd.resolve();};
    img.src = this.src;

  });

  // return a master promise object which will resolve when all the deferred objects have resolved
  // IE - when all the images are loaded
  return $.when.apply($,dfds);

};

// Добавить аксессуары
$(function () {
  $(".b-accessories-choose").livequery(function () {
    var $context = $(this);

    function equalizer() {
      var $platesHolder = $(".b-accessories-choose__items", $context);
      var $plates = $(".b-accessories-choose__item", $platesHolder);
      var height = 0;

      if($plates.length == 0) return;

      $plates.not(".is-resized").css("height", "");

      setTimeout(function () {
        requestAnimFrame(function () {
          var wW = $(window).width();
          var countInRow = 3;

          if((wW >= 1024 && wW <= 1140) || (wW > 620 && wW <= 820)) {
            countInRow = 2;
          } else if(wW <= 620) {
            countInRow = 1;
          }

          console.log($plates.length);

          $plates.each(function (i, el) {
            if(i % countInRow == 0) {
              var $el = $(this);
              var height = 0;
              var $rowSiblings = $el.nextAll().slice(0, countInRow-1);

              if($el.is(":visible") && !$el.hasClass("is-resized")) {
                height = Math.max($el.outerHeight(), height);
              }

              if($rowSiblings.is(":visible") && !$rowSiblings.hasClass("is-resized")) {
                height = Math.max(Math.max.apply(null, $rowSiblings.map(function () {
                  return $(this).height();
                }).get()), height);
              }

              if(!$el.hasClass("is-resized")) {
                $el.addClass("is-resized");
                $el.find(".b-product-small").css("height", height);
              }

              if(!$rowSiblings.hasClass("is-resized")) {
                $rowSiblings.addClass("is-resized");
                $rowSiblings.find(".b-product-small").css("height", height);
              }
            }
          });
        });
      }, 100);
    }

    equalizer();
    $(window).on("resizeWidth", equalizer);
    $(document).on("accessories-choose.resize", equalizer);

    $context.adaptBlock({
      maxWidth: {
        900: "_mx900",
        680: "_mx680",
        590: "_mx590"
      }
    });
  });
});
// Слайдер аксессуаров
$(function blockAccessoriesSlider() {
  $(".b-accessories-slider").livequery(function () {
    var $context = $(this);
    var $slider = $(".b-accessories-slider__slider", $context);
    var $prev = $(".b-accessories-slider__prev", $context);
    var $next = $(".b-accessories-slider__next", $context);
    var $items = $(".b-accessories-slider__item", $context);
    var $slickTrack;

    (function initSlider() {
      $slider.on("init", function () {
        $slickTrack = $(".slick-track", $context);
        $slickTrack.height("auto");
        $slickTrack.height($slickTrack.height());
      });

      $slider.slick({
        slidesToShow: 4,
        slidesToScroll: 2,
        prevArrow: $prev,
        nextArrow: $next,
        respondTo: "slider",
        responsive: [{
          breakpoint: 1000,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 730,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        ]
      });

      $slider.on("setPosition", function () {
        $slider.height("auto");
        $slider.height($slider.height());
      });
    })();

    $context.on("resize.block", function () {
      $slider.slick("checkResponsive");
      $slider.slick("setPosition");
    });

    $context.adaptBlock({
      maxWidth: {
        950: "_mx950"
      }
    });
  });
});
// Попап товар добавлен в корзину
$(function () {
  $(".b-added-cart").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        610: "_mx610",
        450: "_mx450"
      }
    });
  });
});
// Форма добавления адреса
$(function () {
  $(".b-address-form").livequery(function () {
    var $context = $(this);
    var $townInput = $(".b-address-form__town-input", $context);

    $context.adaptBlock({
      maxWidth: {
        500: "_mx500"
      },
      minWidth: {
      }
    });
  });
});

// Адрес в лк
$(function () {
  $(".b-address-item").livequery(function () {
    var $context = $(this);
    var $address = $(".b-address-item__address", $context);
    var $comment = $(".b-address-item__comment", $context);
    var $town = $(".b-address-item__town", $context);
    var $title = $(".b-address-item__title", $context);
    var $form = $("form", $context);

    // Btns
    var $editBtn= $(".b-address-item__edit-btn",$context);
    var $editBtnHolder = $(".b-address-item__ui-edit",$context);
    var $saveBtn = $(".b-address-item__save-btn",$context);
    var $saveBtnHolder = $(".b-address-item__ui-save",$context);
    var $mainBtn = $(".b-address-item__primary-btn",$context);
    var $mainBtnHolder = $(".b-address-item__ui-primary",$context);
    var $secondaryBtn = $(".b-address-item__secondary-btn",$context);
    var $secondaryBtnHolder = $(".b-address-item__ui-secondary",$context);
    var $removeBtn = $(".b-address-item__remove-btn",$context);

    //Inputs
    var $inputs = $("[name]", $context);
    var $inputName = $("[name=\"NAME\"]", $context);
    var $inputTown = $("[name=\"CITY\"]", $context);
    var $inputStreet = $("[name=\"STREET\"]", $context);
    var $inputBuilding = $("[name=\"HOUSE\"]", $context);
    var $inputBlock = $("[name=\"BUILDING\"]", $context);
    var $inputFlat = $("[name=\"APPARTMENT\"]", $context);
    var $inputComment = $("[name=\"COMMENT\"]", $context);

    function setEditState () {
      $saveBtnHolder.addClass("b-address-item__ui-save_active");
      $editBtnHolder.removeClass("b-address-item__ui-edit_active");
      $context.addClass("_edit-state");
      $(".b-address-form", $context).trigger("resize.block");
      return false;
    }

    function setSaveState () {
      $saveBtnHolder.removeClass("b-address-item__ui-save_active");
      $editBtnHolder.addClass("b-address-item__ui-edit_active");
      $context.removeClass("_edit-state");
      preloader();
      $("body").animate({scrollTop: ($context.offset().top - 100)}, 500);
      return false;
    }

    function setAddressAsMain () {
      var $idHolder = $("[name=\"ADDRESS_ID\"]", $form);
      var $id = $idHolder.val();
      $.ajax({
        url: $(this).attr("href"),
        data: {action: "makeMain", id: $id},
        success: function () {
          $(".b-address-item").trigger("reset-main.block");
          $secondaryBtnHolder.removeClass("b-address-item__ui-secondary_active");
          $mainBtnHolder.addClass("b-address-item__ui-primary_active");
        }
      });

      return false;
    }

    function deleteAddressMain()
    {
      var $idHolder = $("[name=\"ADDRESS_ID\"]", $form);
      var $id = $idHolder.val();
      $.ajax({
        url: $(this).attr("href"),
        data: {action: "deleteMain", id: $id},
        success: function () {
          $(".b-address-item").trigger("reset-main.block");
          $mainBtnHolder.removeClass("b-address-item__ui-primary_active");
          $secondaryBtnHolder.addClass("b-address-item__ui-secondary_active");
        }
      });

      return false;
    }

    function resetMainAddress () {
      $secondaryBtnHolder.addClass("b-address-item__ui-secondary_active");
      $mainBtnHolder.removeClass("b-address-item__ui-primary_active");
    }

    function saveChanges () {
      if(validateChanges()) {
        preloader();
        applyChanges();
        sendChangesToServer();
        setSaveState();
      }

      return false;
    }

    function validateChanges () {
      var $requiredFields = $("[required]", $form);
      var condition = true;
      var scrollTarget;

      $requiredFields.each(function () {
        var $input = $(this);
        var isEmpty = $input.val()=="";

        if(isEmpty) {
          $input.closest(".b-address-form__input").addClass("_none");
        } else {
          $input.closest(".b-address-form__input").removeClass("_none");
        }

        if(condition && isEmpty) {
          scrollTarget = $input.offset().top;
        }

        condition = condition && !isEmpty;
      });

      if(!isNaN(scrollTarget)) {
        $("body").animate({scrollTop: (scrollTarget - 100)}, 500);
      }

      return condition;
    }

    function applyChanges (preventRender) {
      var name = $inputName.val();
      var town = $inputTown.val();
      var comment = $inputComment.val();
      var addressInputs = [$inputTown,  $inputStreet, $inputBuilding, $inputBlock, $inputFlat];
      var address =  [];

      for(i = 0; i < addressInputs.length; i++) {
        if(addressInputs[i].val() != "") {
          if(addressInputs[i].attr("name") == "STREET") {
            address.push("улица " + addressInputs[i].val());
            continue;
          }

          if(addressInputs[i].attr("name") == "HOUSE") {
            address.push("дом " + addressInputs[i].val());
            continue;
          }

          if(addressInputs[i].attr("name") == "BUILDING") {
            address.push("корпус " + addressInputs[i].val());
            continue;
          }

          if(addressInputs[i].attr("name") == "APPARTMENT") {
            address.push("квартира " + addressInputs[i].val());
            continue;
          }

          address.push(addressInputs[i].val());
        }
      }

      if(!preventRender) {
        $address.text(address.join(", "));
        $town.text(town);
        $title.text(name);

        if(comment == "") {
          $comment.closest(".b-address-item__save-field").addClass("_hide");
          $comment.text(comment);
        } else {
          $comment.closest(".b-address-item__save-field").removeClass("_hide");
          $comment.text(comment);
        }
      }

      return [name, town, address.join(", "), comment];
    }

    function sendChangesToServer() {
      // accept any $.ajax options
      $form.ajaxSubmit({
        success: function (result) {
          var $result = JSON.parse(result);
          var $id = $("[name=\"ADDRESS_ID\"]", $form);

          if($result.status == "success")
          {
            if($id.length == 0)
            {
              $form.append("<input type=\"hidden\" name=\"ADDRESS_ID\" value=\""+$result.id+"\"/>");
            }
          }

          console.log("good");
        },

        error: function () {
          console.log("bad");
        }
      });
    }

    function removeItem () {
      var $idHolder = $("[name=\"ADDRESS_ID\"]", $form);
      var $id = $idHolder.val();
      $.ajax({
        url: $(this).attr("href"),
        data: {action: "remove", id: $id},
        success: function () {
          $context.remove();
        }
      });

      return false;
    }

    $removeBtn.on("click", removeItem);
    $editBtn.on("click", setEditState);
    $saveBtn.on("click", saveChanges);
    $secondaryBtn.on("click", setAddressAsMain);
    $mainBtn.on("click", deleteAddressMain);

    $context.adaptBlock({
      maxWidth: {
        540: "_mx540",
        400: "_mx400"
      }
    });

    $context.on("reset-main.block", resetMainAddress);

  });
});

// Инпут выбора города с автокомплитом
$(function () {
  $(".b-autocomplete-address").each(function () {
    var $context = $(this);
    var $input = $(".b-autocomplete-address__input", $context);
    var $codeInput = $(".b-autocomplete-address__code", $context);
    var $arrow = $(".b-autocomplete-address__arrow", $context);

    function getKladrData(request, response) {
      $.ajax({
        url: "/ajax/new/getCities.php",
        dataType: "json",
        type: "GET",
        data: {
          query: {
            term: request.term
          }
        },
        success: function (data) {
          var results = $.map(data.results, function (item) {
            return {
              city: item.city,
              parent: item.parent,
              value: item.id
            };
          });

          response(results);
        }
      });
    }

    $input.autocomplete({
      minLength: 0,
      appendTo: $context,
      source: getKladrData,
      select: function (event, ui) {
        if (ui.item != undefined) {
          $input.val(ui.item.city);
          preloader();
          $.post("/ajax/new/setCity.php", {
            city_id: ui.item.value
          }, function (data) {
            if (data.status == "success")
              window.location.reload();
          }, "json");
        }
        return false;
      },
      open: function (event, ui) {
        $input.addClass("_opened");
      },
      close: function (event, ui) {
        $input.removeClass("_opened");
      }
    });

    $input.autocomplete("instance")._renderMenu = function (ul, items) {
      var that = this;
      $.each(items, function (index, item) {
        that._renderItemData(ul, item);
      });
    };

    $input.autocomplete("instance")._renderItem = function (ul, item) {

      var itemTemplate =
        "<li class=\"b-autocomplete-address__item\">" +
        "<div class=\"b-autocomplete-address__item-wrap\">" +
        "<div class=\"b-autocomplete-address__item-title\">" + item.city + "</div>" +
        "<div class=\"b-autocomplete-address__item-area\">" + item.parent + "</div>" +
        "</div>" +
        "</li>";

      ul.addClass("b-autocomplete-address__items-list");
      return $(itemTemplate).appendTo(ul);
    };
  });

  $(".js-change_city").on("click", function () {
    var $context = $(this),
      city = $context.data("city");

    if (typeof city != "undefined" && parseInt(city) > 0) {
      preloader();
      $.post("/ajax/new/setCity.php", {
        city_id: city
      }, function (data) {
        if (data.status == "success")
          window.location.reload();
        else
          preloader();
      }, "json");
    }
  });
});
// Алфавитный список брендов
$(function () {
  $(".b-alphabetic-cols").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        790: "_mx790",
        560: "_mx560",
        480: "_mx480",
        320: "_mx320"
      }
    });
  });
});

// ЛК, бонусная карта
$(function () {
  $(".b-bonus-card").livequery(function () {
    var $context = $(this);
    var $form = $(".c-lk__card-activation");
    var $saveBtn = $(".b-bonus-card__activation", $context);
    var $birthdayInput = $(".js-order-info-birthday", $context);
    var $birthdayDay = $(".js-birthday-day", $context);
    var $birthdayMonth = $(".js-birthday-mon", $context);
    var $birthdayYear = $(".js-birthday-year", $context);
    var resultModal = $("#bonuscard-activation-result");
    var modalTitle = $(".js-modal-title", resultModal);
    var modalContent = $(".js-modal-content", resultModal);

    function saveChanges() {
      setBirthday();
      sendChangesToServer();
      return false;
    }

    function setBirthday() {
      var day = parseInt($birthdayDay.val());
      var mon = parseInt($("option:selected", $birthdayMonth).val());
      var year = parseInt($birthdayYear.val());

      mon = mon > 9 ? mon : "0" + mon;

      if (day && mon && year)
        $birthdayInput.val(day + "." + mon + "." + year);
    }

    function parseBirthday() {
      var dayParts = $birthdayInput.val().split(".");
      $birthdayDay.val(dayParts[0]);
      $birthdayMonth.val(parseInt(dayParts[1]));
      $birthdayYear.val(dayParts[2]);
    }

    function sendChangesToServer() {
      preloader();
      $form.ajaxSubmit({
        dataType: "json",
        success: function (result) {
          preloader();

          if (result.status == "success") {
            modalTitle.html("Карта активирована!");
            modalContent.html("<p>Бонусная карта успешно активирована!</p>");
            window.location.href = "/personal/bonus/transactions/";
          } else {
            modalTitle.html("Произошла ошибка!");
            modalContent.html("<p>" + result.message + "</p>");
          }

          $.fancybox.open(
            resultModal, {
              padding: 0,
              margin: 20,
              closeEffect: "none",
              closeSpeed: 0,
              openSpeed: 0,
              openEffect: "none",
              openOpacity: false,
              closeOpacity: false,
              fitToView: true,
              scrolling: "visible",
              beforeShow: function () {
                $("html").addClass("fancybox-margin fancybox-lock");
              }
            }
          );
        },
        error: function () {
          console.log("bad");
        }
      });
    }


    $saveBtn.on("click", saveChanges);

    parseBirthday();

    $context.adaptBlock({
      maxWidth: {
        820: "_mx820",
        530: "_mx530"
      }
    });
  });
});
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

// Баннер с инструкциями к бонусной карте
$(function () {
  $(".b-bonus-instruction").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        760: "_mx760",
        420: "_mx420"
      }
    });
  });
});

// Промоблок с картой
$(function () {
  $(".b-bonus-promo").each(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        700: "_mx700"
      }
    });
  });
});

// comments
$(function () {
  // code here...
});

// Нижнее меню
$(function () {
  $(".b-bottom-menu").livequery(function() {
    var $context = $(this);
    var $items = $(".b-bottom-menu__item", $context);
    var $holders = $(".b-bottom-menu__holder", $context);

    function toggleHolder (e) {
      var $item = $(this);
      var index = parseInt($item.data("tab")) - 1;

      if($("html").hasClass("touch")) {
        if(index == 0) {
          $.fancybox.open($(".b-bottom-menu__wrap", $item).attr("href"), {
            padding: 0,
            margin: 20,
            closeEffect: "none",
            closeSpeed: 0,
            openSpeed: 0,
            openEffect: "none",
            openOpacity: false,
            closeOpacity: false,
            fitToView: true,
            scrolling: "visible",
            beforeShow: function () {
              $("html").addClass("fancybox-margin fancybox-lock");
            },
            afterShow: function () {
              $(".iblock", this.inner).trigger("resize.block");
            }
          });

          return false;
        }

        return true;
      }

      if($item.hasClass("_active")) {
        $items.removeClass("_active");

        $holders.eq(index).removeClass("_active");

        $(".b-bottom-menu").trigger("close.block");
        $context.addClass("_closed");
      } else {

        $items.removeClass("_active");
        $holders.removeClass("_active");
        $items.eq(index).addClass("_active");
        $holders.eq(index).addClass("_active");


        setTimeout(function () {
          $(".b-bottom-menu").not($context).trigger("change.block", [index]);
          $context.removeClass("_closed");
        }, 800);
      }

      requestAnimFrame(function () {
        $(".iblock", $holders.eq(index)).trigger("resize.block");
      });

      e.preventDefault();
    }

    function changeHolder (index) {
      $items.removeClass("_active");
      $holders.removeClass("_active");
      $items.eq(index).addClass("_active");
      $holders.eq(index).addClass("_active");
      $context.removeClass("_closed");
    }

    function closeHolders() {
      $items.removeClass("_active");
      $holders.removeClass("_active");
      $context.addClass("_closed");
    }

    (function () {
      $items.filter("[data-tab]").on("click", toggleHolder);
    })();

    $context.adaptBlock({
      maxWidth: {
        1165: "_mx1165",
        995: "_mx995",
        600: "_mx600",
      }
    });

    $context.on("close.block", function (e) {
      closeHolders();
      e.stopPropagation();
    });

    $context.on("change.block", function (e, index) {
      changeHolder(index);
      e.stopPropagation();
    });
  });
});

// Кнопка мобильного меню
$(function () {
  $(".b-burger-btn").livequery(function () {
    var $context = $(this);

    $context.on("click", function () {
      if($context.hasClass("_opened")) {
        $context.removeClass("_opened");
      } else {
        $context.addClass("_opened");
      }
    });
  });
});

// comments
$(function () {
  // code here...
});

// comments
$(function () {
  // code here...
});

// comments
$(function () {
  // code here...
});

// comments
$(function () {
  // code here...
});

// Товар добавлен в корзину
$(function () {
  $(".b-cart-added").livequery(function () {
    var $context = $(this);
  });
});
// Ссылка на корзину
$(function () {
  $(".b-cart-link").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        350: "_mx350"
      }
    });
  });
});

// Выбранные в конфигураторе продукт
$(function () {
  $(".b-cart-product").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        950: "_mx950",
        850: "_mx850",
        730: "_mx730"
      }
    });
  });
});

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
      //   expires: (1*24*60*60*1000), // 1 day
      //   path: window.location.pathname
      // });
      return false;
    }

    function showBlock () {
      $context.removeClass("_hide");
      // setCookie('hideCatalogIntro', 0, {
      //   expires: (1*24*60*60*1000), // 1 day
      //   path: window.location.pathname
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

// Список товаров каталога плиткой
$(function () {
  $(".b-catalog-list").livequery(function() {
    var $context = $(this);

  });
});

// Список товаров каталога плиткой
$(function () {
  $(".b-catalog-plates").livequery(function() {
    var $context = $(this);
      
    function equalizer() {
      var $container = $(".b-catalog-plates");
      var $platesHolder = $(".b-catalog-plates__items", $container);
      var $plates = $("> div:not(.b-catalog-plates__wide-baner, .catalog-plates-slider_wide-banner)", $platesHolder);
      var height = 0;
      var additional = $platesHolder.parent().hasClass("_additional");
      var time = additional ? 500 : 100;

      if($plates.length == 0) return;

      $plates.not(".is-resized").css("height", "");

      setTimeout(function () {
        requestAnimFrame(function () {
          console.log("equalizer");
          var wW = $(window).width();
          var countInRow = 3;

          if(additional) {
            var countInRow = 4;

            if((wW >= 611 && wW <= 960)) {
              countInRow = 2;
            } else if(wW <= 610) {
              countInRow = 1;
            }
          } else {
            if((wW >= 1024 && wW <= 1140) || (wW > 620 && wW <= 820)) {
              countInRow = 2;
            } else if(wW <= 620) {
              countInRow = 1;
            }
          }

          var s = -1;
          $plates.each(function (i, el) {
            s++;

            if($(el).hasClass("catalog-plates-slider_medium-banner") && !$(el).is(":visible")) {
              s--;
            }

            if($(".catalog-plates-slider_medium-banner").is(":visible") && $(el).prev(".catalog-plates-slider_medium-banner").length == 1) {
              s++;
            }

            if(s % countInRow == 0) {
              var $el = $(this);
              var height = 0;
              // var hasBanner = $el.prev('.catalog-plates-slider_medium-banner').length || $el.next('.catalog-plates-slider_medium-banner').length;
              var count = countInRow - 1;
              var $rowSiblings = $el.nextAll().slice(0, count);

              if($el.is(":visible")) {
                height = Math.max($el.outerHeight(), height);
              }

              if($rowSiblings.is(":visible")) {
                height = Math.max(Math.max.apply(null, $rowSiblings.map(function () {
                  return $(this).height();
                }).get()), height);
              }

              $el.css("height", height);

              $rowSiblings.css("height", height);
            }
          });
        });
      }, time);
    }

    $context.adaptBlock({
      maxWidth: {
        960: "_mx960",
        810: "_mx810",
        610: "_mx610"
      },
      minWidth: {
        1150: "_mn1150"
      }
    });

    $(window).on("resize", equalizer);
    $(document).on("catalog-plates.resize", equalizer);
    equalizer();
  });
});

// Промослайдер
$(function () {
  $(".catalog-plates-slider").livequery(function () {
    var $context = $(this);
    var $slider = $(".catalog-plates-slider__slider", $context);

    console.log($slider);

    $context.removeClass("_nojs");

    $slider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      draggable: false,
      dots: true,
      fade: true,
      autoplay: true,
      autoplaySpeed: 8000
    });

    $context.adaptBlock({
      maxWidth: {

      }
    });

    $context.on("resize.block", function () {
      $slider.slick("setPosition");
    });
  });
});
// Сортировка каталога
$(function () {
  $(".b-catalog-sort").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        1000: "_mx1000",
        767: "_mx767",
        479: "_mx479"
      }
    });
  });
});

// Меню в подкатегории каталога
$(function () {
  $(".b-category-menu").livequery(function () {
    var $context = $(this);
    var $items = $(".b-category-menu__item", $context);
    var $moreBtns = $(".b-category-menu__more", $context);

    function initExpanders () {
      $moreBtns.each(function () {
        var $btn = $(this);
        var $item = $btn.closest(".b-category-menu__item");
        var $moreHolder = $(".b-category-menu__top-level.js-more", $item);

        if(!$btn.hasClass("_open")) {
          $moreHolder.slideUp();
        } else {
          $moreHolder.slideDown();
        }
      });
    }

    function toggleExpander (e) {
      var $btn = $(this);
      var $item = $btn.closest(".b-category-menu__item");
      var $moreHolder = $(".b-category-menu__top-level.js-more", $item);

      if($btn.hasClass("_open")) {
        $moreHolder.slideUp(400);
        $btn.removeClass("_open");
      } else {
        $moreHolder.slideDown(400);
        $btn.addClass("_open");
      }

      e.preventDefault();
    }

    initExpanders();

    $moreBtns.on("click", toggleExpander);
  });
});

// Одиночная плитка категории
$(function () {
  $(".b-category-plate").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        220: "_mx220"
      }
    });
  });
});

// Плиток категорий товаров
$(function () {
  $(".b-category-plates").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        700: "_mx700",
        475: "_mx475"
      }
    });
  });
});

// Превью категорий на главной
$(function () {
  $(".b-category-preview").livequery(function () {
    var $context = $(this);

    $context.removeClass("_nojs");

    function heightEqualizer($elem) {
      $elem.css("height", "");
      setTimeout(function () {
        requestAnimFrame(function () {
          $elem.height($elem.height());
        });
      }, 100);
    }

    heightEqualizer($context);

    $context.on("resize.block", function () {
      heightEqualizer($context);
    });

    $context.adaptBlock({
      maxWidth: {
        990: "_mx990",
        680: "_mx680",
        450: "_mx450"
      }
    });
  });
});

// Слайдер категорий товара
$(function () {
  $(".b-category-slider").livequery(function () {
    var $context = $(this);
    var $slider = $(".b-category-slider__slider", $context);
    var $prev = $(".b-category-slider__prev", $context);
    var $next = $(".b-category-slider__next", $context);

    (function initSlider() {
      $slider.slick({
        slidesToShow: 4,
        slidesToScroll: 2,
        prevArrow: $prev,
        nextArrow: $next,
        respondTo: "slider",
        infinite: true,
        draggable: false,
        responsive: [{
          breakpoint: 930,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
        ]
      });
    })();

    $context.on("resize.block", function () {
      $slider.slick("checkResponsive");
      $slider.slick("setPosition");
    });

    $context.adaptBlock({
      maxWidth: {
        720: "_mx720",
        400: "_mx400"
      }
    });
  });
});
// Слайдер сертификатов
$(function () {
  $(".b-cert-slider").livequery(function () {
    var $context = $(this);
    var $slider = $(".b-cert-slider__slider", $context);

    // $slider.slick({
    //   slidesToShow: 1,
    //   slidesToScroll: 1,
    //   centerMode: true,
    //   arrows: false,
    //   autoplay: true,
    //   autoplaySpeed: 0,
    //   infinite: true,
    //   centerMode: true,
    //   speed: 4000,
    //   centerPadding: '70px',
    //   easing: 'linear'
    // });

    // $context.on('resize.block', function () {
    //   $slider.slick('checkResponsive');
    //   $slider.slick('setPosition');
    // });

    $slider.smoothDivScroll({
      mousewheelScrolling: "allDirections",
      manualContinuousScrolling: true,
      autoScrollingMode: "onStart",
      autoScrollingStep: 1,
      autoScrollingInterval: 20
    });
  });
});

// Чек-бокс
$(function () {
  $(".b-checkbox").livequery(function () {
    var $context = $(this);
    var $input = $("input[type=\"checkbox\"]", $context);

    function changeState () {
      if($input.prop("checked")) {
        $context.addClass("_checked");
      } else {
        $context.removeClass("_checked");
      }
    }

    changeState();
    $input.on("change", changeState);
  });
});

// Список чекбоксов
$(function () {
  $(".b-checkbox-cols").livequery(function () {
    var $context = $(this);
    var $moreBtn = $(".b-checkbox-cols__btn", $context);
    var $moreContainer = $(".b-checkbox-cols__more-container", $context);

    function toggleMoreContainer() {
      $moreBtn.toggleClass("b-checkbox-cols__btn_opened");
      $moreContainer.toggleClass("b-checkbox-cols__more-container_opened");
      return false;
    }

    $moreBtn.on("click", toggleMoreContainer);
  });
});

// comments
$(function () {
  // code here...
});

// comments
$(function () {
  // code here...
});

// (function (){
//       var td = document.querySelector('.scroll-td');
//       var tr = document.querySelectorAll('.scloll-tr');
//       var table = document.querySelector('.comparison-table-table');
//       var trLenght = tr.length - 1
//       var tdWidth = parseInt(window.getComputedStyle(td).width);

//       table.style.width = tdWidth * trLenght  + 'px';

// }) ();
// Дополнительные компоненты конфигуратора
$(function () {
  $(".b-configurator-additional").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        630: "_mx630",
        420: "_mx420"
      },
      minWidth: {
        1000: "_mn1000"
      }
    });
  });
});

// Список товаров конфигуратора
$(function () {
  $(".b-configurator-items").livequery(function () {
    var $context = $(this);
    var $checkboxes = $(".b-checkbox", $context);

    $checkboxes.on("click touch", function () {
      return false;
    });

    $context.adaptBlock({
      maxWidth: {
        600: "_mx600",
        350: "_mx350"
      }
    });
  });
});

// Ссылка на конфигуратор
$(function () {
  $(".b-configurator-link").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        320: "_mx320"
      },
      minWidth: {

      }
    });
  });

  $(".b-configurator-link__btn").each(function (i, el) {
    var $el = $(el);
    var $parent = $el.closest(".b-configurator-link");

    $el.on("click", function (e) {
      e.preventDefault();
    });

    var clipboard = new Clipboard($el[0], {
      target: function () {
        return $parent.find(".b-configurator-link__text")[0];
      }
    });

    clipboard.on("success", function (e) {
      $parent.find(".b-configurator-link__report").remove();
      $parent.find(".b-configurator-link__inputs").after("<p class=\"b-configurator-link__report b-configurator-link__report_success\">Ссылка скопирована в буфер обмена!</p>");
      console.log("success");
    });

    clipboard.on("error", function (e) {
      $parent.find(".b-configurator-link__report").remove();
      $parent.find(".b-configurator-link__inputs").after("<p class=\"b-configurator-link__report b-configurator-link__report_error\">Во время копирования произошла ошибка!</p>");
      console.log("error");
    });
  });
});
// Выбранные в конфигураторе продукт
$(function () {
  $(".b-configurator-product").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        620: "_mx620",
        415: "_mx415",
        350: "_mx350"
      }
    });
  });
});

// comments
$(function () {
  // code here...
});

// comments
$(function () {
  // code here...
});

// comments
$(function () {
  // code here...
});

// Выбор даты
$(function () {
  $(".b-date-select").each(function () {
    var $context = $(this);
    var $monthInput = $("[name=\"month\"]", $context);
    var $dropdownArrow = $(".b-date-select__dropdown", $context);

    $monthInput.autocomplete({
      appendTo: $context,
      minLength: 0,
      source: [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря"
      ]
    });

    $dropdownArrow.on("click", function () {
      $monthInput.autocomplete("search", "");
    });

  });
});
// Календарь
$(function () {
  $(".b-datepicker").livequery(function () {
    var $context = $(this);
    var $calendar = $(".b-datepicker__calendar", $context);
    var $input = $(".b-datepicker__input", $context);
    var minDate = $context.data("min") || 0; //http://api.jqueryui.com/datepicker/#option-minDate
    var maxDate = $context.data("max") || "+14d"; //http://api.jqueryui.com/datepicker/#option-maxDate

    function changeDate(date, calendar) {
      $input.val(date);
    }

    $calendar.datepicker({
      firstDay: 1,
      dayNames: [ "Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота" ],
      dayNamesMin: [ "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб" ],
      monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      monthNamesShort: [ "Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек" ],
      dateFormat: "dd.mm.yy",
      showOtherMonths: true,
      minDate: minDate,
      maxDate: maxDate,
      onSelect: changeDate
    });
  });
});

// comments
$(function () {
  // code here...
});

// Адрес курьерской доставки
$(function () {
  $(".b-delivery-address").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        380: "_mx380"
      }
    });
  });
});

// Выбор способа доставки
$(function () {
  $(".b-delivery-choose").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        680: "_mx680"
      }
    });
  });
});

// Форма добавления адреса
$(function () {
  $(".b-details-form").livequery(function () {
    var $context = $(this);
    var $manualSection = $(".b-details-form__manual-section", $context);
    var $recognizerSection = $(".b-details-form__recognizer-section", $context);

    window.openRecognizer = function () {
      $recognizerSection.addClass("_active");
      $manualSection.removeClass("_active");
    };

    window.openManual = function () {
      $recognizerSection.removeClass("_active");
      $manualSection.addClass("_active");
    };

    $context.on("open-recognizer.block", function(e) {
      openRecognizer();
      e.stopPropagation();
    });

    $context.on("open-manual.block", function(e) {
      openManual();
      e.stopPropagation();
    });

    $context.adaptBlock({
      maxWidth: {
        500: "_mx500"
      }
    });
  });
});

// Реквизиты в личном кабинете
$(function () {
  $(".b-details-item").livequery(function () {
    var $context = $(this);
    var $staticState = $(".b-details-item__static-state", $context);
    var $editState = $(".b-details-item__edit-state", $context);
    var $formHolder = $(".b-details-form", $context);
    var $title = $(".b-details-item__title", $context);
    var $form = $("form", $context);

    // Btns
    var $editBtn = $(".b-details-item__edit-btn", $context);
    var $editBtnHolder = $(".b-details-item__ui-edit", $context);
    var $saveBtn = $(".b-details-item__save-btn", $context);
    var $saveBtnHolder = $(".b-details-item__ui-save", $context);
    var $recognizerBtn = $(".b-details-item__recognize", $context);
    var $recognizerSubmitBtn = $(".b-details-form__recognize", $context);
    var $manualBtn = $(".b-details-item__manual", $context);
    var $removeBtn = $(".b-details-item__remove-btn",$context);
    var $uploadBtn = $(".b-details-item__upload", $context);
    var $uploadInput = $("#legal-upload-file", $context);

    var $inputs = {
      companyName: $("[name=\"NAME\"]", $context),
      legalAddress: $(".input-company-legal-address", $context),
      realAddress: $(".input-company-real-address", $context),
      companyPhone: $(".input-company-phone", $context),
      inn: $(".input-inn", $context),
      kpp: $(".input-kpp", $context),
      bank: $(".input-bank", $context),
      rs: $(".input-rs", $context),
      ks: $(".input-ks", $context),
      bic: $(".input-bic", $context),
      recognize: $(".input-recognize", $context)
    };

    var $staticItems = {
      companyName: $(".b-details-item__field-content_company-name", $context),
      legalAddress: $(".b-details-item__field-content_company-legal-address", $context),
      realAddress: $(".b-details-item__field-content_company-real-address", $context),
      companyPhone: $(".b-details-item__field-content_company-phone", $context),
      inn: $(".b-details-item__field-content_inn", $context),
      kpp: $(".b-details-item__field-content_kpp", $context),
      bank: $(".b-details-item__field-content_bank", $context),
      rs: $(".b-details-item__field-content_rs", $context),
      ks: $(".b-details-item__field-content_ks", $context),
      bic: $(".b-details-item__field-content_bic", $context)
    };

    function setEditState () {
      $context.addClass("_edit-state");
      $saveBtnHolder.addClass("b-details-item__ui-save_active");
      $editState.addClass("b-details-item__edit-state_active");
      $editBtnHolder.removeClass("b-details-item__ui-edit_active");
      $staticState.removeClass("b-details-item__static-state_active");
      $formHolder.trigger("resize.block");
      return false;
    }

    function openDetailsRecognizer () {
      openRecognizer();
      $manualBtn.addClass("b-details-item__manual_active");
      $recognizerBtn.removeClass("b-details-item__recognize_active");

      $("body").animate({
        scrollTop: ($formHolder.find(".b-details-form__textarea").offset().top - 90)
      });
      return false;
    }

    function uploadFileAndRecognize(event)
    {
      var fd = new FormData();

      fd.append("recognizeFile", event.target.files[0]);

      preloader();
      $.ajax({
        url: "/ajax/new/readWordFile.php",
        data: fd,
        cache: false,
        processData: false,
        contentType: false,
        type: "POST",
        success: function (data) {
          openDetailsRecognizer();
          $inputs.recognize.val(data);
          preloader();
        }
      });
    }

    function submitRecognizer()
    {
      var text = $inputs.recognize.val();
      var textSplit = text.split(";");

      $.each(textSplit, function (index, val) {
        var valParts, input;
        if(val.indexOf("ИНН") >= 0)
          input = $inputs.inn;
        else if(val.indexOf("КПП") >= 0)
          input = $inputs.kpp;
        else if(val.indexOf("Наименование банка") >= 0)
          input = $inputs.bank;
        else if(val.indexOf("Р/С") >= 0)
          input = $inputs.rs;
        else if(val.indexOf("К/С") >= 0)
          input = $inputs.ks;
        else if(val.indexOf("БИК") >= 0)
          input = $inputs.bic;


        valParts = val.split(":");
        input.val(valParts[1].trim());
      });

      openManualEnter();

      saveChanges();
    }

    function openManualEnter () {
      openManual();
      $manualBtn.removeClass("b-details-item__manual_active");
      $recognizerBtn.addClass("b-details-item__recognize_active");
      return false;
    }

    function saveChanges () {
      if(validateChanges()) {
        preloader();
        applyChanges();
        sendChangesToServer();
      }

      return false;
    }

    function validateChanges () {
      var $requiredFields = $("[required]", $form);
      var condition = true;
      var scrollTarget;

      $requiredFields.each(function () {
        var $input = $(this);
        var isEmpty = $input.val()=="";

        if(isEmpty) {
          $input.closest(".b-details-form__input").addClass("_none");
        } else {
          $input.closest(".b-details-form__input").removeClass("_none");
        }

        if(condition && isEmpty) {
          scrollTarget = $input.offset().top;
        }

        condition = condition && !isEmpty;
      });

      if(!isNaN(scrollTarget)) {
        $("body").animate({scrollTop: (scrollTarget - 100)}, 500);
      }

      return condition;
    }

    function applyChanges (preventRender) {
      var itemsList = [
        "companyName",
        "legalAddress",
        "realAddress",
        "companyPhone",
        "inn",
        "kpp",
        "bank",
        "rs",
        "ks",
        "bic"
      ];

      var itemsVal = {};

      $.each(itemsList, function (index, val) {
        itemsVal[val] = $inputs[val].val();
      });

      if(!preventRender) {
        $.each(itemsVal, function(name, value) {
          if(value == "") {
            $staticItems[name].closest(".b-details-item__static-field").addClass("_empty");
          } else {
            $staticItems[name].closest(".b-details-item__static-field").removeClass("_empty");
          }
          $staticItems[name].text(value);
        });

        $title.text(itemsVal["companyName"]);
      }

      return itemsVal;
    }

    function sendChangesToServer() {
      // accept any $.ajax options
      $form.ajaxSubmit({
        dataType: "json",
        success: function (result) {
          if(result.status == "success")
            setStaticState();
          else if(result.status == "error")
          {
            var modal = $("#legal-entities-error-modal"),
              errorContainer = $(".errors-container", modal);

            errorContainer.html(result.message);
            $.fancybox.open(
              modal,
              {
                padding: 0,
                margin: 20,
                closeEffect: "none",
                closeSpeed: 0,
                openSpeed: 0,
                openEffect: "none",
                openOpacity: false,
                closeOpacity: false,
                fitToView: true,
                scrolling: "visible",
                beforeShow: function () {
                  $("html").addClass("fancybox-margin fancybox-lock");
                },
                afterShow: function () {
                  $(".iblock", this.inner).trigger("resize.block");
                  preloader();
                }
              }
            );

          }
        },

        error: function () {
          console.log("bad");
        }
      });
    }

    function setStaticState () {
      $context.removeClass("_edit-state");
      $saveBtnHolder.removeClass("b-details-item__ui-save_active");
      $editState.removeClass("b-details-item__edit-state_active");
      $editBtnHolder.addClass("b-details-item__ui-edit_active");
      $staticState.addClass("b-details-item__static-state_active");
      preloader();
      return false;
    }

    function removeItem () {
      $.ajax({
        url: $(this).attr("href"),
        success: function () {
          var $componentItem = $context.closest(".c-lk__details-item");

          if($componentItem.length > 0) {
            $componentItem.remove();
          } else {
            $context.remove();
          }
        }
      });

      return false;
    }

    $removeBtn.on("click", removeItem);
    $editBtn.on("click", setEditState);
    $saveBtn.on("click", saveChanges);
    $recognizerBtn.on("click", openDetailsRecognizer);
    $recognizerSubmitBtn.on("click", submitRecognizer);
    $manualBtn.on("click", openManualEnter);
    $uploadInput.on("change", uploadFileAndRecognize);

    $context.adaptBlock({
      maxWidth: {
        730: "_mx730",
        480: "_mx480"
      }
    });
  });
});

// comments
$(function () {
  // code here...
});

// Попап авторизации
$(function () {
  $(".b-enter-modal").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        610: "_mx610",
        450: "_mx450"
      }
    });
  });
});

// Смета конфигуратора
$(function () {
  $(".b-estimate").livequery(function() {
    var $context = $(this);

  });
});

// Контент в экспандере
$(function () {
  $(".b-expand-content").livequery(function () {
    var $context  = $(this);
    var $link = $(".b-expand-content__link", $context);
    var $holder = $(".b-expand-content__content-holder", $context);

    function toggleContainer () {
      if($link.hasClass("_open")){
        $link.removeClass("_open");
        $holder.slideUp(300);
      } else {
        $link.addClass("_open");
        $holder.slideDown(300, function () {
          $("*", $holder).trigger("resize.block");
        });
      }

      return false;
    }

    if($link.hasClass("_open")) {
      $holder.slideDown(300);
    } else {
      $holder.slideUp(300);
    }

    $link.on("click", toggleContainer);
  });
});

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
// Блок вопрос-ответ
$(function () {
  $(".b-faq-block").livequery(function () {
    var $context = $(this);
    var $sendBtn = $(".b-faq-block__send", $context);
    var $replyBtn = $(".b-faq-block__answer", $context);
    var $replyArea = $(".b-faq-block__text-area", $context);
    var $replyInput = $(".b-faq-block__text-area textarea", $context);
    var $feedbackLinks = $(".b-faq-block__feedback-link", $context);
    var $resultTextContainer = $("#question-vote-result .b-form-success-modal__content-holder");

    function showReplyArea () {
      $replyBtn.removeClass("b-faq-block__answer_active");
      $replyArea.addClass("b-faq-block__text-area_active");
      $sendBtn.addClass("b-faq-block__send_active");
      return false;
    }

    function sendMessage () {
      return false;
    }

    function sendFeedback () {
      var $this = $(this),
        $parent = $this.parent(),
        $up = $(".link-thumbup", $parent),
        $down = $(".link-thumbdown", $parent);
      preloader();
      $.ajax({
        url: "/ajax/new/voteQuestion.php",
        data: {"ID" : $this.data("element"), "INCREMENT": $this.data("increment")},
        method: "post",
        dataType: "json",
        success: function (result) {
          if(result.status == "success") {
            $resultTextContainer.html("<p>Ваш голос принят, спасибо!</p>");
            $up.html("<span>Помогло ("+result.for+")</span>");
            $down.html("<span>Не помогло ("+result.contra+")</span>");
          } else {
            $resultTextContainer.html("<p>"+result.message+"</p>");
          }
          $.fancybox.open(
            $("#question-vote-result"),
            {
              padding: 0,
              margin: 20,
              closeEffect: "none",
              closeSpeed: 0,
              openSpeed: 0,
              openEffect: "none",
              openOpacity: false,
              closeOpacity: false,
              fitToView: true,
              scrolling: "visible",
              beforeShow: function () {
                $("html").addClass("fancybox-margin fancybox-lock");
              },
              afterShow: function () {
                $(".iblock", this.inner).trigger("resize.block");
              }
            }
          );
          preloader();
        },

        error: function () {
          console.log("bad");
        }
      });
    }

    $feedbackLinks.on("click", sendFeedback);
    $replyBtn.on("click", showReplyArea);
    $sendBtn.on("click", sendMessage);

    $context.adaptBlock({
      maxWidth: {
        550: "_mx550",
        400: "_mx400"
      }
    });
  });
});

// Список вопросов в ЛК
$(function () {
  $(".b-faq-list").livequery(function() {
    var $context = $(this);
  });
});

// Купить в 1 клик
$(function () {
  $(".b-fast-buy").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        620: "_mx620"
      }
    });
  });
});

// Преимущества
$(function () {
  $(".b-features").livequery(function () {
    var $context = $(this);
    var $platesHolder = $(".b-catalog-plates__items", $context);
    var $plates = $(".b-features__feature", $context);

    $context.removeClass("._nojs");

    function equalizer() {
      var _tmp = 0;
      var heights = [];
      var iterations = 0;

      if($plates.length == 0) return;

      $plates.css("min-height", 0);

      setTimeout(function () {
        requestAnimFrame(function () {
          contextWidth = $context.width();
          if(contextWidth == 0) return;

          plateWidth = $plates.eq(0).outerWidth();
          _tmp = Math.round(contextWidth/plateWidth);
          iterations = $plates.length / _tmp;
          for(var r = 0; r < iterations; r++) {
            for(var i = 0; i<_tmp; i++) {
              if(heights[r] === undefined) {
                heights[r] = $plates.eq(r*_tmp + i).outerHeight();
              } else {
                heights[r] = Math.max($plates.eq(r*_tmp + i).outerHeight(), heights[r]);
              }
            }
          }

          for(var r = 0; r < iterations; r++) {
            for(var i = 0; i<_tmp; i++) {
              $plates.eq(r*_tmp + i).css("min-height", heights[r]);
            }
          }
        });
      }, 100);
    }

    equalizer();
    $(window).on("resizeWidth", equalizer);
    $context.on("resize.block", function () {
      equalizer();
    });

    $(document).on("catalog-plates.resize", equalizer);
    $context.adaptBlock({
      maxWidth: {
        1000: "_mx1000",
        500: "_mx500"
      }
    });
  });
});

// Форма добавления адреса
$(function () {
  $(".b-feedback-form").livequery(function () {
    var $context = $(this);
    var $townInput = $(".b-feedback-form__town-input", $context);

    $context.adaptBlock({
      maxWidth: {
        500: "_mx500"
      },
      minWidth: {
      }
    });
  });
});

// Адрес в лк
$(function () {
  $(".b-feedback-item").livequery(function () {
    var $context = $(this);
    var $plusField = $(".b-feedback-item__save-field_plus", $context);
    var $minusField = $(".b-feedback-item__save-field_minus", $context);
    var $commentField = $(".b-feedback-item__save-field_comment", $context);
    var $ratingField = $(".b-feedback-item__rating .b-rating", $context);
    var $form = $("form", $context);

    // Btns
    var $editBtn= $(".b-feedback-item__edit-btn",$context);
    var $editBtnHolder = $(".b-feedback-item__ui-edit",$context);
    var $saveBtn = $(".b-feedback-item__save-btn",$context);
    var $saveBtnHolder = $(".b-feedback-item__ui-save",$context);
    var $removeBtn = $(".b-feedback-item__remove-btn",$context);
    var $removeBtnHolder = $(".b-feedback-item__ui-remove",$context);

    // Inputs
    var $inputPlus = $("[name=\"PROPERTY_VALUES[PROS]\"]", $context);
    var $inputMinus = $("[name=\"PROPERTY_VALUES[CONS]\"]", $context);
    var $inputComment = $("[name=\"PROPERTY_VALUES[COMMENTS]\"]", $context);
    var $ratingInput = $("[name=\"PROPERTY_VALUES[RATING]\"]", $context);

    function setEditState () {
      $saveBtnHolder.addClass("b-feedback-item__ui-save_active");
      $editBtnHolder.removeClass("b-feedback-item__ui-edit_active");
      $context.addClass("_edit-state");
      $(".b-address-form", $context).trigger("block.resize");
      return false;
    }

    function saveChanges () {
      preloader();
      applyChanges();
      sendChangesToServer();
      if(!$context.hasClass("b-comments-modal"))
        setSaveState();
      return false;
    }

    function applyChanges (isPreventRender) {
      var plus = $inputPlus.val();
      var minus = $inputMinus.val();
      var comment = $inputComment.val();
      var rating = parseInt($ratingInput.val());

      if(!isPreventRender) {
        $plusField.find(".b-feedback-item__field-content").text(plus);
        plus == "" ? $plusField.addClass("_hide") : $plusField.removeClass("_hide");

        $minusField.find(".b-feedback-item__field-content").text(minus);
        minus == "" ? $minusField.addClass("_hide") : $minusField.removeClass("_hide");

        $commentField.find(".b-feedback-item__field-content").text(comment);
        comment == "" ? $commentField.addClass("_hide") : $commentField.removeClass("_hide");

        $ratingField.trigger("change-val.block", [rating]);
        return true;
      }

      return [plus, minus, comment, rating];
    }

    function sendChangesToServer() {
      // accept any $.ajax options
      $form.ajaxSubmit({
        method: "post",
        success: function () {
          console.log("good");
          $.fancybox.open(
            $("#feedback-result"),
            {
              padding: 0,
              margin: 20,
              closeEffect: "none",
              closeSpeed: 0,
              openSpeed: 0,
              openEffect: "none",
              openOpacity: false,
              closeOpacity: false,
              fitToView: true,
              scrolling: "visible",
              beforeShow: function () {
                $("html").addClass("fancybox-margin fancybox-lock");
              },
              afterShow: function () {
                $(".iblock", this.inner).trigger("resize.block");
              }
            }
          );
          preloader();
        },

        error: function () {
          console.log("bad");
        }
      });
    }

    function setSaveState () {
      $saveBtnHolder.removeClass("b-feedback-item__ui-save_active");
      $editBtnHolder.addClass("b-feedback-item__ui-edit_active");
      $context.removeClass("_edit-state");
      return false;
    }

    function removeItem () {
      preloader();
      $.ajax({
        url: $(this).attr("href"),
        data: {"ID": $(this).data("item")},
        method: "post",
        success: function () {
          $context.remove();
          preloader();
        }
      });

      return false;
    }

    $editBtn.on("click", setEditState);
    $saveBtn.on("click", saveChanges);
    $removeBtn.on("click", removeItem);

    $context.adaptBlock({
      maxWidth: {
        610: "_mx610",
        480: "_mx480"
      }
    });
  });
});

// Попап обратной связи
$(function () {
  $(".b-feedback-modal").livequery(function () {
    var $context = $(this);
    var $forms = $("form", $context);

    function sendChangesToServer($form, e) {
      e.preventDefault();

      var required = $("input[required]", $form),
        formFilled = true;

      required.each(function(index, obj)
      {
        if(!$(obj).val())
          formFilled = false;
      });

      if(!formFilled)
        return;

      preloader();

      // accept any $.ajax options
      $form.ajaxSubmit({
        success: function () {
          $.fancybox.open(
            $("#form-success-modal"),
            {
              padding: 0,
              margin: 20,
              closeEffect: "none",
              closeSpeed: 0,
              openSpeed: 0,
              openEffect: "none",
              openOpacity: false,
              closeOpacity: false,
              fitToView: true,
              scrolling: "visible",
              beforeShow: function () {
                $("html").addClass("fancybox-margin fancybox-lock");
              },
              afterShow: function () {
                $(".iblock", this.inner).trigger("resize.block");
              }
            }
          );
          preloader();
        },

        error: function () {
          console.log("bad");
          preloader();
        }
      });
    }

    $forms.on("submit", function(e) {sendChangesToServer($(this), e);});

    $context.adaptBlock({
      maxWidth: {
        590: "_mx590"
      }
    });
  });
});

// Отзывы о продукте
$(function () {
  $(".b-feedback-product").livequery(function () {
    var $context = $(this),
      $item = $(".b-feedback-product__item", $context),
      $thumbs = $(".link-thumbup, .link-thumbdown", $item),
      $resultTextContainer = $("#vote-result .b-form-success-modal__content-holder");

    $thumbs.on("click", function (e) {
      var $this = $(this),
        $parent = $this.parent(),
        $up = $(".link-thumbup", $parent),
        $down = $(".link-thumbdown", $parent);
      preloader();
      $.ajax({
        url: "/ajax/new/voteFeedback.php",
        data: {
          "ID": $this.data("element"),
          "INCREMENT": $this.data("increment")
        },
        method: "post",
        dataType: "json",
        success: function (result) {
          if (result.status == "success") {
            $resultTextContainer.html("<p>Ваш голос принят, спасибо!</p>");
            $up.html("<span>" + result.for+"</span>");
            $down.html("<span>" + result.contra + "</span>");
          } else {
            $resultTextContainer.html("<p>" + result.message + "</p>");
          }
          $.fancybox.open(
            $("#vote-result"), {
              padding: 0,
              margin: 20,
              closeEffect: "none",
              closeSpeed: 0,
              openSpeed: 0,
              openEffect: "none",
              openOpacity: false,
              closeOpacity: false,
              fitToView: true,
              scrolling: "visible",
              beforeShow: function () {
                $("html").addClass("fancybox-margin fancybox-lock");
              },
              afterShow: function () {
                $(".iblock", this.inner).trigger("resize.block");
              }
            }
          );
          preloader();
        },

        error: function () {
          console.log("bad");
        }
      });
    });

    $context.adaptBlock({
      maxWidth: {
        550: "_mx550",
        480: "_mx480"
      }
    });
  });
});
// Сортировка отзывов
$(function () {
  $(".b-feedback-sort").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        620: "_mx620",
        380: "_mx380"
      }
    });
  });
});

// Шкала в фильтре
$(function () {
  $(".b-filter-scale").livequery(function () {

    var $context = $(this);
    var $scale = $(".b-filter-scale__scale", $context);
    var $minInput = $(".js-min", $context);
    var $maxInput = $(".js-max", $context);
    var scaleMin = parseFloat($scale.data("min")) || 0;
    var scaleMax = parseFloat($scale.data("max")) || 10000;
    var currMin = scaleMin;
    var currMax = scaleMax;
    var scaleStep = parseFloat($scale.data("step"));

    if(scaleMax < scaleMin) scaleMax = scaleMin;
    if($minInput.length > 0) currMin = parseFloat($minInput.val());
    if($maxInput.length > 0) currMax = parseFloat($maxInput.val());

    function changeMaxVal() {
      var value = parseFloat($(this).val());
      if(isNaN(value)) value = scaleMax;
      if(value < currMin) value = currMin;
      if(value > scaleMax) value = scaleMax;
      currMax = value;

      $maxInput.val(value);
      $scale.slider("values", 1, value);
    }

    function changeMinVal() {
      var value = parseFloat($(this).val());
      if(isNaN(value)) value = scaleMin;
      if(value < scaleMin) value = scaleMin;
      if(value > currMax) value = currMax;
      currMin = value;

      $minInput.val(value);
      $scale.slider("values", 0, value);
    }

    function scaleChanges (event, ui) {
      var values = ui.values;

      $minInput.val(values[0]).trigger("change");
      $maxInput.val(values[1]).trigger("change");

      currMin = values[0];
      currMax =values[1];
    }

    $scale.slider({
      range: true,
      min: scaleMin,
      max: scaleMax,
      values: [currMin, currMax],
      slide: scaleChanges,
      step: scaleStep
    });

    $maxInput.on("change", changeMaxVal);
    $minInput.on("change", changeMinVal);
  });
});

// Ссылки в футере
$(function () {
  $(".b-footer-links").livequery(function () {
    var $context = $(this);
    var $captions = $(".b-footer-links__caption", $context);
    var $holders = $(".b-footer-links__menu", $context);

    function expandLinks() {
      var $caption = $(this);
      $caption.toggleClass("b-footer-links__caption_open");

      $caption.next().toggleClass("b-footer-links__menu_open");
    }

    $captions.on("click", expandLinks);

    $context.adaptBlock({
      maxWidth: {
        670: "_mx670",
        450: "_mx450"
      }
    });
  });
});

// Gaming
$(function () {
  
  function smoothScroll(e) {
    e.preventDefault();
    var $target = $($(this).attr('href'));
    console.log($(this).attr('href'));
    $('html, body').animate({
      scrollTop: ($target.offset().top - 40)
    }, 400)
  }

  $('.b-gaming-slider').slick({
    useTransform: true,
    speed: 640,
    cssEase: 'cubic-bezier(0.65, 0.05, 0.36, 1)',
    prevArrow: '<button type="button" class="slick-arrow slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-arrow slick-next"></button>'
  });

  $('.b-gaming-carousel').slick({
    arrows: true,
    dots: false,
    slidesToShow: 5,
    centerMode: true,
    centerPadding: 0,
    swipeToSlide: true,
    useTransform: true,
    touchThreshold: 20,
    speed: 640,
    cssEase: 'cubic-bezier(0.65, 0.05, 0.36, 1)',
    prevArrow: '<button type="button" class="slick-arrow slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-arrow slick-next"></button>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: true,
          slidesToShow: 3,
          centerPadding: 0,
        }
      },
      {
        breakpoint: 640,
        settings: {
          arrows: true,
          dots: true,
          slidesToShow: 1,
          centerPadding: 0,
        }
      }
    ]
  });
  
  $('.b-gaming-slider__slide-price').text(
    function() {
      var price = $(this).text();
      return price.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    }
  );
  $(window).load(function() {
    $("#twentytwenty").twentytwenty({
      before_label: '',
      after_label: '',
      //no_overlay: true
    });
  });
  $(document).on('click', '.smoothscroll', smoothScroll);
})
// comments
$(function () {
  // code here...
});

// comments
$(function () {
  // code here...
});

// comments
$(function () {
  // code here...
});

// Внутреннее меню
$(function () {
  $(".b-inner-menu").livequery(function() {
    var $context = $(this);
    var $topLinks = $(".b-inner-menu__top-link", $context);
    var $topItems = $(".b-inner-menu__top-item", $context);

    function openSubMenu () {
      var $link = $(this);
      var $item = $link.closest(".b-inner-menu__top-item");
      var $container = $(".b-inner-menu__sub-level", $item);

      if(!$link.hasClass("b-inner-menu__top-link_contain")) return true;

      if($item.hasClass("_opened")) {
        $container.slideUp(400);
        $item.removeClass("_opened");
      } else {
        $container.slideDown(400);
        $item.addClass("_opened");
      }
      return false;
    }

    function init() {
      var $containers = $(".b-inner-menu__sub-level", $topItems.filter(":not(._opened)"));
      $containers.slideUp(0);
    }

    init();
    $topLinks.on("click", openSubMenu);
  });
});

// Плиток категорий товаров
$(function () {
  $(".b-intro-plates").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        880: "_mx880",
        590: "_mx590",
        480: "_mx480",
        475: "_mx475"
      },
      minWidth: {
        1010: "_mn1010"
      }
    });
  });
});

// Список вакансий
$(function () {
  $(".b-jobs-list").livequery(function () {
    var $context = $(this);
    var $itemLinks = $(".b-jobs-list__item-caption", $context);
    var $itemContainers = $(".b-jobs-list__item-content", $context);
    var $containers = $(".b-jobs-list__item-content", $context);

    function expandContent() {
      var $link = $(this);
      var $container = $link.nextAll(".b-jobs-list__item-content").eq(0);

      if ($link.hasClass("_open")) {
        $container.slideUp(400);
        $link.removeClass("_open");
      } else {
        $containers.slideUp(400);
        $itemLinks.removeClass("_open");
        $container.slideDown(400);
        $link.addClass("_open");
      }

      return false;
    }

    function init() {
      $itemLinks.each(function () {
        var $this = $(this);
        if (!$this.hasClass("_open")) {
          $this.nextAll(".b-jobs-list__item-content").eq(0).slideUp(0);
        }
      });
    }

    init();
    $itemLinks.on("click", expandContent);
  });
});
// Набор аксессуаров со скидкой

function numberWithSeparator(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

$(function () {
  $(".b-kit-action").livequery(function () {
    var $context = $(this);
    var $pane = $(".b-kit-action__pane", $context);
    var $scrollContainer = $(".b-kit-action__container", $context);
    var $scrollPane = $(".b-kit-action__pane", $context);
    var $products = $(".b-kit-action__product", $context);
    var $discountCaption = $(".js-kit__discount-caption", $context);
    var $totalCaption = $(".js-kit__total-caption", $context);
    var $productCheckbox = $(".b-checkbox__input", $products);
    var $scrollProducts = $scrollContainer.find(".b-kit-action__product").length;

    if($scrollProducts > 3) {
      setTimeout(function () {
        $scrollContainer.jScrollPane();
      }, 200);

      $scrollContainer.on("mousewheel", function (event, delta, deltaX, deltaY) {
        $scrollContainer.data("jsp").scrollByX(delta*-100);
        return false;
      });

      $context.on("resize.block", function () {
        $scrollContainer.data("jsp").reinitialise();
      });
    }

    $productCheckbox.on("click touchstart", function () {
      var $allChecked = true;
      var $totalPrice = 0;
      var $checked = $(".b-kit-action .b-checkbox__input:checked");
      $products.each(function($index, $val) {
        var $checkbox = $(".b-checkbox__input", $val);
        var $price = $(".b-kit-product__price", $val);
        if($checkbox.is(":checked"))
        {
          $totalPrice += parseInt($price.data("price"));
        }
        else
        {
          $allChecked = false;
        }

        if($allChecked)
        {
          $discountCaption.show();
          $totalCaption.html("Купить за "+numberWithSeparator($totalCaption.data("realprice"))+"<span class=\"rub\">i</span>");
        }
        else
        {
          $discountCaption.hide();
          $totalCaption.html("Купить за "+numberWithSeparator($totalPrice)+"<span class=\"rub\">i</span>");
        }
      });

      if($checked.length > 0)
        $totalCaption.show();
      else
        $totalCaption.hide();
    });

    $totalCaption.on("click touchstart", function (e) {
      var $productIds = [];
      preloader();
      $products.each(function($index, $val) {
        var $checkbox = $(".b-checkbox__input", $val);
        if($checkbox.is(":checked"))
        {
          $productIds.push($($val).data("id"));
        }
      });
      e.preventDefault();
      $.ajax({
        url: "/ajax/new/addToCart.php",
        data: {id: $productIds},
        success: function(result)
        {
          refreshBasket();
          preloader();
          $.fancybox.open(
            $("#added-cart-modal"),
            {
              padding: 0,
              margin: 20,
              closeEffect: "none",
              closeSpeed: 0,
              openSpeed: 0,
              openEffect: "none",
              openOpacity: false,
              closeOpacity: false,
              fitToView: true,
              scrolling: "visible",
              beforeShow: function () {
                $("html").addClass("fancybox-margin fancybox-lock");
              },
              afterShow: function () {
                $(".iblock", this.inner).trigger("resize.block");
              }
            }
          );
        }
      });
    });
  });
});
// comments
$(function () {
  // code here...
});

// Что нужно знать перед покупкой
$(function () {
  $(".b-know-how").livequery(function () {
    var $context = $(this);
    var $items = $(".b-know-how__item", $context);
    var height = 0;

    function equalizer () {
      height = 0;
      $items.css("height", "");

      setTimeout(function () {
        $items.each(function () {
          height = Math.max($(this).height(), height);
        });

        $items.css("height", height);
      }, 200);

    }

    equalizer();
    $(window).on("resize", equalizer);
    $context.on("resize.block", equalizer);

    $context.adaptBlock({
      maxWidth: {
        700: "_mx700"
      }
    });
  });
});

// comments
$(function () {
  // code here...
});

// comments
$(function () {
  $(".b-list-product").livequery(function () {
    var $context = $(this);
    var $preview = $(".b-list-product__fast-view", $context);

    function showPreview () {
      $.fancybox.open(
        {
          href: $(this).attr("data-href")
        },
        {
          wrapCSS: "_product-preview _ajax-appended",
          type: "ajax",
          fitToView: true,
          autoResize: true,
          padding: 0,
          margin: 20,
          maxWidth: 1200,
          afterLoad: function (current, previous) {
            var $content = $(current.content);

            $content.addClass("_ajax-append");
            current.content = $("<div>").append($content.clone()).html();
            $.fancybox .showLoading();
          },
          afterShow: function () {
            $(".iblock").trigger("resize.block");

            setTimeout(function () {
              $.fancybox .hideLoading();
              $(".fancybox-wrap._ajax-appended").removeClass("_ajax-appended");
              $(".fancybox-wrap .b-product-preview._ajax-append").removeClass("_ajax-append");
              $(".fancybox-wrap").livequery();
            }, 400);
          }
        }
      );
      return false;
    }

    $preview.on("click", showPreview);

    $context.adaptBlock({
      maxWidth: {
        610: "_mx710",
        510: "_mx510",
        370: "_mx370"
      }
    });
  });
});

// Слайдер логотипов партнеров
$(function () {
  $(".b-logo-tape").livequery(function () {
    var $context = $(this);
    var $slider = $(".b-logo-tape__items", $context);
    $context.removeClass("_nojs");

    $slider.slick({
      slidesToShow: 7,
      slidesToScroll: 1,
      // autoplay: true,
      arrows: false,
      draggable: false,
      autoplaySpeed: 2500,
      speed: 500,
      respondTo: "slider",
      responsive: [{
        breakpoint: 960,
        settings: {
          slidesToShow: 5
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3
        }
      }
      ]
    });


    $context.on("resize.block", function () {
      $slider.slick("checkResponsive");
      $slider.slick("setPosition");
    });

    $context.adaptBlock({
      maxWidth: {
        960: "_mx960",
        600: "_mx600"
      }
    });
  });
});
// Ключевые преимущества
$(function () {
  $(".b-main-advantages").livequery(function() {
    var $context = $(this);
    var $itemsHolder = $(".b-main-advantages__items", $context);

    $context.adaptBlock({
      maxWidth: {
        1000: "_mx1000",
        480: "_mx480"
      }
    });
  });
});

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

// Главное меню
$(function blockMainMenu() {
  $(".b-main-menu").livequery(function () {
    var $context = $(this);
    var $topLinks = $(".b-main-menu__top-link", $context);
    var $topItems = $(".b-main-menu__top-item", $context);
    var $holders = $(".b-main-menu__top-holder", $context);
    var $subItems = $(".b-main-menu__sub-item", $context);
    var $subLevel = $(".b-main-menu__sub-level", $context);
    var $subHolders = $(".b-main-menu__sub-holder", $context);
    var timeout = 300;
    var timeoutOpenInstance;
    var timeoutCloseInstance;
    var timeoutTabsChangeInstance;
    var timeoutMainChangeInstance;


    _timeout = timeout;

    $context.removeClass("_delay");

    function delaySet() {
      if($context.hasClass("_delay")) {
        clearTimeout(timeoutCloseInstance);
        clearTimeout(timeoutTabsChangeInstance);
      } else {
        clearTimeout(timeoutOpenInstance);
        timeoutOpenInstance = setTimeout(function() {
          $context.addClass("_delay");
        }, timeout);
      }
    }

    function changeTopLink () {
      var $link = $(this);
      var index = $topLinks.index($link);
      // var color = $link.attr('data-color') || 'red';

      clearTimeout(timeoutMainChangeInstance);
      if($link.hasClass("_active")) return false;

      timeoutMainChangeInstance = setTimeout(function () {
        $context.addClass("_expand");
        $holders.removeClass("_expand");
        $topLinks.removeClass("_expand");
        $topItems.removeClass("_expand");
        $subItems.removeClass("_expand");
        $holders.eq(index).addClass("_expand");
        $topItems.eq(index).addClass("_expand");
      }, 300);
    }

    function collapseTopLevel () {
      clearTimeout(timeoutOpenInstance);
      clearTimeout(timeoutTabsChangeInstance);
      timeoutCloseInstance = setTimeout(function () {
        $holders.removeClass("_expand");
        $topLinks.removeClass("_expand");
        $topItems.removeClass("_expand");
        $context.removeClass("_expand _delay");
        $subItems.removeClass("_expand");
      }, timeout);
    }

    function expandSubLevel () {
      var $item = $(this);
      var $activeItem = $subItems.filter("._expand");

      clearTimeout(timeoutTabsChangeInstance);
      if($item.hasClass("_expand")) return;

      timeoutTabsChangeInstance = setTimeout(function() {
        if($activeItem.length > 0) {
          $item.addClass("_expand");
          $activeItem.removeClass("_expand");
        } else {
          $item.addClass("_expand-effect");

          setTimeout(function () {
            $item.addClass("_expand");
          }, timeout);

          setTimeout(function () {
            $item.removeClass("_expand-effect");
          }, timeout*2);
        }
      }, timeout);
    }

    function preventCollapse () {
      clearTimeout(timeoutTabsChangeInstance);
    }

    function preventCollapseMain () {
      clearTimeout(timeoutMainChangeInstance);
    }

    $topLinks.on("mouseenter", changeTopLink);

    $context.on("mouseenter", delaySet);
    $context.on("mouseleave", collapseTopLevel);
    $subItems.on("mouseenter", expandSubLevel);
    $subHolders.on("mouseenter", preventCollapse);
    $holders.on("mouseenter", preventCollapseMain);

    $context.adaptBlock({
      maxWidth: {
        1060: "_mx1060"
      }
    });
  });
});

// Плиток категорий товаров
$(function () {
  $(".b-main-plates").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        960: "_mx960",
        740: "_mx740",
        475: "_mx475"
      }
    });
  });
});

// Список салонов на карте
$(function () {
  $(".b-map-contacts").livequery(function () {
    var $context = $(this);
    var $cols = $(".b-map-contacts__cols", $context);
    var $shops = $(".b-shops-list__shop", $context);
    var $map = $(".b-ymap");

    function equalize () {
      $cols.css("height", "");
      setTimeout(function () {
        $cols.css("height", $cols.height());
      }, 200);
    }

    function fillMap() {
      $shops.each(function () {
        var $shop = $(this);
        $map.trigger("resetPlacemarks.block");
        setTimeout(function () {
          $map.trigger("setPlacemark.block",[{
            coords: $shop.data("coords").split(","),
            address: $(".b-shops-list__shop-address", $shop).html(),
            phone: $(".b-shops-list__shop-phone", $shop).html(),
            hours: $(".b-shops-list__shop-hours", $shop).html(),
            link: $shop.data("link"),
            type: $shop.closest(".b-shops-list__group").find(".b-shops-list__group-name").data("map-title")
          }]);
        }, 300);
      });
    }

    function showShop() {
      $map.trigger("setCenter.block", [$(this).data("coords").split(","), 14]);
      return false;
    }

    $shops.on("click", showShop);

    equalize();
    $(window).on("resize", equalize);
    $context.on("resize.block", equalize);

    $map.on("mapReady.block", fillMap);

    $context.adaptBlock({
      maxWidth: {
        880: "_mx880"
      }
    });
  });
});

// Точки получения заказа на отдельной карте
$(function () {
  $(".b-map-point").livequery(function () {
    var $context = $(this);
    var $points = $(".b-map-point__option", $context);
    var $map = $(".b-ymap", $context);
    var $mapHolder = $(".b-map-point__map-section", $context);
    var $select = $(".b-map-point__select select", $context);
    var $chooseHolder = $(".b-map-point__choose-holder", $context);
    var $chooseBtn = $(".b-map-point__choose-btn", $context);

    function setPlacemarks() {
      $points.each(function () {
        var $point = $(this);
        var $address = $(".b-map-point__address", $point);
        var $time = $(".b-map-point__time", $point);
        var $metro = $(".b-map-point__metro", $point);
        var metroList = [];

        $metro.each(function () {
          metroList.push($(this).html());
        });

        $map.trigger("setPlacemark.block", [{
          coords: $point.data("coords").split(","),
          address: $address.html(),
          hours: $time.html(),
          type: $address.html(),
          data: {
            metro: metroList,
            index: $points.index($point)
          },

          // Шаблонизация https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Template-docpage
          // Если будут использоваться внешние данные, то необходимо обойти использование |raw, иначе возможен XSS. Используется в основном для типографики.
          balloonTemplate:
              "<div class=\"b-ymap__balloon-inner _qiwi\">" +
                "<div class=\"b-ymap__balloon-header\">" +
                  "<div class=\"b-ymap__balloon__close\"></div>" +
                  "<div class=\"b-ymap__balloon-address\">{{properties.address|raw}}</div>" +
                "</div>" +
                "<div class=\"b-ymap__balloon-content\">" +
                  "{% if properties.metro.length != 0 %}" +
                  "<ul class=\"b-ymap__metro-items\">" +
                    "{% for metro in properties.metro %}" +
                      "<li class=\"b-ymap__metro-item\">{{metro|raw}}</li>"+
                    "{% endfor %}" +
                  "</ul>" +
                  "{% endif %}" +
                  "<div class=\"b-ymap__balloon-hours\">{{properties.hours|raw}}</div>" +
                  "<a href=\"#\" class=\"b-ymap__balloon-apply button\" data-index=\"{{properties.index}}\"\">Заберу отсюда</a>" +
                "</div>" +
              "</div>",

          markTemplate:
              "<div class=\"b-ymap__placemark _qiwi\">" +
                "<div class=\"b-ymap__placemark-round\"></div>" +
                "<div class=\"b-ymap__placemark-text\">" +
                  "{{ properties.iconContent }}" +
                "</div>" +
              "</div>",

          buildCallback: balloonBehavior
        }]);
      });

      $map.off("mapReady.block", setPlacemarks);
    }

    // Тут можно определить поведение балуна
    function balloonBehavior () {
      var template = this;
      var placemark = template.getParentElement();
      var $balloon = $(placemark).find(".b-ymap__balloon-inner");
      var $applyBtn = $(".b-ymap__balloon-apply", $balloon);

      $applyBtn.on("click", function (e) {
        var index = $(this).data("index");
        $select.get(0).selectedIndex = index;
        $select.change();
        setMode("save");
        template.onCloseClick(e);
      });
    }

    function changeBySelect(e) {
      var index = this.selectedIndex;
      var mapTarget = $points.eq(index).data("coords");
      $points.removeClass("_active");
      $points.eq(index).addClass("_active");
      $map.trigger("setCenter.block", [mapTarget.split(","), 14]);
    }

    function setMode(mode) {
      if(mode == "edit") {
        $chooseHolder.removeClass("_active");
        $mapHolder.addClass("_active");
      } else {
        $chooseHolder.addClass("_active");
        $mapHolder.removeClass("_active");
      }
    }

    $map.on("mapReady.block", setPlacemarks);

    $chooseBtn.on("click", function (e) {
      setMode("edit");
      e.preventDefault();
    });

    $select.on("change", changeBySelect);
  });
});

$(".b-shops-list__shop").on("click",function () {
  var w = screen.width;
  var mapContent = document.getElementsByClassName("b-map-contacts__cols");
  var mapContentHeight = parseInt(window.getComputedStyle(mapContent[0]).height);
  var scroll = mapContentHeight/2;  

  if(w > 768) {
    window.scrollTo(0,scroll);
  } else {
    mapContent[0].scrollIntoView(top);
  }
});

// comments
$(function () {
  // code here...
});

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

// Боковая панель в мобильной версии
$(function() {
  $(".b-mobile-aside").livequery(function () {
    var $context = $(this);

    $context.on("mobile-menu.open", function () {
      $context.addClass("_sub-menu-opened");
    });

    $context.on("mobile-menu.close", function () {
      $context.removeClass("_sub-menu-opened");
    });
  });
});

// Мобильный хедер
$(function () {
  $(".b-mobile-header").livequery(function () {
    var $context = $(this);
    var $searchLink = $(".b-mobile-header__search-link", $context);
    var $searchHolder = $(".b-mobile-header__search-line", $context);
    var $searchInput = $(".b-search-line__input", $context);

    function showSearchLine () {
      $context.addClass("_search-open");
      return false;
    }

    function hideSearchLine (e) {
      if($(e.target).is($searchHolder) || $(e.target).closest($searchHolder).length > 0) return true;
      $context.removeClass("_search-open");
    }

    $searchLink.on("click", showSearchLine);
    $("body").on("click", hideSearchLine);

    $(window).on("resize", function () {
      $context.removeClass("_search-open");
    });

    $context.adaptBlock({
      maxWidth: {
        680: "_mx680",
        440: "_mx440"
      }
    });
  });
});

// Мобильное меню
$(function () {
  $(".b-mobile-menu").livequery(function () {
    var $context = $(this);
    var $topLinks = $(".b-mobile-menu__top-link", $context);
    var $subLinks = $(".b-mobile-menu__sub-link", $context);
    var $topContainers = $(".b-mobile-menu__container", $context);
    var $returnLink = $(".b-mobile-menu__return-link", $context);

    function openSubMenu () {
      var $link = $(this);
      var index = $topLinks.index($link);
      var $container = $link.siblings(".b-mobile-menu__container");
      $container.addClass("_active");
      $context.addClass("_sub-menu-opened");
      $context.trigger("mobile-menu.open");
      return false;
    }

    function toggleThirdMenu () {
      var $link = $(this);
      var $container = $link.siblings(".b-mobile-menu__sub-container");

      if(!$link.hasClass("_open")) {
        $container.addClass("_active");
        $link.addClass("_open");
      } else {
        $container.removeClass("_active");
        $link.removeClass("_open");
      }
      return false;
    }

    function closeSubMenu () {
      $context.removeClass("_sub-menu-opened");
      $topContainers.removeClass("_active");
      $context.trigger("mobile-menu.close");
      return false;
    }

    $topLinks.filter("._contain").on("click", openSubMenu);
    $subLinks.filter("._contain").on("click", toggleThirdMenu);
    $returnLink.on("click", closeSubMenu);
  });
});

// Плитка с новстью
$(function () {
  $(".b-news-plate").livequery(function () {
    var $context = $(this);
    var $productSlider = $(".b-news-plate__product-items", $context);
    var $prev = $(".b-news-plate__prev", $context);
    var $next = $(".b-news-plate__next", $context);

    (function initSlider() {
      $productSlider.slick({
        slidesToShow: 2,
        rows: 2,
        prevArrow: $prev,
        nextArrow: $next,
        respondTo: "slider",
        responsive: [{
          breakpoint: 550,
          settings: {
            rows: 1,
            slidesToShow: 1
          }
        }]
      });
    })();

    $context.adaptBlock({
      maxWidth: {
        540: "_mx540"
      }
    });

    $context.on("resize.block", function () {
      $productSlider.slick("slickGoTo", 0);
      $productSlider.slick("checkResponsive");
      $productSlider.slick("setPosition");
    });

    $(window).on("resize", function () {
      $productSlider.slick("slickGoTo", 0);
    });
  });
});
// Слайдер новостей
$(function () {
  $(".b-news-slider").livequery(function () {
    var $context = $(this);
    var $slider = $(".b-news-slider__slider", $context);
    var $prev = $(".b-news-slider__prev", $context);
    var $next = $(".b-news-slider__next", $context);

    $context.removeClass("_nojs");

    (function initSlider() {
      $slider.slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: $prev,
        nextArrow: $next,
        respondTo: "slider",
        infinite: false,
        draggable: false,
        responsive: [{
          breakpoint: 930,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1
          }
        }
        ]
      });
    })();

    $context.on("resize.block", function () {
      $slider.slick("checkResponsive");
      $slider.slick("setPosition");
    });

    $context.adaptBlock({
      maxWidth: {
        950: "_mx950"
      }
    });
  });
});
// Преимущества в цифрах
$(function () {
  $(".b-nums-features").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        650: "_mx650",
        380: "_mx380"
      }
    });
  });
});

// Окно консультанта
$(function () {
  $(".b-online-consult").livequery(function () {
    var $context = $(this);
    var $focusBtn = $(".js-focus", $context);
    var $uiItems = $(".b-online-consult__ui-items", $context);
  });
});

// comments
$(function () {
  // code here...
});

// comments
$(function () {
  // code here...
});

// comments
$(function () {
  // code here...
});

// Информация для заказов
$(function () {
  $(".b-order-info").livequery(function () {
    var $context = $(this);
    var $saveBtn = $(".b-order-info__save", $context);
    var $inputs = $("input", $context);
    var $status = $(".b-order-info__status", $context);
    var $form = $("form", $context);
    var $birthdayInput = $(".js-order-info-birthday", $context);
    var $birthdayDay = $(".js-birthday-day", $context);
    var $birthdayMonth = $(".js-birthday-mon", $context);
    var $birthdayYear = $(".js-birthday-year", $context);

    function saveChanges () {
      setBirthday();
      sendChangesToServer();
      $saveBtn.removeClass("_active");
      return false;
    }

    function setBirthday()
    {
      var day = parseInt($birthdayDay.val());
      var mon = parseInt($("option:selected",$birthdayMonth).val());
      var year = parseInt($birthdayYear.val());

      mon = mon > 9 ? mon : "0" + mon;

      if(day && mon && year)
        $birthdayInput.val(day+"."+mon+"."+year);
    }

    function parseBirthday()
    {
      var dayParts = $birthdayInput.val().split(".");
      $birthdayDay.val(dayParts[0]);
      $birthdayMonth.val(parseInt(dayParts[1]));
      $birthdayYear.val(dayParts[2]);
    }

    function sendChangesToServer() {
      $form.ajaxSubmit({
        success: function (res) {
          var statusText = $(".b-order-info__status", $(res));
          $status.html(statusText.html());
          $status.addClass("_active");
          setTimeout(function () {
            $status.removeClass("_active");
          }, 1500);
          console.log("good");
        },
        error: function () {
          console.log("bad");
        }
      });
    }


    $saveBtn.on("click", saveChanges);

    $inputs.on("change", function () {
      $saveBtn.addClass("_active");
    });

    parseBirthday();

    $context.adaptBlock({
      maxWidth: {
        890: "_mx890",
        630: "_mx630"
      }
    });
  });
});

// Содержимое заказа
$(function () {
  $(".b-order-item").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        780: "_mx780",
        590: "_mx590",
        479: "_mx479"
      }
    });
  });
});

// Получатель заказа
$(function () {
  $(".b-order-recipient").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        520: "_mx520"
      }
    });
  });
});

// Заверешние регистрации после оформления
$(function () {
  $(".b-order-registration").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        820: "_mx820",
        420: "_mx420"
      }
    });
  });
});

// Статус заказа
$(function () {
  $(".b-order-status").livequery(function () {
    var $context = $(this);
    var $submit = $(".b-order-status__submit", $context);
    var $main = $(".b-order-status__main", $context);
    var $result = $(".b-order-status__result", $context);

    $submit.on("click", function (e) {
      $main.removeClass("_active");
      $result.addClass("_active");
      e.preventDefault();
    });
  });
});


// comments
$(function () {
  // code here...
});

// Смена пароля
$(function () {
  $(".b-password-change").livequery(function () {
    var $context = $(this);
    var $eyeLinks = $(".b-password-change__eye", $context);
    var $inputs = $("input", $context);
    var $saveBtn = $(".b-password-change__save-btn", $context);
    var $form = $("form", $context);
    var $status = $(".b-password-change__status", $context);

    function changeInputType() {
      var $link = $(this);
      var $field = $link.closest(".b-password-change__field");
      var $input = $field.find("input");

      if ($input.attr("type") == "text") {
        $input.attr("type", "password");
        $link.removeClass("_open");
      } else {
        $input.attr("type", "text");
        $link.addClass("_open");
      }
    }

    function saveChanges() {
      if (!$saveBtn.hasClass("_active")) return false;

      sendChangesToServer();
      $saveBtn.removeClass("_active");
      return false;
    }

    function sendChangesToServer() {
      $form.ajaxSubmit({
        success: function () {
          $status.addClass("_active");
          setTimeout(function () {
            $status.removeClass("_active");
          }, 1500);
          console.log("good");
        },
        error: function () {
          console.log("bad");
        }
      });
    }

    $eyeLinks.on("click", changeInputType);
    // $saveBtn.on('click', saveChanges);

    $form.validate({
      ignore: "hidden",
      // rules: {
      // },
      highlight: function (element) {
        if ($(element).parent().hasClass("datepicker")) {
          $(element).parent().removeClass("success").addClass("error");
          $(element).removeClass("success").addClass("error");
        } else {
          $(element).removeClass("success").addClass("error");
        }
        //     $(element).closest('.form__field-row').removeClass('is-ok').addClass('has-error');
      },
      unhighlight: function (element) {
        if ($(element).parent().hasClass("datepicker")) {
          $(element).parent().removeClass("error").addClass("success");
          $(element).removeClass("error").addClass("success");
        } else {
          $(element).removeClass("error").addClass("success");
        }
      },
      onclick: function (element) {
        // click on selects, radiobuttons and checkboxes
        if (element.name in this.submitted) {
          this.element(element);

          // or option elements, check parent select in that case
        } else if (element.parentNode.name in this.submitted) {
          this.element(element.parentNode);
        }
      },
      submitHandler: function (form) {
        sendChangesToServer();
        $saveBtn.removeClass("_active");
      }
    });

    $inputs.on("change", function () {
      $saveBtn.addClass("_active");
    });

    $context.adaptBlock({
      maxWidth: {
        600: "_mx600"
      }
    });
  });
});
// comments
$(function () {
  $(".b-password-input").livequery(function () {
    var $context = $(this);
    var $eye = $(".b-password-input__eye", $context);
    var $input = $("input", $context);

    function changeInputType () {
      var $link = $(this);

      if($input.attr("type") == "text") {
        $input.attr("type", "password");
        $link.removeClass("_open");
      } else {
        $input.attr("type", "text");
        $link.addClass("_open");
      }
    }

    $eye.on("click", changeInputType);
  });
});

// comments
$(function () {
  // code here...
});

// Выбор способа оплаты
$(function () {
  $(".b-payment-choose").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        930: "_mx930",
        540: "_mx540"
      }
    });
  });
});

// Слайдер фотографий товара
$(function () {
  $(".b-photo-slider").livequery(function () {
    var $context = $(this);
    var $slider = $(".b-photo-slider__slider", $context);
    var $slides = $(".b-photo-slider__slide", $context);
    var $prev = $(".b-photo-slider__prev", $context);
    var $next = $(".b-photo-slider__next", $context);
    var slideQtty = $slides.length;
    var parentWidth;


    function buildPager(qttyToShow) {
      var $pagerHolder = $("<div class=\"b-photo-slider__pager-holder\"></div>");
      var $pagerList = $("<ul class=\"b-photo-slider__pager\"></div>");
      var $pagerItem = $("<li class=\"b-photo-slider__pager-item\"></li>");
      var $pagerLink = $("<span class=\"b-photo-slider__pager-link\"></span>");

      $pagerHolder.append($pagerList);
      $pagerItem.append($pagerLink);

      for (var i = 0; i < slideQtty; i++) {
        $pagerList.append($pagerItem.clone());
      }

      $context.append($pagerHolder);
      changePager(0, 3);
    }

    function changePager(nextSlideIndex, qttyToShow) {
      var endIndex = nextSlideIndex + qttyToShow;
      var $links = $(".b-photo-slider__pager-link", $context);
      var $targetLinks;
      var $tmp = $([]);

      $targetLinks = $links.slice(nextSlideIndex, endIndex);

      if (endIndex > ($links.length)) {
        $tmp = $links.slice(0, endIndex - $links.length);
      }

      $links.removeClass("_active");
      $targetLinks.addClass("_active");
      $tmp.addClass("_active");
    }

    function pagerLinksHandler() {
      var $link = $(this);
      var $item = $link.closest("li");
      var index = $item.index();

      $slider.slick("slickGoTo", index);
      return false;
    }

    $slider.on("init", function (event, slick) {
      buildPager();
    });


    $slider.on("beforeChange", function (event, slick, currentSlide, nextSlide) {
      changePager(nextSlide, $slider.slick("slickGetOption", "slidesToShow"));
    });

    $slider.slick({
      prevArrow: $prev,
      nextArrow: $next,
      respondTo: "slider",
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [{
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
      ]
    });

    $context.on("click", ".b-photo-slider__pager-link", pagerLinksHandler);
  });
});
// Точка самовывоза
$(function () {
  $(".b-pickpoint").livequery(function () {
    var $context = $(this);
    var $input = $(".b-pickpoint__radio-input", $context);

    function checkState(event, isOther) {
      if($input.prop("checked")) {
        $context.addClass("_checked");
      } else {
        $context.removeClass("_checked");
      }
      if(!isOther) $("[name=\""+ $input.attr("name") +"\"]").not($input).trigger("change", true);
    }

    checkState();
    $input.on("change", checkState);

    $context.adaptBlock({
      maxWidth: {
        530: "_mx530"
      }
    });
  });
});

// Точка получения заказа
$(function () {
  $(".b-pickpoint-confirm").livequery(function () {
    var $context = $(this);
    var $map = $(".b-ymap", $context);

    function equalize () {
      $context.css("height", "");
      setTimeout(function () {
        $context.css("height", $context.height());
      }, 300);
    }

    equalize();
    $(window).on("resize", equalize);
    $context.on("resize.block", function () {
      equalize();
    });

    $context.adaptBlock({
      maxWidth: {
        750: "_mx750"
      }
    });

  });
});

// Точка самовывоза
$(function () {
  $(".b-pickpoint-qiwi").livequery(function () {
    var $context = $(this);
    var $input = $(".b-pickpoint-qiwi__radio-input", $context);

    function checkState(event, isOther) {
      if($input.prop("checked")) {
        $context.addClass("_checked");
      } else {
        $context.removeClass("_checked");
      }
      if(!isOther) $("[name=\""+ $input.attr("name") +"\"]").not($input).trigger("change", true);
    }

    checkState();
    $input.on("change", checkState);

    $context.adaptBlock({
      maxWidth: {
        530: "_mx530"
      }
    });
  });
});



// Артикул товара
$(function () {
 
});
// comments
$(function () {
  // code here...
});

// Изображения в карточке товара
$(function () {
  
  var $slider = $(".b-product-images__slider");
  var $thumbs = $(".b-product-images__thumbs");
  var gallery = $('.b-product-images__slide-link');

  //при клике на ссылку в слайде запускаем галерею
  $('.b-product-images__slide-link').on('click', function (e) {
    e.preventDefault();
    //узнаём индекс слайда без учёта клонов
    var totalSlides = +$(this).parents('.slider').slick("getSlick").slideCount,
      dataIndex = +$(this).parents('.slide').data('slick-index'),
      trueIndex;
    switch (true) {
      case (dataIndex < 0):
        trueIndex = totalSlides + dataIndex;
        break;
      case (dataIndex >= totalSlides):
        trueIndex = dataIndex % totalSlides;
        break;
      default:
        trueIndex = dataIndex;
    }
    //вызывается элемент галереи, соответствующий индексу слайда
    $.fancybox.open(gallery, {}, trueIndex);
    return false;
  });

  $slider.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: false,
    speed: 400,
    fade: true,
    asNavFor: $thumbs,
    prevArrow: '<button type="button" class="slick-arrow slick-prev"><svg width="50" height="60" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M27.5 45L12.5 30L27.5 15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg></button>',
    nextArrow: '<button type="button" class="slick-arrow slick-next"><svg width="50" height="60" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22.5 45L37.5 30L22.5 15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg></button>',
    responsive: [
      {
        breakpoint: 767,
        settings: {
          arrows: true
        }
      }
    ]
  });
  $thumbs.slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: $slider,
    arrows: false,
    dots: false,
    centerMode: true,
    centerPadding: 0,
    vertical: true,
    verticalSwiping: true,
    infinite: false,
    focusOnSelect: true,
    swipeToSlide: true,
    prevArrow: '<button type="button" class="slick-arrow slick-prev"><svg width="50" height="60" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M27.5 45L12.5 30L27.5 15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg></button>',
    nextArrow: '<button type="button" class="slick-arrow slick-next"><svg width="50" height="60" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22.5 45L37.5 30L22.5 15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg></button>',
    responsive: [
      {
        breakpoint: 767,
        settings: 'unslick'
      }
    ]
  });
  /*
  $(".b-product-images").livequery(function () {
    var $context = $(this);
    var $thumbs = $(".b-product-images__thumb", $context);
    var $thumbLinks = $(".b-product-images__thumb-link", $context);
    var $slider = $(".b-product-images__slider", $context);
    var $prev = $(".b-product-images__prev", $context);
    var $next = $(".b-product-images__next", $context);
    var $thumb = $(".b-product-images__thumbs", $context);

    $context.removeClass("_nojs");

    //Слайдер
    function initSlider() {
      $slider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: $prev,
        nextArrow: $next,
        adaptiveHeight: true,
        speed: 400,
        fade: true,
        asNavFor: $thumb
      });

      $thumbs.slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: $slider,
        dots: false,
        centerMode: true,
        centerPadding: 0,
        vertical: true,
        verticalSwiping: true,
        infinite: false,
        focusOnSelect: true
      });
    }

    initSlider();

    //$thumbLinks.on('click', changeMainImage);

    $context.on("resize.block", function () {
      $slider.slick("setPosition");
    });

    $context.adaptBlock({
      maxWidth: {
        540: "_mx540",
        420: "_mx420"
      }
    });
  });
  */
});
// Ссылки на содержимое карточки продукта
$(function () {
  $(".b-product-links").livequery(function () {
    var $context = $(this);
    var $links = $(".b-product-links__link", $context);

    function slowScroll (e) {
      var $this = $(this);
      var $target = $($this.attr("href"));

      if($target.length == 0) return;

      $("body").animate({
        scrollTop: ($target.offset().top - 80)
      }, 300);

      e.preventDefault();
    }

    $links.on("click", slowScroll);

    $context.adaptBlock({
      maxWidth: {
        720: "_mx720"
      }
    });
  });
});

// Выбор опций товара(цвет, форма, размер и т.д)
$(function () {
 
});
// Параметры продукта
$(function () {
  $(".b-product-params").livequery(function () {
    var $context = $(this);
    var $sectionCaptions = $(".b-product-params__section-caption", $context);
    var $sectionContainers = $(".b-product-params__section-holder", $context);

    function toggleSection() {
      var $caption = $(this);
      var $container = $caption.next();

      $container.slideToggle(400);

      $caption.toggleClass("b-product-params__section-caption_active");
      $container.toggleClass("b-product-params__section-holder_active");
    }

    $context.adaptBlock({
      maxWidth: {
      }
    });

    $sectionContainers.filter(":not(.b-product-params__section-holder_active)").slideUp(0);
    $sectionCaptions.on("click", toggleSection);
  });
});

// Быстрый просмотр
$(function () {
  $(".b-product-preview").livequery(function() {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        1100: "_mx1100",
        850: "_mx850",
        600: "_mx600"
      }
    });
  });
});

// Стоимость в карточке товара
$(function () {
  $(".b-product-price").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        480: "_mx480",
        380: "_mx380"
      }
    });
  });
});

// Обзор продукта
$(function () {
  $(".b-product-review").livequery(function () {
    var $context = $(this);
    var $moreBtn = $(".b-product-review__more", $context);
    var $moreHolder = $(".b-product-review__more-holder", $context);
    var $moreText = $(".b-product-review__full-text", $context);

    function showMore () {
      $moreText.slideDown(400);
      $moreHolder.addClass("_more-open");
      $moreText.addClass("_more-open");
      return false;
    }

    $moreBtn.on("click", showMore);

    $context.adaptBlock({
      maxWidth: {
        930: "_mx930"
      }
    });
  });
});

// Понравился товар?
$(function () {
  $(".b-product-share").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        860: "_mx860",
        560: "_mx560"
      }
    });
  });
});

// Слайдер продуктов
$(function () {
  $(".b-product-slider").livequery(function () {
    var $context = $(this);
    var $slider = $(".b-product-slider__slider", $context);
    var $prev = $(".b-product-slider__prev", $context);
    var $next = $(".b-product-slider__next", $context);

    $context.removeClass("_nojs");

    (function initSlider() {
      $slider.on("reInit", function () {
        $(".iblock", $slider).trigger("resize.block");
      });

      $slider.slick({
        slidesToShow: 4,
        slidesToScroll: 2,
        prevArrow: $prev,
        nextArrow: $next,
        respondTo: "slider",
        infinite: false,
        responsive: [{
          breakpoint: 950,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 730,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 555,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        ]
      });
    })();

    $context.on("resize.block", function () {
      $slider.slick("checkResponsive");
      $slider.slick("setPosition");
    });

    $context.adaptBlock({
      maxWidth: {
        950: "_mx950"
      }
    });
  });
});
$(function (){
  function remove() {
    var hoverContent = $(".b-product-small__hover-content");
    hoverContent.find(".b-product-small__add-btn").removeClass("pointer-event-auto");
    hoverContent.find(".b-product-small__favor").removeClass("pointer-event-auto");
    hoverContent.find(".b-product-small__compare").removeClass("pointer-event-auto");
  }

  $(document).on("click", function(event) {
    var target = $( event.target );
    var hoverContent = $(".b-product-small__hover-content");
    var hoverContentChildren = $(".b-product-small__hover-content").children();

    if(target.is(hoverContent) || target.is(hoverContentChildren)) {
      remove();
      target.find(".b-product-small__add-btn").addClass("pointer-event-auto");
      target.find(".b-product-small__compare").addClass("pointer-event-auto");
      target.find(".b-product-small__favor").addClass("pointer-event-auto");
    }

    else if(target.is(":not(.b-product-small__hover-content)")) {
      remove();
    }
  });  
});
// Статус наличия товара
$(function () {
 
});
// Промослайдер
$(function () {
  $(".b-promo-block3-slider").livequery(function () {
    var $context = $(this);
    var $slider = $(".b-promo-block3-slider__slider", $context);

    console.log($slider);

    $context.removeClass("_nojs");

    $slider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      draggable: false,
      dots: true,
      fade: true,
      autoplay: true,
      autoplaySpeed: 8000
    });

    $context.adaptBlock({
      maxWidth: {

      }
    });

    $context.on("resize.block", function () {
      $slider.slick("setPosition");
    });
  });
});
// Промослайдер
$(function () {
  $(".b-promo-slider").livequery(function () {
    var $context = $(this);
    var $slider = $(".b-promo-slider__slider", $context);

    $context.removeClass("_nojs");

    $slider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      fade: true
    });

    $context.adaptBlock({
      maxWidth: {
        930: "_mx930",
        660: "_mx660",
        360: "_mx360"
      }
    });

    $context.on("resize.block", function () {
      $slider.slick("setPosition");
    });
  });
});

// Промоблок 1
$(function () {
  $(".c-promo__timer").livequery(function () {
    var $context = $(this);
    var $timer = $(".b-promo-timer__timer", $context);
    var $dateTo = $timer.data("date");
    var $timerHrs = $(".b-promo-timer__hours", $context);
    var $timerMin = $(".b-promo-timer__mins", $context);
    var $timerSec = $(".b-promo-timer__seconds", $context);


    function runTimer() {
      window.setInterval(function () {
        requestAnimFrame(function () {
          var c = new Date();
          var  d = new Date($dateTo);
          var diff = new Date(d - c);
          var timeDiff = Math.abs(d.getTime() - c.getTime());
          var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
          var hrs = parseInt(diff.getHours());
          var min = diff.getMinutes();
          var sec = diff.getSeconds();

          if(diffDays > 0)
            hrs = parseInt(hrs) + (parseInt(diffDays)*24);

          if(hrs < 10) hrs = "0" + hrs;
          if(min < 10) min = "0" + min;
          if(sec < 10) sec = "0" + sec;

          $timerHrs.html("<span class='b-promo-timer__value'>"+hrs+"</span><span class='b-promo-timer__label'>"+GetNoun(hrs, "час", "часа", "часов")+"</span>");
          $timerMin.html("<span class='b-promo-timer__value'>"+min+"</span><span class='b-promo-timer__label'>мин</span>");
          $timerSec.html("<span class='b-promo-timer__value'>"+sec+"</span><span class='b-promo-timer__label'>сек</span>");
        });
      }, 1000);
    }

    runTimer();
    $context.adaptBlock({
      maxWidth: {
        780: "_mx780",
        700: "_mx700"
      }
    });
  });
});
// Публичный профиль
$(function () {
  $(".b-public-profile").livequery(function () {
    var $context = $(this);
    var $photoChanger = $(".b-public-profile__change-input", $context);
    var $photoImg = $(".b-public-profile__photo-img", $context);

    function changePhoto() {
      if ($(this).val() == "") return;

      var FR = new FileReader();

      FR.onload = function (event) {
        var contents = event.target.result;
        $photoImg.attr("src", contents);
      };

      FR.readAsDataURL($photoChanger.get(0).files[0]);
    }

    $photoChanger.on("change", changePhoto);
  });
});

$(function () {
  $(".b-public-profile").livequery(function () {
    var $context = $(this);
    var $saveBtn = $(".b-public-profile__save", $context);
    var $inputs = $("input", $context);
    var $status = $(".b-public-profile__status", $context);
    var $form = $("form", $context);

    function saveChanges() {
      sendChangesToServer();
      $saveBtn.removeClass("_active");
      return false;
    }

    function sendChangesToServer() {
      $form.ajaxSubmit({
        success: function () {
          $status.addClass("_active");
          setTimeout(function () {
            $status.removeClass("_active");
          }, 1500);
          console.log("good");
        },
        error: function () {
          console.log("bad");
        }
      });
    }
    $saveBtn.on("click", saveChanges);
    $inputs.on("change", function () {
      $saveBtn.addClass("_active");
    });
    $context.adaptBlock({
      maxWidth: {
        890: "_mx890",
        630: "_mx630"
      }
    });
  });
});
// comments
$(function () {
  // code here...
});

// comments
$(function () {
  // code here...
});

// Список чекбоксов
$(function () {
  $(".b-radio-cols").livequery(function () {
    var $context = $(this);
    var $moreBtn = $(".b-radio-cols__btn", $context);
    var $moreContainer = $(".b-radio-cols__more-container", $context);

    function toggleMoreContainer() {
      $moreBtn.toggleClass("b-radio-cols__btn_opened");
      $moreContainer.toggleClass("b-radio-cols__more-container_opened");
      return false;
    }

    $moreBtn.on("click", toggleMoreContainer);
  });
});

// Рейтинг отображаемый
$(function () {
  $(".b-rating").livequery(function () {
    var $context = $(this);
    var $items = $(".b-rating__item", $context);

    function changeState(val) {
      $items.removeClass("b-rating__item_active");
      $items.slice(0, val).addClass("b-rating__item_active");
    }

    $context.on("change-val.block", function (event, val) {
      changeState(val);
    });
  });
});

// Выбор рейтинга
$(function () {
  $(".b-rating-form").livequery(function () {
    var $context = $(this);
    var $items = $(".b-rating-form__item", $context);
    var $input = $(".b-rating-form__input input", $context);

    function changeValueByClick () {
      var $currItem = $(this);
      var index = $items.index($currItem);
      var value = 5 - index;

      $input.val(value);

      $items.removeClass("b-rating-form__item_active");
      $currItem.find("~ .b-rating-form__item").addClass("b-rating-form__item_active");
      $currItem.addClass("b-rating-form__item_active");
    }

    function changeValueByInput () {
      var value = parseFloat($input.val());
      changeValueByClick.apply($items.eq(5 - value));
    }

    changeValueByInput();

    $items.on("click", changeValueByClick);
    $input.on("change.block", changeValueByInput);
  });
});

// Попап регистрации
$(function () {
  $(".b-registration-modal").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        610: "_mx610",
        450: "_mx450"
      }
    });
  });
});

// Строка поиска
$(function () {
  $(".b-search-line").livequery(function () {
    var $context = $(this);
    var $placeholder = $(".b-search-line__placeholder", $context);
    var $field = $(".b-search-line__field", $context);
    var $input = $("input[type=\"text\"]", $context);

    $placeholder.on("click", function () {
      $(this)
        .closest(".b-search-line__field")
        .find("input[type=\"text\"]")
        .focus();
    });

    $input.blur(function () {
      if ($(this).val() != "") {
        $(this).closest(".b-search-line__field").addClass("_filled");
      } else {
        $(this).closest(".b-search-line__field").removeClass("_filled");

      }
    });
  });
});

$(function () {
  $(document).on("click", function (e) {
    var targ = $(e.target);
    var className = $(".b-search-line__field-drop");

    if (targ.is(".b-search-line__input")) {
      className.addClass("b-search-line__field-drop__active");
    } else if (targ.is(".b-search-line__ph-pre")) {
      className.addClass("b-search-line__field-drop__active");
    } else if (targ.is(".b-search-line__ph-main")) {
      className.addClass("b-search-line__field-drop__active");
    } else if (targ.is(".b-search-line__placeholder")) {
      className.addClass("b-search-line__field-drop__active");
    } else {
      className.removeClass("b-search-line__field-drop__active");
    }
  });
});
// Слайдер результатов поиска
$(function () {
  $(".b-search-slider").each(function () {
    var $context = $(this);
    var $slider = $(".b-search-slider__slider", $context);
    var $prev = $(".b-search-slider__prev", $context);
    var $next = $(".b-search-slider__next", $context);
    var $items = $(".b-search-slider__item", $context);

    (function initSlider() {
      $slider.slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        prevArrow: $prev,
        nextArrow: $next,
        respondTo: "slider",
        responsive: [{
          breakpoint: 900,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 470,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
        ]
      });
    })();

    $context.on("resize.block", function () {
      $slider.slick("checkResponsive");
      $slider.slick("setPosition");
    });
  });
});
// Карточка магазина
$(function () {
  $(".b-shop-card").livequery(function () {
    var $context = $(this);
    var $tabLinks = $(".b-shop-card__way-link", $context);
    var $tabContainers = $(".b-shop-card__way-tab", $context);

    function changeTab () {
      var $link = $(this);
      var index = $tabLinks.index($link);

      if($link.hasClass("_active")) return false;

      $tabLinks.removeClass("_active");
      $tabContainers.removeClass("_active");
      $link.addClass("_active");
      $tabContainers.eq(index).addClass("_active");

      return false;
    }

    $tabLinks.on("click", changeTab);

    $context.adaptBlock({
      maxWidth: {
        700: "_mx700",
        625: "_mx625",
        570: "_mx570",
        450: "_mx450"
      }
    });
  });
});

$(".shop-slider").slick({
  slidesToShow: 1,
  asNavFor: ".shop-slider-nav",
  fade: true,
  slidesToScroll: 1,
  arrows: true,
  dota: false,
  infinite: true,
  responsive: [{
    breakpoint: 767,
    settings: {
      arrows: false
    }
  }]
});

$(".shop-slider-nav").slick({
  slidesToShow: 6,
  asNavFor: ".shop-slider",
  arrows: false,
  //centerMode: true,
  slidesToScroll: 1,
  focusOnSelect: true,
  dota: false,
  infinite: true,
  responsive: [{
    breakpoint: 767,
    settings: {
      slidesToShow: 3
    },        
  }]

});

// comments
$(function () {
  // code here...
});

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

// Простые формы
$(function () {
  $(".b-simple-form").livequery(function () {
    var $context = $(this);
  });
});

// Слайдер продуктов
$(function () {
  $(".b-small-product-slider").livequery(function () {
    var $context = $(this);
    var $slider = $(".b-small-product-slider__slider", $context);
    var $prev = $(".b-small-product-slider__prev", $context);
    var $next = $(".b-small-product-slider__next", $context);

    $context.removeClass("_nojs");

    $slider.slick({
      slidesToShow: 4,
      slidesToScroll: 2,
      prevArrow: $prev,
      nextArrow: $next,
      respondTo: "slider",
      infinite: false,
      responsive: [{
        breakpoint: 1070,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 790,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      ]
    });

    $context.on("resize.block", function () {
      $slider.slick("checkResponsive");
      $slider.slick("setPosition");
    });

    $context.on("reinit.block", function () {
      $slider.slick("unslick");
      $("[role=\"option\"]", $context).remove();
      $slider.slick({
        slidesToShow: 4,
        slidesToScroll: 2,
        prevArrow: $prev,
        nextArrow: $next,
        respondTo: "slider",
        infinite: false,
        responsive: [{
          breakpoint: 1070,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 790,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 560,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        ]
      });
    });


    $context.adaptBlock({
      maxWidth: {
        950: "_mx950",
        700: "_mx700",
        400: "_mx400"
      }
    });
  });
});
// Фильтр товаров каталога
$(function () {
  $(".b-smart-filter").livequery(function () {
    var $context = $(this);
    var $paramLinks = $(".b-smart-filter__params-name", $context);

    $context.removeClass("_nojs");

    function toggleParams() {
      var $item = $(this).closest(".b-smart-filter__params-item");
      var $container = $(".b-smart-filter__params-holder", $item);
      $item.toggleClass("_opened");
      $container.slideToggle(400);
      return false;
    }

    function slideUp() {
      $(".b-smart-filter__params-item:not(._opened) .b-smart-filter__params-holder", $context).slideUp(0);
    }

    slideUp();
    $paramLinks.on("click", toggleParams);
  });
});

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

// comments
$(function () {
  // code here...
});

// Информация о наличии товара
$(function () {
  $(".b-stock-info").livequery(function () {
    var $context = $(this);
    var $titles = $(".b-stock-info__title", $context);
    var $containers = $(".b-stock-info__container", $context);

    function toggleContainer () {
      var $this = $(this);
      var $container = $this.siblings(".b-stock-info__container");

      $titles.not($this).removeClass("_open");
      $containers.not($container).slideUp(400);
      $this.toggleClass("_open");
      $container.slideToggle(400);
    }

    $(".b-stock-info__container:not(._open)", $context).slideUp(0);

    $titles.on("click", toggleContainer);

    $context.adaptBlock({
      maxWidth: {
        470: "_mx470"
      }
    });
  });
});

// comments
$(function () {
  // code here...
});

// Плиток категорий товаров
$(function () {
  $(".b-subcategory-plates").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        740: "_mx740",
        465: "_mx465",
        400: "_mx400"
      }
    });
  });
});

// Промослайдер
$(function () {
  $(".b-subcategory-slider").livequery(function () {
    var $context = $(this);
    var $slider = $(".b-subcategory-slider__slider", $context);

    $context.removeClass("_nojs");

    $slider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      draggable: false,
      dots: true,
      fade: true,
      autoplay: true,
      autoplaySpeed: 5000
    });

    $context.adaptBlock({
      maxWidth: {

      }
    });

    $context.on("resize.block", function () {
      $slider.slick("setPosition");
    });
  });
});

// Строка поиска
$(function () {
  $(".b-search-line").livequery(function () {
    var $context = $(this);
    var $placeholder = $(".b-search-line__placeholder", $context);
    var $field = $(".b-search-line__field", $context);
    var $input = $("input[type=\"text\"]", $context);

    $placeholder.on("click", function () {
      $(this)
        .closest(".b-search-line__field")
        .find("input[type=\"text\"]")
        .focus();
    });

    $input.blur(function () {
      if($(this).val() != "") {
        $(this).closest(".b-search-line__field").addClass("_filled");
      } else {
        $(this).closest(".b-search-line__field").removeClass("_filled");

      }
    });
  });
});

// Ссылки на содержимое карточки продукта
$(function () {
  $(".b-tabs").livequery(function () {
    var $context = $(this);
    var $tabs = $(".b-tabs__col", $context);
    var $tabHolders = $(".b-tabs__holder", $context);
    var collapseWidth = $context.data("collapse") || 300;

    var adaptParams = {
      maxWidth: {},
      minWidth: {}
    };

    function changeTab () {
      var $item = $(this);
      var $link = $(".b-tabs__link", $item);
      var index = $tabs.index($item);

      if($item.hasClass("b-tabs__col_active") || $link.hasClass("_disabled")) return false;

      $tabs.removeClass("b-tabs__col_active");
      $item.addClass("b-tabs__col_active");
      $tabHolders.removeClass("b-tabs__holder_active");
      $tabHolders.eq(index).addClass("b-tabs__holder_active");

      $("*", $tabHolders.eq(index)).trigger("resize.block");

      return false;
    }

    $tabs.on("click", changeTab);

    adaptParams.maxWidth[collapseWidth] = "_collapsed";

    $context.adaptBlock(adaptParams);
  });
});

// comments
$(function () {
  // code here...
});

// comments
$(function () {
  // code here...
});

// comments
$(function () {
  // code here...
});

// Продукт с отзывом
$(function () {
  $(".b-top-product").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        470: "_mx470"
      }
    });
  });
});

// Слайдер топовых продуктов
$(function () {
  $(".b-top-product-slider").livequery(function () {
    var $context = $(this);
    var $slider = $(".b-top-product-slider__slider", $context);
    var $prev = $(".b-top-product-slider__prev", $context);
    var $next = $(".b-top-product-slider__next", $context);

    $context.removeClass("_nojs");

    $slider.slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      prevArrow: $prev,
      nextArrow: $next,
      respondTo: "slider",
      infinite: false,
      responsive: [{
        breakpoint: 614,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
    });

    $context.on("resize.block", function () {
      $slider.slick("checkResponsive");
      $slider.slick("setPosition");
    });
  });
});
// Баннер о доставке в ваш город
$(function () {
  $(".b-town-delivery").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        400: "_mx400",
        290: "_mx290"
      }
    });
  });
});

// Стоимость набора конфигуратора
$(function () {
  $(".b-total").livequery(function() {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        540: "_mx540",
        440: "_mx440",
        375: "_mx375"
      },
      minWidth: {
        460: "_mn460"
      }
    });
  });
});

// Форма выбора города
$(function () {
  $(".b-town-modal").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        450: "_mx450"
      }
    });
  });
});

// Выбор города
$(function () {
  $(".b-town-select").livequery(function () {
    var $context = $(this);

  });
});

//
$(function () {
  $(".b-upload-input").each(function () {
    var $context = $(this);
    var $input = $("input[type=\"file\"]", $context);
    var $form = $input.closest("form");

    $input.on("change", function () {
      var fullPath = $input.val();
      if (fullPath) {
        var startIndex = (fullPath.indexOf("\\") >= 0 ? fullPath.lastIndexOf("\\") : fullPath.lastIndexOf("/"));
        var filename = fullPath.substring(startIndex);
        if (filename.indexOf("\\") === 0 || filename.indexOf("/") === 0) {
          filename = filename.substring(1);
        }

        $context.addClass("is-active");
        $context.prepend("<p class=\"b-upload-input__filename\">" + fullPath + "</p>");

        if ($form.hasClass("b-feedback-vacancy-form") && $form.validate().checkForm()) { // checks form for validity
          $form.find("[type=\"submit\"]").prop("disabled", false);
          $form.find("[name=\"save\"]").prop("disabled", false);
        } else {
          $form.find("[type=\"submit\"]").prop("disabled", true);
          $form.find("[name=\"save\"]").prop("disabled", true);
        }

        $(".b-upload-input__remove").on("click", function() {
          $(".b-upload-input__filename").remove();
          $context.removeClass("is-active");
          $input.val("");

          $form.find("[type=\"submit\"]").prop("disabled", true);
          $form.find("[name=\"save\"]").prop("disabled", true);
        });
      }
    });
  });
});

$(function() {
  $.validator.addMethod("email", function(value, element) { 
    return this.optional(element) || /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
  }, "Пожалуйста, введите корректный адрес электронной почты");

  $.validator.addMethod("phone", function(value, element) {
    var phoneNumber = value.replace(/\s+/g, "");
    return this.optional(element) || phoneNumber.length > 9 &&
            phoneNumber.match(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/);
  }, "Пожалуйста, укажите правильный номер телефона");

  $.validator.addMethod("coupon", function(value, element) {
    return this.optional(element) || /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
  }, "Ошибка! Купон не найден или истек его срок использования"); 

  $.validator.addMethod("bic", function(value, element) {
    return this.optional( element ) || (/^\d{9}$/.test(value ));
  }, "БИК состоит из 9 цифровых символов");    

  $.validator.addMethod("inn", function(value, element) {
    return this.optional(element) ||(/^\d{10,12}$/.test(value));
  }, "ИНН не менее 10 символов"); 

  $.validator.addMethod("kpp", function(value, element) {
    return this.optional(element) ||(/^\d{9}$/.test(value));
  }, "КПП 9 символов");

  $.validator.addMethod("rs", function(value, element) {
    return this.optional( element ) || (/^\d{20}$/.test(value));
  }, "Номер счета состоит из 20 цифровых символов"); 

  $("form[data-validate=\"Y\"]").each(function (index, el) {
    if ($(el).data("is-custom-valid") !== "Y") {
      $(el).validate({
        ignore: "hidden",
        // rules: {
        // },
        highlight: function (element) {
          if($(element).parent().hasClass("datepicker")) {
            $(element).parent().removeClass("success").addClass("error");
            $(element).removeClass("success").addClass("error");
          } else {
            $(element).removeClass("success").addClass("error");
          }

          if ($(element).hasClass("coupon")) {
            $(element).parent().find("#coupon-success").detach();
          } 
                  
          //     $(element).closest('.form__field-row').removeClass('is-ok').addClass('has-error');
        },
        unhighlight: function (element) {
          if($(element).parent().hasClass("datepicker")) {
            $(element).parent().removeClass("error").addClass("success");
            $(element).removeClass("error").addClass("success");
          } else {
            $(element).removeClass("error").addClass("success");
          }

          if ($(element).hasClass("coupon")) {
            if(!$(element).parent().find("#coupon-success").length) {
              $(element).parent().append("<label style= \"display: block; margin-top: color: #61a616\" id=\"coupon-success\">Спасибо, купон применен! </label>");
            }
          } 
        },
        onclick: function (element) {
          // click on selects, radiobuttons and checkboxes
          if (element.name in this.submitted) {
            this.element(element);

            // or option elements, check parent select in that case
          } else if (element.parentNode.name in this.submitted) {
            this.element(element.parentNode);
          }
        },
      });
    }
  });

  $("form.b-feedback-vacancy-form").validate({
    ignore: "hidden",
    // rules: {
    // },
    highlight: function (element) {
      if($(element).parent().hasClass("datepicker")) {
        $(element).parent().removeClass("success").addClass("error");
        $(element).removeClass("success").addClass("error");
      } else {
        $(element).removeClass("success").addClass("error");
      }
      //     $(element).closest('.form__field-row').removeClass('is-ok').addClass('has-error');
    },
    unhighlight: function (element) {
      if($(element).parent().hasClass("datepicker")) {
        $(element).parent().removeClass("error").addClass("success");
        $(element).removeClass("error").addClass("success");
      } else {
        $(element).removeClass("error").addClass("success");
      }
    },
    onkeyup: function( element, event ) {
      const isValid = this.checkForm();

      if (isValid) { // checks form for validity
        $("form.b-feedback-vacancy-form").find("[type=\"submit\"]").prop("disabled", false);
        $("form.b-feedback-vacancy-form").find("[name=\"save\"]").prop("disabled", false);
      } else {
        $("form.b-feedback-vacancy-form").find("[type=\"submit\"]").prop("disabled", true);
        $("form.b-feedback-vacancy-form").find("[name=\"save\"]").prop("disabled", true);
      }
    },
    onclick: function( element ) {
      // click on selects, radiobuttons and checkboxes
      if (element.name in this.submitted) {
        this.element(element);

        // or option elements, check parent select in that case
      } else if (element.parentNode.name in this.submitted) {
        this.element(element.parentNode);
      }

      const isValid = this.checkForm();

      if (isValid) { // checks form for validity
        $("form.b-feedback-vacancy-form").find("[type=\"submit\"]").prop("disabled", false);
        $("form.b-feedback-vacancy-form").find("[name=\"save\"]").prop("disabled", false);
      } else {
        $("form.b-feedback-vacancy-form").find("[type=\"submit\"]").prop("disabled", true);
        $("form.b-feedback-vacancy-form").find("[name=\"save\"]").prop("disabled", true);
      }
    }
  });
});

//для валидации чекбоксов (сделано через input[type=text])
$(".js-modal").on("click", function(){
  var a = $(".b-checkbox");
  var b = $(".checkbox-vadidator");

  if(a.hasClass("_checked")) {
    b.val("true");
  } else {
    b.val("");
  }
}); 

$(".b-checkbox").on("click", function(){
  var a = $(".b-checkbox");
  var b = $(".checkbox-vadidator");

  if(a.hasClass("_checked")) {
    b.val("");
  } else {
    b.val("true");
  }
});
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

$(function () {
  $(".b-ymap").livequery(function () {
    var $context = $(this);
    var $mapHolder = $(".b-ymap__map", $context);
    var $marks = $(".b-ymap__point", $context);
    var map;
    var placemarks = [];

    // Шаблонизация https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Template-docpage
    // Если будут использоваться внешние данные, то необходимо обойти использование |raw, иначе возможен XSS. Нужен в основном для типографики.
    var defaultBalloonTemplate =
      "<div class=\"b-ymap__balloon-inner\">" +
        "<div class=\"b-ymap__balloon-header\">" +
          "<div class=\"b-ymap__balloon__close\"></div>" +
          "<div class=\"b-ymap__balloon-address\">{{properties.address|raw}}</div>" +
        "</div>" +
        "<div class=\"b-ymap__balloon-content\">" +
          "<div class=\"b-ymap__balloon-phone\">{{properties.phone|raw}}</div>" +
          "<div class=\"b-ymap__balloon-hours\">{{properties.hours|raw}}</div>" +
          "{% if !properties.details %}" +
            "<a href=\"{{properties.link|raw}}\" class=\"b-ymap__balloon-details button js-shop-info\">Подробнее</a>" +
          "{% endif %}" +
        "</div>" +
      "</div>";

    var defaultLayoutTemplate =
      "<div class=\"b-ymap__balloon-outer\">" +
        "<div class=\"b-ymap__balloon-outer-holder\">" +
        "$[[options.contentLayout]]" +
        "</div>" +
      "</div>";

    var defaultMarkTemplate =
      "<div class=\"b-ymap__placemark\">" +
        "<div class=\"b-ymap__placemark-round\"></div>" +
        "<div class=\"b-ymap__placemark-text\">" +
        "{{ properties.iconContent }}" +
        "</div>" +
      "</div>";

    // Основные функции
    function createMap() {
      map = new ymaps.Map($mapHolder.get(0), {
        center: $mapHolder.data("center").split(","),
        zoom: 15,
        controls: ["default"]
      });

      map.behaviors.disable("scrollZoom");
    }

    function setPlacemark(mark) {
      var placemark;

      placemark = new ymaps.Placemark(
        [parseFloat(mark.coords[0]), parseFloat(mark.coords[1])],
        $.extend({
          address: mark.address,
          phone: mark.phone,
          hours: mark.hours,
          link: mark.link,
          iconContent: mark.type,
          details: mark.details
        }, mark.data), {
          // Изображение метки
          iconLayout: markTemplateing(mark.markTemplate),
          iconShape: {
            type: "Rectangle",
            coordinates: [
              [0, -46],
              [178, 0]
            ]
          },
          hideIconOnBalloonOpen: true,

          // Свойства балуна
          balloonShadow: false,
          balloonContentLayout: balloonInnerTemplating(mark.balloonTemplate),
          balloonLayout: balloonLayoutTemplating(mark.balloonLayout, mark.buildCallback),
          balloonPanelMaxMapArea: 0
        }
      );

      placemarks.push(placemark);
      map.geoObjects.add(placemark);
    }

    function resetPlacemarks() {
      for (var i = 0; i < placemarks.length; i++) {
        map.geoObjects.remove(placemarks[i]);
      }
    }

    function defaultPlacemarking($marks) {
      $marks.each(function () {
        var $this = $(this);

        setPlacemark({
          address: $(".b-ymap__point-address", $this).html(),
          phone: $(".b-ymap__point-phone", $this).html(),
          hours: $(".b-ymap__point-hours", $this).html(),
          type: $(".b-ymap__point-type", $this).html(),
          coords: $this.data("coords").split(","),
          details: ($this.data("no-detail") !== undefined),
          link: $this.data("link") || "/"
        });
      });
    }

    function mappingInit() {
      createMap();
      if ($marks.length > 0) defaultPlacemarking($marks);
      $context.triggerHandler("mapReady.block"); // without bubble up
    }

    // Шаблонизаторы
    function balloonInnerTemplating(balloonTemplate) {
      var _balloonTemplate = balloonTemplate || defaultBalloonTemplate;
      return ymaps.templateLayoutFactory.createClass(_balloonTemplate);
    }

    function markTemplateing(markTemplate) {
      var _markTemplate = markTemplate || defaultMarkTemplate;
      return ymaps.templateLayoutFactory.createClass(_markTemplate);
    }

    function balloonLayoutTemplating(layoutTemplate, buildCallback) {
      var _layoutTemplate = layoutTemplate || defaultLayoutTemplate;

      var balloonHolder = ymaps.templateLayoutFactory.createClass(_layoutTemplate, {
        build: function () {
          this.constructor.superclass.build.call(this);

          this._$element = $(".b-ymap__balloon-outer", this.getParentElement());

          // $('body').on('click', $.proxy(this.closeOnBlur, this));

          if (buildCallback !== undefined) buildCallback.apply(this);

          this.applyElementOffset();

          this._$element.find(".b-ymap__balloon__close")
            .on("click", $.proxy(this.onCloseClick, this));
        },

        clear: function () {
          $("body").off("click", this.closeOnBlur);
          this.constructor.superclass.clear.call(this);
        },

        onSublayoutSizeChange: function () {
          MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

          if (!this._isElement(this._$element)) {
            return;
          }

          this.applyElementOffset();

          this.events.fire("shapechange");
        },

        applyElementOffset: function () {
          this._$element.css({
            left: -(this._$element[0].offsetWidth / 2),
            top: -(this._$element[0].offsetHeight)
          });
        },

        closeOnBlur: function (e) {
          var $target = $(e.target);
          if ($target.is(this._$element) || $target.closest(this._$element).length) {
            return true;
          } else {
            this.events.fire("userclose");
          }
        },

        getShape: function () {
          if (!this._isElement(this._$element)) {
            return MyBalloonLayout.superclass.getShape.call(this);
          }

          var position = this._$element.position();

          return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
            [position.left, position.top],
            [
              position.left + this._$element[0].offsetWidth,
              position.top + this._$element[0].offsetHeight
            ]
          ]));
        },

        onCloseClick: function (e) {
          e.preventDefault();
          this.events.fire("userclose");
        },

        _isElement: function (element) {
          return element && element[0];
        }
      });

      return balloonHolder;
    }


    // ymapAPIready глобальная переменная, true если был загужен api карт, иначе ждем события загрузки апи.
    if (ymapAPIready) {
      mappingInit();
    } else {
      $(document).on("ymapAPIready", mappingInit);
    }

    // API блока
    $context.on("resize.block", function (event) {
      setTimeout(function () {
        if (map != undefined) map.container.fitToViewport(true);
      }, 200);
      event.stopPropagation();
    });

    $context.on("setPlacemark.block", function (event, mark) {
      setPlacemark(mark);
      event.stopPropagation();
    });

    $context.on("resetPlacemarks.block", function (event, mark) {
      resetPlacemarks();
      event.stopPropagation();
    });

    $context.on("setCenter.block", function (event, center, zoom) {
      map.setCenter(center, zoom, {
        duration: 600
      });
      event.stopPropagation();
    });

    $context.on("destroy.block", function () {
      if (map !== undefined) map.destroy();
      event.stopPropagation();
    });
  });
});
// comments
$(function () {
  // code here...
});

// Промоблок 2
$(function () {
  $(".b-promo-block2").livequery(function () {
    var $context = $(this);
    var $expandLink = $(".b-promo-block2__expand-link", $context);
    var $closeLink = $(".b-promo-block2__close", $context);

    function expandBlock (e) {
      $context.removeClass("_collapsed");
      e.preventDefault();
    }

    function closeBlock (e) {
      //$context.addClass('_collapsed');
      $context.remove();
      e.preventDefault();
    }

    $expandLink.on("click", expandBlock);
    $closeLink.on("click", closeBlock);

    $context.adaptBlock({
      maxWidth: {
        780: "_mx780",
        700: "_mx700",
      }
    });
  });
});

// Промоблок 1
$(function () {
  $(".b-promo-block1").livequery(function () {
    var $context = $(this);
    $context.adaptBlock({
      maxWidth: {
        400: "_mx400"
      }
    });
  });
});

// Промоблок 1
$(function () {
  $(".b-promo-block3").livequery(function () {
    var $context = $(this);
    var $timer = $(".b-promo-block3__time", $context);
    var $dateTo = $timer.data("date");
    var $timerDays = $(".b-promo-block3__time-days", $context);
    var $timerHrs = $(".b-promo-block3__time-hrs", $context);
    var $timerMin = $(".b-promo-block3__time-min", $context);
    var $timerSec = $(".b-promo-block3__time-sec", $context);


    function runTimer() {
      window.setInterval(function () {
        requestAnimFrame(function () {
          var c = new Date();
          var d = new Date($dateTo);
          var diff = new Date(d - c);
          var timeDiff = Math.abs(d.getTime() - c.getTime());
          var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
          var hrs = parseInt(diff.getHours());
          var min = diff.getMinutes();
          var sec = diff.getSeconds();

          if (hrs < 10) hrs = "0" + hrs;
          if (min < 10) min = "0" + min;
          if (sec < 10) sec = "0" + sec;

          if (diffDays > 0)
            $timerDays.html("<span>" + diffDays + "</span><br>" + GetNoun(diffDays, "день", "дня", "дней"));
          else
            $timerDays.hide();
          $timerHrs.html("<span>" + hrs + "</span><br>" + GetNoun(diffDays, "час", "часа", "часов"));
          $timerMin.html("<span>" + min + "</span><br>мин");
          $timerSec.html("<span>" + sec + "</span><br>сек");
        });
      }, 1000);
    }

    runTimer();
    $context.adaptBlock({
      maxWidth: {
        780: "_mx780",
        700: "_mx700"
      }
    });
  });
});
// Промоблок 4
$(function () {
  $(".b-promo-block4").livequery(function () {
    var $context = $(this);
    $context.adaptBlock({
      maxWidth: {
        580: "_mx580"
      }
    });
  });
});

// Промоблок 4
$(function () {
  $(".b-promo-block5").livequery(function () {
    var $context = $(this);
    $context.adaptBlock({
      maxWidth: {
        1120: "_mx1120",
        900: "_mx900",
        500: "_mx500"
      }
    });
  });
});

// Промоблок 4
$(function () {
  $(".b-promo-block6").livequery(function () {
    var $context = $(this);
    $context.adaptBlock({
      maxWidth: {
        1020: "_mx1020",
        950: "_mx950",
        630: "_mx630"
      },
    });
  });
});

$(function () {
    $(document).trigger("blocksReady");
});
