$(".owl-carousel").owlCarousel({ 
    loop:true,
    margin:10,
    nav:true,
    dots:false,
    navText: ["<img src='/gaming/images/left-chevron.png'>","<img src='/gaming/images/right-chevron.png'>"],
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        860:{
            items:3
        },
        1050:{
            items:4
        }
    }
});

$(".owl-carousel6").owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    lazyLoad: true,
    dots:false,
    navText: ["<img src='/gaming/images/left-chevron.png'>","<img src='/gaming/images/right-chevron.png'>"],
    responsive:{
        0:{
            items:1
        },
        450:{
            items:2
        },
        650:{
            items:3
        },
        900:{
            items:4
        },
        1050:{
            items:5
        }
    }
});

$(".owl-carousel5").owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    lazyLoad: true,
    dots:false,
    navText: ["<img alt='owl-prev' src='/gaming/images/left-chevron.png'>","<img alt='owl-next' src='/gaming/images/right-chevron.png'>"],
    responsive:{
        0:{
            items:1
        },
        450:{
            items:2
        },
        650:{
            items:3
        },
        900:{
            items:4
        },
        1050:{
            items:5
        }
    }
});

$(".owl-carousel5 .owl-stage").before( "<div class=\"title-bg\">КОМПЛЕКТУЮЩИЕ</div>" );
$(".owl-carousel6 .owl-stage").before( "<div class=\"title-bg\">АКСЕССУАРЫ</div>" );
