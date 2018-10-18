require(['base', 'bg', 'static', 'sprite'], function(){

    
    jQuery(document).ready(function($){

        $(window).scrollTop(0);
        
        var base = new Base(720);
        
        var bg = new Background(".bg-image", 720);
        base.addObject(bg);

        var notagain = new Sprite(
            "img/notagain.png",
            385, 192, 1, 1, 2, 2, 5, 4,
            "#notagain", base.ratio, 100
        );
        base.addObject(notagain);

        var hallogrund = new Sprite(
            "img/hallogrund.png",
            936, 264, 1, 1, 2, 2, 6, 4,
            "#hallogrund", base.ratio, 100
        )
        base.addObject(hallogrund);

        var smoke = new Sprite(
            "img/smoke.png",
            200, 384, 1, 1, 2, 2, 5, 4,
            "#smoke", base.ratio, 75
        )
        smoke.position(100);
        base.addObject(smoke);

        var whale = new Static(
            ".whale", 
            ".whale-img", 
            75, base.ratio, - 50
        );
        base.addObject(whale);

        var pot = new Static(
            ".pot",
            ".pot-img",
            75, base.ratio, 50
        );
        base.addObject(pot);


        $(window).resize(function(){
            base.recalc();
            base.objects.forEach(function(obj){
                obj.update(base);
            })
            console.log(notagain.mask.css('left'));
        })
        
        $(window).scroll(function(){
            window_pos = $(window).scrollTop() / ($(document).height() - $(window).height());    
            
            whale.whiggle(1, 0.5);
            pot.whiggle(3, 0.3);
            
            if(window_pos > 0.2){
                whale.show(50);
            }
            if(window_pos > 0.3){
                pot.show(60);
            }

            if(window_pos > 0.7){
                notagain.animate();
            }
            if(window_pos > 0.99999){
                $("body").addClass('noscroll');
                whale.drop();
                setTimeout(function(){
                    smoke.animate();
                }, 400);
                setTimeout(function(){
                    smoke.hide();
                }, 1800);
                setTimeout(function(){
                    hallogrund.animate();
                }, 1800);
            }
        })
    })
});