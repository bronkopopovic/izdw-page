class Base{
    constructor(original_size){
        this.original_size = original_size;
        this.ratio = $(window).width() / original_size;

        this.objects = [];
    }

    addObject(object){
        this.objects.push(object);
    }

    recalc(){
        this.ratio = $(window).width() / this.original_size;
    }

    getRatio(){
        return this.ratio;
    }
}