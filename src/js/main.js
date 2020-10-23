var clickEvent = (function () {
    // if ('ontouchend' in document.documentElement === true)
    //   return 'touchend';
    // else
    return "click";
})();

function getPlural(n, forms) {
    if (n % 10 == 1 && n % 100 != 11)
        return forms.element;

    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20))
        return forms.elementa;

    return forms.elementov;
}


$(document).on(clickEvent, ".js-filtertags", function (e) {
    var $this, $id, $filtered;
    $this = $(this);
    e.preventDefault();

    $id = $this.data("id");
    if (parseInt($id) > 0) {
        $(".js-filtered[data-section!=\"" + $id + "\"]").hide();
        $(".js-filtered[data-section=\"" + $id + "\"]").show();
    } else {
        $(".js-filtered").show();
    }
});

$(document).on("pagination.scroll", function (e) {
    $("html, body").animate({
        scrollTop: $(e.target).offset().top
    });
});

$(document).on(clickEvent, ".js-add-to-fav", function () {
    var $this, productId;
    $this = $(this);
    productId = $this.data("productid");
    if ($this.hasClass("active")) {
        return $.ajax({
            type: "POST",
            data: {
                id: productId,
                remove: "remove"
            },
            url: "/local/components/ogo/favorites/add.php",
            success: function (res) {
                $this.find("span").removeClass("icon-like-fill").addClass("icon-like");
                return $this.removeClass("active");
            }
        });
    } else {
        return $.ajax({
            type: "POST",
            data: {
                id: productId
            },
            url: "/local/components/ogo/favorites/add.php",
            success: function (res) {
                return $this.addClass("active");
            }
        });
    }
});

$(document).ready(function () {
    /**
   * Чтобы страница восстанавливалась при нажатии "назад" после первого
   * применения, состояние страницы сохраняется сразу после загрузки, до того,
   * как пользователь получит возможность менять фильтры.
   */
    if (!$(".js-catalog").length) {
        return;
    }
    $body = $("body");
    oldData = {};
    oldData.items = $body.find(".js-catalog").html();
    oldData.filter = $body.find(".js-filter").html();
    oldData.sort = $body.find(".js-sort").html();
    oldData.mobile_sort = $body.find(".c-catalog__mobile-sort").html();
    oldData.pagination = $body.find(".js-pagination").html();
    oldData.show_more = $body.find(".js-show-more").html();
    oldData.count_items = $body.find(".js-count_items").html();
    oldData.brands_block = $body.find(".js-brands-filter-block").html();
    window.history.replaceState(oldData, "");
});

$(document).on("submit", ".js-filter", function (e) {



    $(".filter_summary").hide();
    var $this, dataUrl, url;
    e.preventDefault();
    if (typeof URLSearchParams !== "undefined") {
        var urlParams = new URLSearchParams(window.location.search);
        document.getElementById("view_mode").value = (urlParams.get("view") === "list") ? "list" : "plate";
    }

    $(".js-min").each(function () {
        var filterMin = $(this).data("min");
        var minName = $(this).data("name");

        if ($(this).val() == filterMin) {
            $(this).removeAttr("name");
        } else {
            $(this).attr("name", minName);
        }
    });

    $(".js-max").each(function () {
        var filterMax = $(this).data("max");
        var maxName = $(this).data("name");

        if ($(this).val() == filterMax) {
            $(this).removeAttr("name");
        } else {
            $(this).attr("name", maxName);
        }
    });


    $this = $(this);
    dataUrl = $this.serialize();
    url = window.location.pathname;
    preloader();

    $.ajax({
        method: "get",
        url: url,
        data: dataUrl,
        success: function (result, status, xhr) {
            $(".filter_summary").hide();
            var ct = xhr.getResponseHeader("content-type") || "";
            if (ct.indexOf("json") > -1) {
                if (result.redirect)
                    window.location.href = result.redirect;
                return;
            }

            var $result, data;
            $result = $(result);
            data = {};
            data.brands_block = $result.filter(".js-brands-filter-block").html();
            data.items = $result.find(".js-catalog").html();
            data.filter = $result.find(".js-filter").html();
            data.sort = $result.find(".js-sort").html();
            data.mobile_sort = $result.find(".c-catalog__mobile-sort").html();
            data.pagination = $result.find(".js-pagination").html();
            data.show_more = $result.find(".js-show-more").html();
            data.count_items = $result.filter(".js-count_items").html();
            if (!data.count_items && $(".js-configurator-section").length) {
                data.count_items = $result.find(".js-count_items").html();
            }
            data.tmr_data = $result.find("#tmr_data").attr("data-tmr");
            data.gtm_data = $result.find("#gtm_data").attr("data-gtm");
            updateCatalogHtml(data, false);
            if ($this.closest(".c-catalog__fix-filter").length > 0)
                window.toggleFiltersOnMobile();
            var pushUrl = url + "?" + dataUrl;
            window.history.pushState(data, "", pushUrl);
        },
        complete: function () {
            $(".filter_summary").hide();
        }
    });
    return false;
});

function rebuild() {
    $(document).trigger("catalog-plates.resize");
    $(document).trigger("accessories-choose.resize");
    cardPreview();
}

$("a.gallery").fancybox({
    "transitionIn": "elastic",
    "transitionOut": "elastic",
    "speedIn": 600,
    "speedOut": 200,
    "overlayShow": true,
    helpers: {
        thumbs: {
            width: 50,
            height: 50
        }
    }
});

$(document).on(clickEvent, ".js_show_more__accessories > span, .js_filtertags_accessories > span", function (e) {
    var $this, url, append, activeTag;
    e.preventDefault();
    $this = $(this);
    if ($this.hasClass("b-tags__tag_active")) {
        return false;
    }
    activeTag = $(".b-tags__tag_active");
    url = $this.data("href");
    preloader();
    append = $this.data("append");
    if (url && url.length > 0) {
        $.ajax({
            url: url,
            success: function (result) {
                var $result, data;
                $result = $(result);
                data = {};
                if ($this.parent().hasClass("js_filtertags_accessories")) {
                    activeTag.removeClass("b-tags__tag_active");
                    $this.addClass("b-tags__tag_active");
                }
                data.show_more = $(".js_show_more__accessories", $result);
                data.accessories = $(".js-accessories", $result);
                updateAccesoriesHtml(data, append);
                $(document).trigger("footer.recalc");
                $(".b-small-product-slider").trigger("reinit.block");
                $(document).trigger("reinit.block");
                $(result).imagesLoaded().then(function () {
                    rebuild();
                    preloader();
                });
                return true;
            }
        });
    }
    return true;
});
updateAccesoriesHtml = function (data, append) {
    if (data.accessories) {
        if (append && typeof append != "undefined") {
            $(".js-item", $(data.accessories)).appendTo($(".js-accessories"));
        } else {
            $(".js-items").html(data.accessories.html());
        }
    }
    if (data.show_more) {
        $(".js_show_more__accessories").html(data.show_more);
    } else {
        $(".js_show_more__accessories").html("");
    }

    return true;
};

$(document).on(clickEvent, ".js-questions-pagination .b-paginator__items a, .js-questions-show-more > a", function (e) {
    var $this = $(this),
        append = $this.data("append");
    ajaxQuestions($(this).attr("href"), e, append);
});


function ajaxQuestions(href, e, append) {
    e.stopPropagation();
    e.preventDefault();

    if (href && href.length > 0) {
        preloader();
        $.ajax({
            url: href + "&REVIEWS=Y",
            success: function (result) {
                var $result, data;
                $result = $(result);
                data = {};
                data.items = $result.find(".js-questions-items").html();
                if (data.items) {
                    if (append) {
                        $(data.items).filter(".js-question").appendTo($(".js-questions-items"));
                    } else {
                        $(".js-questions-items").html(data.items);
                    }
                }

                data.pagination = $result.find(".js-questions-pagination").html();
                if (data.pagination) {
                    $(".js-questions-pagination").html(data.pagination);
                }

                data.show_more = $result.find(".js-questions-show-more").html();
                if (data.show_more) {
                    $(".js-questions-show-more").html(data.show_more);
                } else {
                    $(".js-questions-show-more").html("");
                }

                $(result).imagesLoaded().then(function () {
                    rebuild();
                });
                window.history.pushState(data, "", href);
                preloader();
            }
        });
    }
    return false;
}

$(document).on(clickEvent, ".js-feedbacks .js__review_source", function (e) {
    ajaxFeedbacks($(this).data("href"), e);
});

$(document).on(clickEvent, ".js-feedbacks a.b-feedback-sort__sort-link, .js-feedbacks .js-feedback-pagination .b-paginator__items a, .js-feedback-show-more > a", function (e) {
    var $this = $(this),
        append = $this.data("append");
    ajaxFeedbacks($(this).attr("href"), e, append);




});

function ajaxFeedbacks(href, e, append) {
    e.stopPropagation();
    e.preventDefault();

    if (href && href.length > 0) {
        preloader();
        $.ajax({
            url: href + "&FEEDBACKS=Y",
            success: function (result) {
                var $result, data;
                $result = $(result);
                data = {};
                data.items = $result.find(".js-feedback-items").html();
                if (data.items) {
                    if (append) {
                        $(data.items).find(".js__review_feedback").appendTo($(".js-feedbacks .js-feedback-items"));
                    } else {
                        $(".js-feedback-items").html(data.items);
                    }
                }

                data.sort = $result.find(".js-feedback-sort").html();
                if (data.items) {
                    $(".js-feedback-sort").html(data.sort);
                }

                data.sources = $result.find(".js-feedback-sources").html();
                if (data.sources) {
                    $(".js-feedback-sources").html(data.sources);
                }

                data.pagination = $result.find(".js-feedback-pagination").html();
                if (data.pagination) {
                    $(".js-feedback-pagination").html(data.pagination);
                }

                data.show_more = $result.find(".js-feedback-show-more").html();
                if (data.show_more) {
                    $(".js-feedback-show-more").html(data.show_more);
                } else {
                    $(".js-feedback-show-more").html("");
                }

                $(result).imagesLoaded().then(function () {
                    rebuild();
                });
                window.history.pushState(data, "", href);
                preloader();


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
            }
        });
    }
    return false;
}

$(document).on(clickEvent, ".js-show-more, .pagination > li > a, .b-catalog-sort__params > a, .c-catalog__more > a, .b-tags__item > a, .js-clear-filter", function (e) {
    ajaxCatalog(this, e);
});

$(document).on("change", ".c-catalog__sort-select", function (e) {
    var selected;
    selected = $(this).find(":selected");
    ajaxCatalog(selected, e);
});


function ajaxCatalog(elem, e) {
    $(".filter_summary").hide();
    var $this, url, append, nameClass;
    e.preventDefault();
    $this = $(elem);
    if ($this.is(".b-catalog-sort__plate-view_active") || $this.is(".b-catalog-sort__list-view_active") || $this.is(".b-tags__basket_tag"))
        return false;
    url = $this.attr("href");
    if (typeof url == "undefined")
        url = $this.attr("data-href");

    append = $this.data("append");

    nameClass = $this.attr("class");


    if (url && url.length > 0) {
        preloader();
        $.ajax({
            url: url,
            success: function (result) {
                //console.log($this)
                var $result, data;
                $result = $(result);
                data = {};
                data.brands_block = $result.filter(".js-brands-filter-block").html();
                data.items = $result.find(".js-catalog").html();
                data.filter = $result.find(".b-smart-filter").html();
                data.sort = $result.find(".js-sort").html();
                data.mobile_sort = $result.find(".c-catalog__mobile-sort").html();
                data.pagination = $result.find(".js-pagination").html();
                data.show_more = $result.find(".js-show-more").html();
                data.tags = $result.find(".js-tags").html();
                //data.count_items = $result.find('.js-count_items').html();
                data.count_items = $result.filter(".js-count_items").html();
                data.count_btn = $result.find(".count_bottom").html();
                data.tmr_data = $result.find("#tmr_data").attr("data-tmr");
                data.gtm_data = $result.find("#gtm_data").attr("data-gtm");

                updateCatalogHtml(data, append, result, nameClass);

                if (!append) {
                    $(".js-catalog").trigger("pagination.scroll");
                }
                window.history.pushState(data, "", url);
            },
            complete: function () {
                $(".filter_summary").hide();
            }
        });
    }
    return false;
}

updateCatalogHtml = function (data, append, result, context) {
    var $newFilter, $oldFilter;

    if (data.filter) {
        $newFilter = $(data.filter);
        $oldFilter = $(".js-filter");

        $oldFilter.each(function () {
            var $filter = $(this);
            $filter.find("input[name=\"PAGESIZE\"]").each(function () {
                var $this = $(this);
                var $new = $newFilter.find("input[name=\"PAGESIZE\"]");
                $this.val($new.val());
            });
            $filter.find("input[name=\"SORT\"]").each(function () {
                var $this = $(this);
                var $new = $newFilter.find("input[name=\"SORT\"]");
                $this.val($new.val());
            });
            $filter.find("input[name=\"ORDER\"]").each(function () {
                var $this = $(this);
                var $new = $newFilter.find("input[name=\"ORDER\"]");
                $this.val($new.val());
            });
            $filter.find("input[type=\"checkbox\"], input[type=\"radio\"]").each(function () {
                var $this = $(this),
                    id = $this.attr("id"),
                    $new = $newFilter.find("[id=\"" + id + "\"]");
                if ($new.length > 0 && id != "COMPATIBLE") {
                    $this.prop("checked", $new.is(":checked"));
                    if (!$new.is(":checked")) {
                        $this.removeClass("_checked");
                        $this.closest("label").removeClass("_checked");
                    } else {
                        $this.addClass("_checked");
                        $this.closest("label").addClass("_checked");
                    }
                    $this.prop("disabled", $new.is(":disabled"));

                    var label = $this.closest("label");
                    if ($new.is(":disabled")) {
                        label.addClass("disabled");
                    } else {
                        label.removeClass("disabled");
                    }
                }
            });

            $filter.find(".js-clear-filter").each(function () {
                var $this = $(this),
                    $new = $newFilter.find(".js-clear-filter");

                if ($new.length > 0) {
                    var href = $new.attr("href");
                    $this.attr("href", href);
                }
            });


            $filter.find("input[type=\"text\"], input[type=\"tel\"]").each(function () {
                var $this = $(this),
                    id = $this.attr("name"),
                    $new = $newFilter.find("[name=\"" + id + "\"]");
                if ($new.length > 0) {
                    $this.val($new.val());
                }
            });


        });
    }

    if (data.filterInfo) {
        $(".js-filter-info").html(data.filterInfo);
    }
    if (data.tags) {
        $(".js-tags").html(data.tags);
    }
    if (data.count_items) {
        $(".js-count_items").html(data.count_items);
    }

    $(".count_top").html(data.count_btn);
    $(".count_bottom").html(data.count_btn);
    try {
        window.dataLayer = window.dataLayer || [];
        dataLayer.push(JSON.parse(data.gtm_data));
        window._tmr = window._tmr || [];
        _tmr.push(JSON.parse(data.tmr_data));
    } catch (e) {}

    if (data.items) {
    /* setTimeout(function(){
        var wW = window.innerWidth
        var mobileFilterOffset = $('.c-catalog__mobile-filters').offset();
        var mobileFilterHeight = $('.c-catalog__mobile-filters').height()
        var mobileFilterOffsetTop = mobileFilterOffset.top;

        if(wW > 1023) {
            console.log('desktop');
        }

        else if(wW < 650) {
            var mobileFilterOffsetCommon = mobileFilterOffsetTop-(mobileFilterHeight/2);
            $('body').animate({
                scrollTop: mobileFilterOffsetCommon
            })
        }

        else {
            var mobileFilterOffsetCommon = mobileFilterOffsetTop - mobileFilterHeight - 10;
            $('body').animate({
                scrollTop: mobileFilterOffsetCommon
            })
        }
    }, 10) */
        // TODO

        if (append) {
            $(data.items).find(".js-item").appendTo($(".js-items"));
            $(window).resize();
        } else {
            $(".js-catalog").html(data.items);
            $(".catalog-plates-slider__slider").slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                draggable: false,
                dots: true,
                fade: true,
                autoplay: true,
                autoplaySpeed: 15000
            });
            rebuild();
        }

    }
    if (data.sort) {
        $(".js-sort").html(data.sort);
    }
    if (data.mobile_sort) {
        $(".c-catalog__mobile-sort").html(data.mobile_sort);
    }
    if (data.pagination) {
        $(".js-pagination").html(data.pagination);
    }
    if (data.show_more) {
        $(".js-show-more").html(data.show_more);
    } else {
        $(".js-show-more").html("");
    }
    if (data.brands_block && data.brands_block.trim()) {
        $(".js-brands-filter-block").html(data.brands_block);
    } else {
        $(".js-brands-filter-block").html("");
    }
    $(result).imagesLoaded().then(function () {
        rebuild();
        preloader();
    });

    productBtn();

    return false;
};

window.onpopstate = function (e) {
    var state;
    if (e.state) {
        state = e.state;
    }
    if (state) {
        preloaderIfNotStarted();
        return updateCatalogHtml(state);
    }
};

function preloaderIfNotStarted() {
    if (!$("body").hasClass("js-preloader")) {
        preloader();
    }
}

function preloader() {
    var body = $("body");
    body.toggleClass("js-preloader");

    if (body.hasClass("js-preloader")) {
        $("<div class ='preloader__wrapper'>" +
      "<div class='preloader'>" +
      "<span class='preloader__d'></span>" +
      "<span class='preloader__d'></span>" +
      "<span class='preloader__d'></span>" +
      "<span class='preloader__d'></span>" +
      "</div>" +
      "</div>").appendTo(body);
    } else {
        $(".preloader__wrapper").remove();
    }
}

cardPreview = function () {
    $(".b-plate-product").livequery(function () {
        var $context = $(this);
        var $preview = $(".b-plate-product__fast-view", $context);

        function showPreview() {
            window.dataLayer = window.dataLayer || [];
            let obj = JSON.parse(this.parentNode.parentNode.parentNode.parentNode.getAttribute("data-gtm"));
            window.dataLayer.push({
                "event": "eec.impressionClick",
                "event-action": "Быстрый просмотр",
                "event-category": "ecommerce",
                "event-label": obj.name,
                "event-non-interaction": "False",
                "ecommerce": {
                    "add": {
                        "actionField": {
                            "list": obj.list
                        },
                        "products": [{
                            "id": obj.id,
                            "name": obj.name,
                            "brand": obj.brand,
                            "category": obj.category,
                            "position": obj.position,
                            "price": obj.price,
                            "quantity": 1
                        }]
                    }
                }
            });
            $.fancybox.open({
                href: $(this).attr("data-href")
            }, {
                wrapCSS: "_product-preview _ajax-appended",
                type: "ajax",
                fitToView: true,
                autoResize: true,
                padding: 0,
                margin: 20,
                maxWidth: 1200,
                scrolling: "visible",
                beforeShow: function () {
                    $("html").addClass("fancybox-margin fancybox-lock");
                    // $('.iblock', this.inner).trigger('resize.block');
                },
                afterLoad: function (current, previous) {
                    var $content = $(current.content);
                    var _tmp;

                    $.fancybox.showLoading();

                    $(".fancybox-wrap").appendTo(".fancybox-overlay");
                    $content.addClass("_ajax-append");
                    _tmp = $("<div>").append($content.clone());
                    // _tmp.livequery();
                    current.content = _tmp.html();
                },
                afterShow: function () {
                    $("._product-preview .iblock").trigger("resize.block");
                    setTimeout(function () {
                        $.fancybox.hideLoading();
                        $(".fancybox-wrap._ajax-appended").removeClass("_ajax-appended");
                        $(".fancybox-wrap .b-product-preview._ajax-append").removeClass("_ajax-append");
                        $(".fancybox-wrap").livequery();
                        let vh = ($(window).height() - $(".fancybox-wrap").height()) / 2;
                        $(".fancybox-wrap").css({
                            "top": vh + "px"
                        });
                    }, 400);
                }
            });
            return false;
        }

        $preview.on("click", showPreview);

        $context.adaptBlock({
            maxWidth: {
                290: "_mx290"
            }
        });
    });
};
// cardPreview();

$(function () {
    function bannerBlock() {
        var cliWidth = document.body.clientWidth;

        if (cliWidth <= 500) {
            $(".b-promo-block6__bg-mobile").each(function (index, value) {
                dataSrc = $(this).attr("data-src");
                $(this).attr("data-lazy", dataSrc);
                $(this).removeAttr("data-src");
            });
        } else {
            $(".b-promo-block6__bg").each(function (index, value) {
                dataSrc = $(this).attr("data-src");
                $(this).attr("data-lazy", dataSrc);
                $(this).removeAttr("data-src");
            });
        }
    }

    bannerBlock();

    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;

    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    // We listen to the resize event
    window.addEventListener("resize", () => {
    // We execute the same script as before
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    });

    $(".b-cart-link").livequery(function () {
        var $context = $(".b-cart-link");
        window.refreshBasket = function (callback) {
            var templateID = window.BITRIX_SITE_TEMPLATE_ID || "new";
            $.ajax({
                url: "/ajax/" + templateID + "/refreshBasket.php",
                data: {
                    action: "refresh"
                },
                type: "POST",
                success: function (result) {
                    var $basket = $(result);

                    if ($basket.length > 0) {
                        $context.html($basket.html());
                        if ($basket.hasClass("active")) {
                            $context.addClass("active");
                        } else {
                            $context.removeClass("active");
                        }
                    }
                    if (typeof (callback) === "function") {
                        callback($basket.html());
                    }
                }
            });
        };

    });

    cardPreview();
    //Быстрый просмотр в корзине
    $(".b-cart__item").livequery(function () {
        var $context = $(this);

        $context.adaptBlock({
            maxWidth: {
                290: "_mx290"
            }
        });
    });

    function cartShowPreview() {
        $.fancybox.open({
            href: $(this).attr("data-href")
        }, {
            wrapCSS: "_product-preview _ajax-appended",
            type: "ajax",
            fitToView: true,
            autoResize: true,
            padding: 0,
            margin: 20,
            maxWidth: 1200,
            afterLoad: function (current, previous) {
                var $content = $(current.content);
                var _tmp;

                $.fancybox.showLoading();

                $content.addClass("_ajax-append");
                _tmp = $("<div>").append($content.clone());
                // _tmp.livequery();
                current.content = _tmp.html();
            },
            afterShow: function () {
                $(".iblock").trigger("resize.block");
                setTimeout(function () {
                    $.fancybox.hideLoading();
                    $(".fancybox-wrap._ajax-appended").removeClass("_ajax-appended");
                    $(".fancybox-wrap .b-product-preview._ajax-append").removeClass("_ajax-append");
                    $(".fancybox-wrap").livequery();
                }, 400);
            }
        });
        return false;
    }

    function setFastviewHandlers() {
        var fastview = $(".js-fastview");
        fastview.off("click", cartShowPreview);
        fastview.on("click", cartShowPreview);
    }

    setFastviewHandlers();

    // Добавить товар по артикулу
    $(".b-add-product").livequery(function () {
        var $context = $(this);
        var $btn = $(".b-add-product__submit", $context);

        function findArticle(e) {
            var $articleInput, $article, $resultContainer;
            e.preventDefault();
            $articleInput = $("#article_input");
            $article = $articleInput.val().trim();
            $resultContainer = $(".js-result_items");

            $context.removeClass("_success");
            $context.removeClass("_error");

            if ($article) {
                $.ajax({
                    url: "/ajax/new/findByArticle.php",
                    data: {
                        article: $article
                    },
                    success: function (result) {
                        var $items;
                        if (result.length == 0) {
                            $context.removeClass("_success");
                            $context.addClass("_error");

                            return;
                        }

                        $items = $(result).find(".b-add-product__result-item");

                        if ($items.length > 0) {
                            $resultContainer.html($items);

                            select2init();

                            $context.removeClass("_error");
                            $context.addClass("_success");
                        } else {
                            $context.removeClass("_success");
                            $(".b-add-product__error").html(result);
                            $context.addClass("_error");
                        }
                    }
                });
            }
        }

        $btn.on("click", findArticle);

        $context.adaptBlock({
            maxWidth: {
                600: "_mx600",
                470: "_mx470"
            }
        });
    });

    $(document).on(clickEvent, ".js-configurator_action", function (e) {
        return ConfiguratorAction(e, this);
    });
    $(document).on("change", ".js-configurator_action", function (e) {
        var selected;
        selected = $(this).find(":selected");
        return ConfiguratorAction(e, selected);
    });

    function ConfiguratorAction(e, obj) {
        var $this, $id, $action, $reload, $rowType, $quantity, $nameHolder, $name, $configuratorId;
        e.preventDefault();
        $this = $(obj);
        $id = $this.data("id");
        $action = $this.data("action");
        $reload = $this.data("reload");
        $rowType = $this.data("type");
        $quantity = $this.data("quantity");
        $nameHolder = $(".b-configurator-save__input", $this.parent().parent());
        $configuratorId = $("#cofiguratorId").val();
        if ($nameHolder.length > 0)
            $name = $nameHolder.val();

        if ($this.hasClass("_disabled") || $this.attr("disabled") == "disabled")
            return;

        if ($action == "addToBasket" && !checkMandatory())
            return;

        preloader();


        $.ajax({
            url: "/ajax/new/configuratorActions.php",
            data: {
                id: $id,
                action: $action,
                row_type: $rowType,
                quantity: $quantity,
                name: $name,
                reload: $reload,
                configurator: $configuratorId
            },
            method: "post",
            success: function (result) {
                result = JSON.parse(result);
                if ($action == "addToBasket") {
                    basketAddedModal();
                    refreshBasket();
                }
                if ($reload == "Y" && typeof result.url != "undefined" && result.url.length > 0) {
                    ajaxConfigurator(result.url);
                } else {
                    if (result.status == "success") {
                        if (result.url)
                            window.location.href = result.url;
                    } else if (result.status == "error" && $action == "saveConfiguration") {
                        $.fancybox.open(
                            $("#duplicate-configuration-modal"), {
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

                    preloader();
                }
            }
        });
    }

    window.checkMandatory = function () {
        var $mandatoryItems = $(".b-configurator-items__item[data-mandatory=\"true\"]");

        $.each($mandatoryItems, function (key, val) {
            var $item = $(val),
                $itemContain = $(".b-configurator-items__contain", $item);

            if ($itemContain.length == 0)
                return false;
        });

        return true;
    };

    function ajaxConfigurator(url) {
        if (url && url.length > 0) {
            $.ajax({
                url: url,
                success: function (result) {
                    updateConfiguratorHtml($(result));
                    preloader();
                }
            });
        }
    }

    function updateConfiguratorHtml($ajaxResult) {
        var $aside = $(".c-configurator__aside-total"),
            $asideSave = $(".c-configurator__save"),
            $asideLink = $(".c-configurator__link"),
            $itemsList = $(".b-configurator-items__list"),
            $additionalItems = $(".b-configurator-additional__items"),
            $bottomSection = $(".c-configurator__bottom-section"),
            $expertRequest = $("#expert-request-modal");
        //$estimate = $(".b-estimate"),
        //$totalPriceHolder = $(".b-total__price-holder");

        $aside.html($(".c-configurator__aside-total", $ajaxResult).html());
        $asideSave.html($(".c-configurator__save", $ajaxResult).html());
        $asideLink.html($(".c-configurator__link", $ajaxResult).html());
        $itemsList.html($(".b-configurator-items__list", $ajaxResult).html());
        $additionalItems.html($(".b-configurator-additional__items", $ajaxResult).html());
        $bottomSection.html($(".c-configurator__bottom-section", $ajaxResult).html());
        $expertRequest.html($("#expert-request-modal", $ajaxResult).html());
        //$estimate.html($(".b-estimate", $ajaxResult));
        //$totalPriceHolder.html($(".b-total__price-holder", $ajaxResult));

        select2init();
    }
    $(document).on(clickEvent, ".button-buy-add", function (e) {
        e.preventDefault();
    });

    $(document).on(clickEvent, ".button-buy, .js-inbasket-add-product", function (e) {
        var $this, $id, $quantity, $quantityInput, $basketReload, $activeHref, $closestTag;
        preloader();
        e.preventDefault();
        $this = $(this);
        $id = $this.data("id");
        $closestTag = $this.closest(".b-accessories-choose").find(".b-tags__tag_active");
        $activeHref = $closestTag.attr("href") || $closestTag.data("href");
        $basketReload = $this.data("basketreload");
        $quantity = 1;
        $quantityInput = $this.parent().parent().find(".js-add-quantity");


        if ($quantityInput.length)
            $quantity = $quantityInput.val();

        function addToCard(idAcs) {
            idAcs ? $id = idAcs : "";
            $.ajax({
                url: "/ajax/new/addToCart.php",
                data: {
                    id: $id,
                    quantity: $quantity
                },
                success: function (result) {
                    let jsonProduct = JSON.parse(result);

                    if ($basketReload || $("#basket_items").length > 0) {
                        basketReload();
                    }
                    if ($this.hasClass("button-buy")) {
                        basketAddedModal();
                    }

                    refreshBasket();

                    //$.fancybox.close();
                    if (jsonProduct["product"][0]["NAME"]) {
                        $(".addProd").replaceWith("<div class=\"addProd\"><img src=\"" +
              jsonProduct["product"][0]["PREVIEW_PICTURE"] + "\"><a href=\"" + jsonProduct["product"][0]["DETAIL_PAGE_URL"] + "\" class=\"addProd__name\">" + jsonProduct["product"][0]["NAME"] +
              "</a><div class=\"addProd__price\">" + jsonProduct["product"][0]["PRICE"] + " <span class=\"rub\">i</span></div></div>");
                    }
                    $(".b-add-product__result-items").html("");
                    if (typeof $activeHref != "undefined" && $activeHref.length > 0) {
                        refreshAccessoriesModal($activeHref);

                    } else
                        preloader();
                }
            });
        }

        if ($id) {
            if (!$(".b-product-links__link_acs").length && $(".c-catalog__product-links").length) {
                addToCard();

            } else {
                $.ajax({
                    url: "/ajax/new/basketAdd.php?ACCESSORIES_AJAX=Y&FILTER_ACCESSORIES=&ELEMENT_ID=" + $id,
                    success: function (e) {
                        if (e !== "Товар не найден!") {
                            $(".b-added-cart").removeClass("active");
                            if ($(".b-added-cart .b-accessories-choose").length) {
                                $(".b-added-cart .b-accessories-choose").replaceWith(e);
                            } else {
                                $(".b-added-cart__btns").after(e);
                            }
                            $(".b-product-small__add-btn").on("click",
                                function () {
                                    $this = $(this);
                                    let addId = $this.data("id");
                                    preloader();
                                    addToCard(addId);
                                }
                            );
                        }


                        addToCard();
                    }
                });
            }
        } else {
            preloader();
        }
    });

    function refreshAccessoriesModal($activeHref) {
        $.get($activeHref, function (data) {
            var $result = $(data),
                $remarks = $(".b-product-small__total-price", $result);

            $remarks.each(function () {
                var current = $(this),
                    target = $("div[data-id='" + current.data("id") + "']");

                target.html(current.html());
            });
            preloader();
        });
    }

    function basketAddedModal() {
        $.fancybox.open(
            $("#added-cart-modal"), {
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


    $(document).on("click", ".js-add-product_to-listw", function (e) {
        var $this, $id, $list, $action;
        e.preventDefault();
        preloader();
        $this = $(this);
        $id = $this.data("id");
        $list = $this.attr("data-list");
        $action = $this.attr("data-action");

        if ($action == "add")
            $this.attr("data-action", "del");
        else if ($action == "ADD_TO_COMPARE_LIST")
            $this.attr("data-action", "DELETE_FROM_COMPARE_LIST");
        else if ($action == "DELETE_FROM_COMPARE_LIST")
            $this.attr("data-action", "ADD_TO_COMPARE_LIST");
        else if ($action == "del" && $list == "favorites")
            $this.attr("data-action", "add");



        if ($list == "favorites" && $action == "del") $("#favoriteCstmCard").text("В избранное");
        if ($list == "favorites" && $action == "add") $("#favoriteCstmCard").text("В избранном");


        if ($id) {
            $.ajax({
                url: "/ajax/new/actionToList.php",
                data: {
                    id: $id,
                    list: $list,
                    action: $action
                },
                method: "post",
                success: function (result) {
                    var status = false;
                    try {
                        status = jQuery.parseJSON(result);
                    } catch (e) {
                        status = result;
                    }

                    if (status.STATUS == "OK")
                        refreshBottom($list);
                }
            });
        }
    });

    $(document).on(clickEvent, ".b-cart-product__remove", function (e) {
        var $this;
        e.preventDefault();
        preloader();
        $this = $(this);

        if ($this.data("href")) {
            $.ajax({
                url: $this.data("href"),
                success: function (result) {
                    basketReload(preloader);
                }
            });
        }
    });


    if (!$(".js-filter").length && $(".js-add-product_to-list").length)
        $(document).on("click", ".js-add-product_to-list", function (e) {
            if ($(this).attr("data-action") == "del")
                $(this).closest(".js-item").remove();
        });

    $(document).on(clickEvent, ".js-add-product_to-list", function (e) {
        var $this, $id, $list, $action;
        e.preventDefault();
        preloader();
        $this = $(this);
        $id = $this.data("id");
        $list = $this.attr("data-list");
        $action = $this.attr("data-action");

        if ($action == "add")
            $this.attr("data-action", "del");
        else if ($action == "ADD_TO_COMPARE_LIST")
            $this.attr("data-action", "DELETE_FROM_COMPARE_LIST");
        else if ($action == "DELETE_FROM_COMPARE_LIST")
            $this.attr("data-action", "ADD_TO_COMPARE_LIST");
        else if ($action == "del" && $list == "favorites")
            $this.attr("data-action", "add");



        if ($list == "favorites" && $action == "del") $("#favoriteCstmCard").text("В избранное");
        if ($list == "favorites" && $action == "add") $("#favoriteCstmCard").text("В избранном");


        if ($id) {
            $.ajax({
                url: "/ajax/new/actionToList.php",
                data: {
                    id: $id,
                    list: $list,
                    action: $action
                },
                method: "post",
                success: function (result) {
                    var status = false;
                    try {
                        status = jQuery.parseJSON(result);
                    } catch (e) {
                        status = result;
                    }

                    if (status.STATUS == "OK")
                        refreshBottom($list);
                }
            });
        }
    });



    $(document).on("click", "#favoriteCstmCard", function () {
        $("#cardFav").click();
    });


    function refreshBottom(list) {
        $.ajax({
            url: "/ajax/new/actionToList.php",
            data: {
                list: list,
                action: "get"
            },
            method: "post",
            async: false,
            success: function (result, statusText, httpResponse) {
                if (parseInt(httpResponse.getResponseHeader("X-compare-list-count")) > 0) {
                    $(".js-header-compare-list-count").addClass("active");
                } else {
                    $(".js-header-compare-list-count").removeClass("active");
                }
                if (parseInt(httpResponse.getResponseHeader("X-favorite-list-count"))) {
                    $(".js-header-favorite-list-count").addClass("active");
                } else {
                    $(".js-header-favorite-list-count").removeClass("active");
                }
                var $result = $(result);
                var $content = $(".js-list_" + list, $result);
                var listBlocks = $(".js-list_" + list);
                var items = $("li.b-small-product-slider__slide", $result);
                var counter = $(".js-list_num_" + list);
                if (counter.length > 0) {
                    counter.text(items.length);
                }

                listBlocks.html($content.html());
                listBlocks.each(function (index, obj) {
                    var $slider = $(obj);
                    var $context = $(obj).parent().parent();
                    var $prev = $(".b-small-product-slider__prev", $context);
                    var $next = $(".b-small-product-slider__next", $context);

                    $slider.removeClass("slick-initialized");
                    $slider.removeClass("slick-slider");

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

                preloader();
            }
        });
    }

    function basketReload(callback) {
        callback = callback || null;
        $.ajax({
            url: window.location,
            success: function (result) {
                var $basket, $basketClass;

                $basketClass = ".js_basket";
                $basket = $(result).find($basketClass);

                if ($basket.length) {
                    $($basketClass).html($basket.html());
                    setFastviewHandlers();
                    blockAccessoriesSlider();
                    select2init();
                    accessoriesModal();
                    // refreshBasket();

                    if (callback !== null)
                        callback();
                }
            }
        });
        recalcBasketAjax({});
    //  refreshBasket();
    }

    function select2init() {
        $("select.select2").livequery(function () {

            if ($("html").hasClass("touch")) {
                return false;
            }

            var placeholder = $(this).attr("placeholder");

            $(this).select2({
                theme: "main",
                minimumResultsForSearch: -1,
                placeholder: placeholder,
                width: "100%"
            });
        });
    }

    select2init();

    function blockAccessoriesSlider() {
        $(".b-accessories-slider").livequery(function () {
            var $context = $(this);
            var $slider = $(".b-accessories-slider__slider", $context);
            var $prev = $(".b-accessories-slider__prev", $context);
            var $next = $(".b-accessories-slider__next", $context);
            var $items = $(".b-accessories-slider__item", $context);
            var $slickTrack;

            if ($slider.hasClass("slick-initialized"))
                return;

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
    }

    blockAccessoriesSlider();

    function accessoriesModal() {
        $(".js-accesories-modal").livequery(function () {
            $(this).on("click", function openShopDetail(e) {
                var $link = $(this);
                var href = $link.attr("href") || $link.data("href");

                $.fancybox.open({
                    href: href
                }, {
                    type: "ajax",
                    width: 960,
                    autoSize: false,
                    padding: 0,
                    margin: 20,
                    autoCenter: true,
                    fitToView: true,
                    scrolling: "visible",
                    beforeShow: function () {
                        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
                        $("html").addClass("fancybox-margin fancybox-lock");
                        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                            $("html").addClass("fancybox-ios");
                        }
                        $(".iblock", this.inner).trigger("resize.block");
                    },
                    afterShow: function () {
                        $(".fancybox-wrap").livequery();
                        $(".fancybox-wrap").appendTo(".fancybox-overlay");
                    }
                });

                e.preventDefault();
            });
        });
    }

    accessoriesModal();

    /**
   * Оформление заказа
   */

    //Проставление input для доставки
    $(".js-delivery__courier").livequery(function () {
        var $context = $(this),
            $btn = $(".js-delivery__courier_btn"),
            $pickpointBtn = $(".js-delivery__pickpoint_btn");

        $btn.click(function (e) {
            var $input = $(".js-delivery_input", $context),
                $inputs = $(".js-delivery_input"),
                $checked = $(".js-delivery_input:checked");

            if ($checked.length > 0)
                $pickpointBtn.data("checked", $checked.prop("id"));

            $inputs.prop("checked", false);
            $input.prop("checked", true);
            e.preventDefault();
        });
    });
    $(".js-delivery__pickpoint_btn").livequery(function () {
        var $context = $(this);

        $context.click(function (e) {
            var $inputs = $(".js-delivery_input");

            if ($context.data("checked")) {
                $inputs.prop("checked", false);
                $("#" + $context.data("checked")).prop("checked", true);
            }
        });
    });
    $(".js-delivery__pickup").livequery(function () {
        var $context = $(this),
            $storeLabel = $(".b-pickpoint", $context);

        $storeLabel.click(function (e) {
            var $deliveryDiv = $(this).parent().parent(),
                $input = $(".js-delivery_input", $deliveryDiv),
                $inputs = $(".js-delivery_input");

            $inputs.prop("checked", false);
            $input.prop("checked", true);
        });
    });
});

function SKUhandler(SKUdata) {
    this.SKU = SKUdata;
    this.PROPS_INPUTS = $(".js-sku__prop");
    this.PROPS = [];
    this.PRICE_FIELD = $(".js-sku__price");

    var objHandler = this;
    var $firstSKU = this.SKU[0];

    Array.from(this.PROPS_INPUTS).forEach(function (val, i, arr) {
        var $propCode = $(val).data("prop");
        objHandler.PROPS.push($propCode);
        $(val).val($firstSKU.PROPS[$propCode].ID);
    });



    this.findOffer = function (changed) {
        var $selectedSKU = [],
            $foundFlag = false,
            $buyBtn = $(".button-buy");
        objHandler.PROPS.forEach(function (val, i, arr) {
            var $propSelect = $(".js-sku__prop[data-prop='" + val + "']");
            var SKU = {
                PROP: val,
                VAL: $propSelect.val()
            };
            $selectedSKU.push(SKU);
        });

        objHandler.SKU.forEach(function (offer, offerIndef, offerArr) {
            var $found = true;
            $selectedSKU.forEach(function (SKU, i, arr) {
                if (offer.PROPS[SKU.PROP].ID != SKU.VAL)
                    $found = false;
            });

            if ($found) {
                objHandler.PRICE_FIELD.html(numberWithSeparator(offer.PRICE) + "<span class=\"rub\">i</span>");
                $foundFlag = true;
            }
        });

        if ($foundFlag)
            return true;

        if (changed) {
            var $changedProp = $(changed).data("prop"),
                $changedVal = $(changed).val();

            objHandler.SKU.forEach(function (offer, offerIndef, offerArr) {
                if (offer.PROPS[$changedProp].ID == $changedVal) {
                    Array.from(objHandler.PROPS_INPUTS).forEach(function (val, i, arr) {
                        var $propCode = $(val).data("prop"),
                            select2title = $(".select2 .select2-selection__rendered", $(val).parent());

                        if ($propCode == $changedProp)
                            return;

                        $(val).select2("val", offer.PROPS[$propCode].ID, true);

                        select2title.off();
                        select2title.html(offer.PROPS[$propCode].VALUE); //Костыль, потому что переключение select2  текущей версии не работает
                    });

                    $buyBtn.attr("data-id", offer.ID);
                    objHandler.PRICE_FIELD.html(numberWithSeparator(offer.PRICE) + "<span class=\"rub\">i</span>");

                    return true;
                }
            });
        }
    };


    this.findOffer();
    this.PROPS_INPUTS.on("change", function (e) {
        return objHandler.findOffer(this);
    });
}

GetNoun = function (number, one, two, five) {
    number = Math.abs(number);
    number %= 100;
    if (number >= 5 && number <= 20) {
        return five;
    }
    number %= 10;
    if (number == 1) {
        return one;
    }
    if (number >= 2 && number <= 4) {
        return two;
    }
    return five;
};

function initFanc() {
    $(".js-add-by-art").each(function () {
        var $this = $(this);
        $this.fancybox({
            type: "ajax",
            ajax: {
                type: "POST",
                data: "order=" + $this.attr("data-order")
            }
        });
    });
}

initFanc();

$(document).on(
    "submit",
    ".js-add-by-art-form",
    function (e) {
        var $this = $(this);
        e.preventDefault();
        $.ajax({
            url: $this.attr("action"),
            method: $this.attr("method"),
            dataType: "html",
            data: $this.serialize(),
            success: function (result) {
                var $result = $(result);
                if ($result.filter(".b-add-product__error").length > 0) {
                    $this.find(".b-add-product.iblock").addClass("_error");
                } else {
                    $this.find(".b-add-product.iblock").removeClass("_error");
                }
                $this.find(".b-add-product__result-holder").html(result);
            }
        });

        return false;
    }
);

$(document).on(
    "click",
    ".js-add-to-order-by-artnumber",
    function (e) {
        var $this = $(this);
        var $fancybox = $this.parents().find(".b-add-product.iblock");
        var $productBlock = $this.parents().find(".b-add-product__result-item");
        var $qty = $productBlock.find(".js-add-quantity");
        var elementId = $this.attr("data-id");
        var orderId = $fancybox.find("#orderId").val();
        e.preventDefault();
        $.ajax({
            url: "/ajax/add_product_by_artnumber.php",
            method: "post",
            dataType: "json",
            data: {
                elementId: elementId,
                orderId: orderId,
                quantity: $qty.val()
            },
            success: function (result) {
                if (!result.hasOwnProperty("error")) {
                    $.fancybox.close();
                    $.ajax({
                        method: "get",
                        dataType: "html",
                        success: function (result) {
                            var $result = $(result);
                            var id = "#order-" + orderId;
                            $(id).html($result.find(id).html());
                            initFanc();
                        }
                    });
                }
            }
        });

        return false;
    }
);

$(document).ready(function () {
    var cityInput = $(".b-delivery-choose__town-select");

    cityInput.select2({
        theme: "main",
        minimumResultsForSearch: -1,
        language: "ru",
        width: "100%",
        tags: false,
        multiple: false,
        minimumInputLength: 2,
        ajax: {
            url: "/ajax/new/getCities.php",
            dataType: "json",
            type: "GET",
            quietMillis: 50,
            data: function (query) {
                return {
                    query: query
                };
            },
            processResults: function (data) {
                return {
                    results: $.map(data.results, function (item) {
                        var text = item.city;
                        if (item.parent) {
                            text = item.city + " (" + item.parent + ")";
                        }
                        return {
                            text: text,
                            id: item.id
                        };
                    })
                };
            }
        },
        language: {
            inputTooShort: function () {
                return "Пожалуйста, начните вводить название города.";
            },
            "noResults": function () {
                return "К сожалению, город не найден";
            },
            "searching": function () {
                return "Поиск...";
            }
        }
    });

    cityInput.on("select2:select", function (e) {
        preloader();
        $.post("/ajax/new/setCity.php", {
            city_id: $(this).val(),
            infoUser: JSON.stringify($("#bx-order-form").serializeArray())
        }, function (data) {
            if (data.status == "success")
                window.location.reload();
            else
                preloader();
        }, "json");
    });
});

$(document).ready(function () {
    var $checkbox = $("._show_legal_fields"),
        $companyInfo = $(".c-checkout__company-info");

    function triggerFieldsBlock() {
        if ($checkbox.is(":checked"))
            $companyInfo.show();
        else
            $companyInfo.hide();
    }

    $checkbox.on("change", triggerFieldsBlock);
    triggerFieldsBlock();
});

$(document).ready(function () {
    var $context = $(".b-order-registration"),
        $button = $(".b-order-registration__submit", $context),
        $passwordField = $("input[type=\"password\"]", $context);

    function updatePassword() {
        preloader();

        $.ajax({
            url: "/ajax/new/orderRegister.php",
            method: "post",
            data: {
                pass: $passwordField.val()
            },
            dataType: "json",
            success: function (result) {
                if (result.status == "success")
                    window.location.reload();
                else {
                    var modal = $("#order-register-modal"),
                        errorContainer = $(".order-errors-container", modal);

                    errorContainer.html(result.message);

                    $.fancybox.open(
                        modal, {
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
                                $(".fancybox-wrap").appendTo(".fancybox-overlay");
                            }
                        }
                    );
                }
                preloader();
            }
        });
    }

    $button.on("click", updatePassword);
});

$(document).ready(function () {
    var $bonuscardForm = $(".c-lk__card-activation:not(.js-disable-blockjs)"),
        $bonuscardApply = $(".b-bonus-card__activation", $bonuscardForm),
        $agreementCheckbox = $("._agreement_bonuscard", $bonuscardForm);

    if ($bonuscardForm.length) {
        function checkAgreement() {
            if ($agreementCheckbox.prop("checked")) {
                $bonuscardApply.prop("disabled", false);
                $bonuscardApply.removeClass("_disabled");
            } else {
                $bonuscardApply.prop("disabled", "disabled");
                $bonuscardApply.addClass("_disabled");
            }
        }

        $("._agreement_bonuscard_wrap").on("click", function () {
            checkAgreement();
        });
        checkAgreement();
    }
});

$(".js-detail-page-questions-block").on("questions", function () {
    var $questionModal = $(".b-questions-answer-modal"),
        $form = $("form", $questionModal),
        $submitButton = $(".button", $form);

    $submitButton.on("click", function () {

        preloader();
        $form.ajaxSubmit({
            method: "post",
            dataType: "json",
            success: function (result) {
                var text = "Ваш вопрос принят и на него вскоре ответит оператор, спасибо.";
                var header = "Ваш вопрос принят!";
                if (result.status == "error") {
                    text = result.message;
                    header = "Ошибка!";
                }

                $("#errorResult").text(text);
                $("#headerModalr").text(header);
                $(".b-faq-block__text-area textarea").val("");

                $.fancybox.open(
                    $("#question-result"), {
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
});

$(document).ready(function () {
    var $personalQuestionButton = $(".b-faq-block__send");

    $personalQuestionButton.on("click", function () {
        var $formHolder = $personalQuestionButton.closest(".b-faq-block__ui-holder"),
            $form = $("form", $formHolder);

        preloader();
        $form.ajaxSubmit({
            method: "post",
            success: function () {
                console.log("good");
                $.fancybox.open(
                    $("#question-result"), {
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
                window.location.reload();
            },

            error: function () {
                console.log("bad");
            }
        });

    });

});


$(document).on("click", ".cstmMore", function () {

    $(this).parents(".b-stock-info__cols").find(".cstmdispnone").show();
    $(this).remove();
});


// товар другого цвета
$(document).on(clickEvent, ".b-product__color", function (e) {
    ajaxColorProduct(this, e);
});

function ajaxColorProduct(elem, e) {

    var $this, url, append, section, article;
    e.preventDefault();
    $this = $(elem);
    url = $this.attr("href");
    section = $this.attr("data-section");
    article = $this.attr("data-article");
    if (typeof url == "undefined")
        url = $this.attr("data-href");

    if (url && url.length > 0) {
        preloader();
        $.ajax({
            url: "/ajax/new/findCatalogProduct.php",
            data: {
                article: article,
                section: section
            },
            success: function (result) {

                $("main").html(result);

                var link = window.location.href;
                var arrLink = link.split("/");
                arrLink[arrLink.length - 2] = article;
                var link2 = arrLink.join("/");
                window.history.replaceState(null, null, link2);
                $(window).trigger("redraw");
                $(window).trigger("params");
                $(window).trigger("links");
                $(window).trigger("catalog");
                $(window).trigger("product");

                preloader();
            },
            complete: function () {
                $(".filter_summary").hide();
            }
        });
    }
    return false;
}