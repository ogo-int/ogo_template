// Аккордион доставки и самовывоза товара
$(function () {

  var $container = ".b-product-delivery__section";
  var $toggler = ".b-product-delivery__section-title";
  var $content = ".b-product-delivery__section-body";

  function toggleContainer () {
    var $this = $(this);
    $this.siblings($content).slideToggle('fast');
    $this.parents($container).toggleClass("_open");
  }

   $(document).on('click', $toggler, toggleContainer);
});