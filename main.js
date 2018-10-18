jQuery(document).ready(function($){
    
    ratio = 0;

    window_pos = $(window).scrollTop() / $(document).height();
    // fall to middle between 0 and 0.35
    // hover from window_pos 0.35
    // falling from middle to ground at window_pos 1

    floor_pos = 50;

    bg = {
        element: $('.bg-image'),
        width: 0,
        original_width: 720
    }
    whale = {
        container: $('.whale'),
        element: $('.whale-img'),
        original_width: 75,
        width: 0,
        offset: - 50
    }

    // smoke = {
    //     width: 76,
    //     height: 118,
    //     start_offset: 40,
    //     end_offset: 334,
    //     top_offset: 42,
    //     vert_margin: 36,
    //     cols: 5,
    //     rows: 4,
    //     sheet_width: 470,
    //     sheet_height: 678,
    //     sheet: "img/smoke.png",
    // }

    // var setup_smoke = function(smoke){
    //     $('.smoke').css('background-image', 'url('+smoke.sheet+')');
    //     $('.smoke').css('width', smoke.sheet_width);
    //     $('.smoke').css('height', smoke.sheet_height);
    //     $('.smoke-mask').css('width', smoke.width);
    //     $('.smoke-mask').css('height', smoke.height);
    // }

    // col = 0;
    // row = 0;
    // var boom = function(){
    //     setTimeout(function(){
    //         $('.smoke').css('left', - smoke.start_offset - (col * smoke.width) + "px" );
    //         $('.smoke').css('top', - smoke.top_offset - (row * (smoke.height + smoke.top_offset)) + "px" );
    //         col++;
    //         console.log('move, i='+col);
    //         if(col < smoke.cols){
    //             boom();
    //         } else {
    //             row++;
    //             col = 0;
    //             boom();
    //         }
    //     },75);
    // }

    end_reached = false;

    var setup = function(){
        if($(window).width() <= 576){
            floor_pos = 160;
        } else if($(window).width() <= 768) {
            floor_pos = 140;
        } else {
            floor_pos = 120;
        }
    }

    var setup_bg = function(){
        bg.width = $('.bg-image').width();
        ratio = bg.element.width() / bg.original_width;
    }
    var whiggle = function(){
        whale.element.css("transform", "rotate(" + Math.sin($(window).scrollTop() / 100) * 20 + "deg)");
    }

    var setup_whale = function(){
        if($(window).width() <= 576){
            whale.width = whale.original_width * ratio * 3;
        } else if($(window).width() <= 768) {
            whale.width = whale.original_width * ratio * 2;
        } else {
            whale.width = whale.original_width * ratio;
        }
    }

    var scale_whale = function(){
        whale.element.css("width", whale.width+"px");
    }

    var fancy_animation = function(){
        whale.container.animate({
            top: $(window).height() - 0 + "px"
        }, 400, "linear", function(){
            whale.container.css("posiion", "absolute")
            whale.container.css("top", $(document).height() - 0 + "px");
        })
    }

    
    var animate = function(){
        if(! end_reached){
            if(window_pos < 0.345){
                whale.offset = window_pos * $(window).height() * 1.45;
                whale.container.css("top", whale.offset+"px");
                whiggle();
            } else if(window_pos >= 0.345 && window_pos < 1) {
                whale.offset = $(window).height() / 2;
                whale.container.css("top", whale.offset+"px");
                whiggle();
            } else {
                end_reached = true;
                console.log("end reached");
                fancy_animation();
            }
        }
    }

    var run = function(){
        setup();
        setup_bg();
        setup_whale();
        scale_whale();
        console.log("ratio = "+ratio);
        console.log("bg-width = "+bg.width);
        console.log("whale-width = "+whale.width);
    }

    run();
    animate();

    $(window).scrollTop(0);
    
    $(window).resize(function(){
        run();
    })
    $(window).scroll(function(){
        window_pos = $(window).scrollTop() / ($(document).height() - $(window).height());
        console.log(window_pos);
        animate();
    })

    var notagain = new Sprite(
        "img/notagain.png",
        385,
        192,
        75,
        46,
        1,
        1,
        2,
        2,
        5,
        4,
        "#notagain",
        ratio
    )
    notagain.animate();
    
    var hallogrund = new Sprite(
        "img/hallogrund.png",
        936,
        264,
        142,
        56,
        2,
        2,
        2,
        2,
        6,
        4,
        "#hallogrund",
        ratio
    )
})