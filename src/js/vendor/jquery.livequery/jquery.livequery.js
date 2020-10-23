// Livequery
(function($){
    var cash = [];
    $.fn.livequery = function (callback) {
        function checkBlocks() {
            var $context = $(this);
            var _tmp;
            var length = cash.length;

            for(var i = 0; i < cash.length;i++) {
                _tmp = $context.find(cash[i].selector);

                if(_tmp.length > 0 && !_tmp.data("live-checker")) {
                    _tmp.each(function() {
                        cash[i].callback.apply(this);
                        $(this).data("live-checker", true);
                    });
                }
            }

        }

        if(callback != null) {
            cash.push({
                selector: this.selector,
                callback: callback
            });

            return this.each(function () {
                var $elem = $(this);

                callback.apply(this);
                $elem.data("live-checker", true);
            });
        } else {
            return this.each(checkBlocks);
        }
    };
})(jQuery);
