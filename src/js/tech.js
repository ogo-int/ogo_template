$(function () {
    $(".tech-holder").each(function () {
        var $context = $(this);
        var $slider = $("<div class=\"tech-holder__slider\"><input type=\"text\"/></div>");
        var $sliderInput = $slider.find("input");
        var $sliderHandleVal = $("<span class=\"handle-val\"></span>");
        var $edgeLink = $("<a href=\"#\" class=\"tech-holder__highlight\">Края</a>");
        var $fontInput = $("<input type=\"text\"/>");

        var width = $context.data("width") || $context.width();
        var maxWidth = $(window).width();
        var minWidth = $context.data("min") || 50;
        var sliderStep = $context.data("step") || 1;
        var sliderTimeout;


        var changeSliderVal = function (val) {
            $sliderInput.val(val);
        };

        var changeContextWidth = function (val) {
            var $targets = $context.find(".iblock, .js-equalizer");
            $context.width(val);
            $targets.trigger("resize.block");
        };

        var changeHandleVal = function (val) {
            $sliderHandleVal.text(val);
        };

        var changeBaseFontSize = function (val) {
            $context.css("font-size", val);
        };

        if ($context.hasClass("_gray")) {
            $context.wrap("<div class=\"tech-holder__main-wrap _gray\"></div>");
        } else {
            $context.wrap("<div class=\"tech-holder__main-wrap\"></div>");
        }

        $context.before($slider);

        $slider.wrap("<div class=\"content-center\" style=\"position: relative;\"></div>");

        $slider.slider({
            min: minWidth,
            max: maxWidth,
            step: sliderStep,
            value: width,
            range: "min",

            create: function (event, ui) {},

            slide: function (event, ui) {
                changeSliderVal(ui.value);
                changeHandleVal(ui.value);
                changeContextWidth(ui.value);
            },

            change: function () {
                var $targets = $context.find(".iblock");
                $targets.trigger("resize.block");
            }
        });

        $sliderHandleVal.text(width);

        $slider
            .find(".ui-slider-handle")
            .append($sliderHandleVal);

        $slider.before($edgeLink);
        $slider.before($fontInput);

        $edgeLink.on("click", function () {
            $context.toggleClass("_highlighted");
            return false;
        });

        $fontInput
            .css({
                position: "absolute",
                right: 0,
                width: 70,
                top: "50%",
                marginTop: -20
            })
            .on("change", function () {
                var $this = $(this);
                $context.css("font-size", $this.val() + "px");
            });

        changeContextWidth(width);
        $sliderInput.val(width);
        $sliderInput.on("change", function () {
            var val = $(this).val();
            $slider.slider("value", val);
            changeContextWidth(val);
            changeHandleVal(val);
        });
    });
});