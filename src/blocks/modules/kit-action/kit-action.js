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