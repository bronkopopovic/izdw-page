class Sprite {
    constructor(
        sheet,
        sheet_width,
        sheet_height,
        frame_width, 
        frame_height, 
        offset_left, 
        offset_top,
        margin_col,
        margin_row,
        cols,
        rows,
        target_container,
        scale_ratio
    ){
        // DEFINITIONS
        this.sheet = sheet;
        this.sheet_width = sheet_width;
        this.sheet_height = sheet_height;
        this.frame_width = frame_width;
        this.frame_height = frame_height;
        this.offset_left = offset_left;
        this.offset_top = offset_top;
        this.margin_col = margin_col;
        this.margin_row = margin_row;
        this.cols = cols;
        this.rows = rows;
        this.target_container = target_container;
        
        // SETUP
        $(target_container).append('<img class="sprite" src="'+ this.sheet +'"></img>');
        this.mask = $(target_container);
        this.sprite = $(target_container).find('.sprite');
        this.sprite.css('position', 'absolute');
        //this.sprite.css('background-image', 'url('+this.sheet+')');
        this.sprite.css('width', this.sheet_width);
        this.sprite.css('height', this.sheet_height);
        this.mask.css('width', this.frame_width);
        this.mask.css('height', this.frame_height);
        //this.mask.css('transform', 'scale(2)');

        // INIT ANIMATION VARIABLES
        this.col = 0;
        this.row = 0;
    }

    step_forward(){
        this.sprite.css('left', - (this.offset_left + this.col * (this.margin_col + this.frame_width) ) + "px");
        this.sprite.css('top', - (this.offset_top + this.row * (this.margin_row + this.frame_height) ) + "px" );
        this.col++;
        console.log('move, i='+this.col);
        console.log(this.sprite);
        if(this.col < this.cols){
            this.animate();
        } else {
            this.row++;
            this.col = 0;
            if(this.row < this.rows){
                this.animate();
            }
        }
    }

    animate(){
        setTimeout(this.step_forward.bind(this), 100);
    }

}