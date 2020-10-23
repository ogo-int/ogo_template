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
