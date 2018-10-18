class Background{
    constructor(element, original_width){
        this.element = element;
        this.original_width = original_width;
        this.width = $(element).width();
        this.ratio = this.width / this.original_width;

        // this.addEventListener("scale_changed", function(){
        //     this.calc_ratio.bind(this);
        // })
    }

    calc_ratio(){
        this.width = $(element).width();
        this.ratio = this.width / this.original_width;
    }

    log(){
        console.log(this.ratio);
    }

    update(base){
    }
}