class Sprite {
    constructor(
        sheet,
        sheet_width,
        sheet_height,
        offset_left, 
        offset_top,
        margin_col,
        margin_row,
        cols,
        rows,
        target_container,
        ratio,
        animation_offset
    ){
        // DEFINITIONS
        this.sheet = sheet;
        this.sheet_width = sheet_width;
        this.sheet_height = sheet_height;
        this.frame_width = sheet_width / cols - margin_col;
        this.frame_height = sheet_height / rows - margin_row;
        this.offset_left = offset_left;
        this.offset_top = offset_top;
        this.margin_col = margin_col;
        this.margin_row = margin_row;
        this.cols = cols;
        this.rows = rows;
        this.target_container = target_container;
        this.ratio = ratio;
        this.animation_offset = animation_offset;
        
        // SETUP
        $(target_container).append('<img class="sprite" src="'+ this.sheet +'"></img>');
        this.mask = $(target_container);
        this.sprite = $(target_container).find('.sprite');
        this.sprite.css('position', 'absolute');
        //this.sprite.css('background-image', 'url('+this.sheet+')');
        this.sprite.css('width', this.sheet_width);
        this.sprite.css('height', this.sheet_height);
        this.sprite.css('top', this.frame_height + this.offset_top + "px");
        this.sprite.css('left', this.frame_width + this.offset_left + "px");
        this.mask.css('width', this.frame_width);
        this.mask.css('height', this.frame_height);
        this.mask.css('transform', 'scale('+ this.ratio +')');

        // INIT ANIMATION VARIABLES
        this.col = 0;
        this.row = 0;
        this.frame_finished = true;
    }

    step_forward(){
        this.sprite.css('left', - (this.offset_left + this.col * (this.margin_col + this.frame_width) ) + "px");
        this.sprite.css('top', - (this.offset_top + this.row * (this.margin_row + this.frame_height) ) + "px" );
        this.col++;
        if(this.col < this.cols){
            this.frame_finished = true;
            this.animate();
        } else {
            this.row++;
            this.col = 0;
            if(this.row < this.rows){
                this.frame_finished = true;
                this.animate();
            }
        }
    }

    animate(){
        this.mask.css('display', 'block');
        if(this.frame_finished){
            this.frame_finished = false;
            setTimeout(this.step_forward.bind(this), this.animation_offset);
        }
    }

    bubble(){
        this.mask.css('top', '-45px');
        this.mask.css('left', '40px');
    }

    hide(){
        this.mask.css('display', 'none');
    }

    position(bottom){
        this.mask.css('bottom', bottom * this.ratio + 'px');
    }

    update(base){
        this.ratio = base.ratio;
        this.mask.css('transform', 'scale('+ this.ratio +')');
    }
}