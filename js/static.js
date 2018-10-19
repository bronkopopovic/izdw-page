class Static {
    constructor(
        container, 
        element, 
        original_width, 
        ratio,
        offset
    ){
        this.container = $(container);
        this.element = $(element);
        this.original_width = original_width;
        this.ratio = ratio;
        this.width = this.original_width * ratio;
        this.offset = offset;

        this.container.css('width', this.width);

        this.shown = false;
        this.finished = false;
    }

    whiggle(freq, strength){
        this.element.css(
            "transform", 
            "rotate(" + Math.sin($(window).scrollTop() / 400 * freq) * (strength * 20) + "deg)"
        );
    }

    scale(){
        this.element.css("width", this.width+"px");
    }
    
    calc_scale(){
        if($(window).width() <= 576){
            // smartphone
            this.width = this.original_width * this.ratio * 3;
            this.scale.bind(this)
        } else if($(window).width() <= 768) {
            // tablet
            this.width = this.original_width * this.ratio * 2;
            this.scale.bind(this)
        } else {
            // desktop
            this.width = this.original_width * this.ratio;
            this.scale.bind(this)
        }
    }

    show(top){
        if(!this.shown){
            this.container.animate({
                top: top + "%"
            }, 2000)
            this.shown = true;
        }
    }

    update(base){
        this.ratio = base.ratio;
        this.width = this.original_width * this.ratio;
        console.log(this.width);
        this.container.css("width", this.width+"px");
    }

    end_pos(){
        this.container.css("posiion", "absolute")
        this.container.css("top", $(document).height() - (200 * this.ratio) + "px");
    }
    finish(){
        this.element.css('display', 'none');
        this.finished = true;
    }
    drop(){
        if(!this.finished){
            this.container.animate({
                top: $(window).height() - (40 * Math.floor(this.ratio) ) + "px"
            }, 400, "linear", this.finish.bind(this));
        }
    }
}