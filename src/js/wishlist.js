$(document).ready(function(){
  alert(2);
  $(document).on("click", ".js-add-product_to-list", function(e) {
    if( $(this).attr("data-action") == "del" )
      $(this).closest(".js-item").remove();
  });
});