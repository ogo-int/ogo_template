// Прижимаем футер
$(function () {
    var $page = $(".page-wrapper");
    var $footer = $(".page-footer");
    var isSet = false;
    var footerHeight;
    var contentHeight;
    var winHeight;

    function footerBottom () {
        winHeight = $(window).height();
        footerHeight = $footer.height();
        contentHeight = $page.height();

        if(contentHeight < winHeight) {
            $("html, body").css("height", "100%");
            $(".page-wrapper").css("height", "100%");
            $(".wrap-for-footer").css({
                minHeight: "100%",
                paddingBottom: footerHeight
            });
            $(".page-footer").css({
                marginTop: - footerHeight
            });
            isSet = true;
        } else if(isSet) {
            $("html, body, .page-wrapper, .wrap-for-footer, .page-footer").css({
                height: "",
                minHeight: "",
                paddingBottom: "",
                marginTop: "",
            });
            isSet = false;
        }
    }

    footerBottom();
    $(window).on("resize", footerBottom);
});

// Сообщаяем блокам о готовности ymaps API
var ymapAPIready = false;

if(typeof ymaps !== "undefined") {
    ymaps.ready(function () {
        $(document).trigger("ymapAPIready");
        $(window).trigger("ymapAPIready");
        ymapAPIready = true;
    });
}

// Кроссбраузерный requestAnimationFrame
 	window.requestAnimFrame =
		window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback, element){
        callback();
    };

// jQuery-плагин для адаптации блоков от ширины контекста, а не от ширины экрана
(function($){
    var aB = $.adaptBlock = {
        _blocks: [],
        _oldWidndowWidth: $(window).width(),
        _newWindowWidth: 0,

        params: {
            resizeTimeout: 80
        },

        windowResizeHandler: function (e) {
            aB._newWindowWidth = $(window).width();

            if(aB._oldWidndowWidth == aB._newWindowWidth) {
                aB._oldWidndowWidth = aB._newWindowWidth;
                return;
            }

            aB._oldWidndowWidth = aB._newWindowWidth;

            if(aB.resizeTimeout !== undefined) clearTimeout(aB.resizeTimeout);

            aB.resizeTimeout = setTimeout(function() {
                aB.resizeElems();
            }, aB.params.resizeTimeout);
        },

        resizeElems: function () {
            for(var i = 0; i < aB._blocks.length; i++) {
                aB.setMedia(aB._blocks[i]);
            }
        },

        setMedia: function (block) {
            var $el = block.elem;
            var params = block.params;

            if(!$el.is(":visible")) return;

            var width = block.width = $el.parent().width();

            if(width < block.scope.max[0] || width > block.scope.max[1] || !block.scope.maxIsSet) {
                block.scope.max[1] = Infinity;
                block.scope.max[0] = 0;

                $.each(block.maxWidthArray, function (key, value) {
                    if(width <= value) {
                        $el.addClass(params.maxWidth[value]);
                        block.scope.max[1] = Math.min(value, block.scope.max[1]);
                    } else {
                        $el.removeClass(params.maxWidth[value]);
                        block.scope.max[0] = Math.max(value, block.scope.max[0]);
                    }
                });
                block.scope.maxIsSet = true;
            }

            $.each(block.minWidthArray, function (key, value) {
                if(width >= value) {
                    $el.addClass(params.minWidth[value]);
                } else {
                    $el.removeClass(params.minWidth[value]);
                }
            });


            if(block.params.watch) console.log(block);
        },

        initMedia: function (block) {
            var params = block.params;

            if(block.scope == null) {
                block.scope = {
                    max: [0, Infinity],
                    min: [0, Infinity],
                    isSet: false
                };
            }

            $.each(params.maxWidth, function (key, value) {
                block.maxWidthArray.push(parseInt(key));
            });

            $.each(params.minWidth, function (key, value) {
                block.minWidthArray.push(parseInt(key));
            });
        },

        addBlock: function (elem, options) {
            var block = {
                elem: elem,
                params: options,
                maxWidthArray: [],
                minWidthArray: []
            };

            aB._blocks.push(block);
            aB.initMedia(block);
            aB.setMedia(block);

            block.elem.on("resize.block", function (e)  {
                requestAnimFrame(function () { aB.setMedia(block); });
                e.stopPropagation();
            });
        },

        init: function () {
            $(window).on("resize", aB.windowResizeHandler);
        }
    };

    $.fn.adaptBlock = function (options) {
        var params = $.extend({
            maxWidth: {},
            minWidth: {}
        }, options);

        function init() {
            var $elem = $(this);

            if($elem.hasClass("_flexible")) {
                aB.addBlock($(this), params);
            }
        }

        return this.each(init);
    };

    aB.init();
})(jQuery);


BX.showWait = function(node, msg) //Переопределение функции для сокрытия прелоадера битрикса
{
    return;
};