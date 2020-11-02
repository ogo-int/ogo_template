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