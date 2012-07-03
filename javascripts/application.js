$(document).ready(function(){
  home.startup();
})

var home = {
    startup : function(){
        home.river = new Array();
        var river = $('.river');
        
        river.each(function(index) {
          home.river.push(new River($(this),{
              arrow_left: $(this).parent().find('.go_left'),
              arrow_right: $(this).parent().find('.go_right')}))
        });
        
        $('a.lightbox').lightBox({  txtImage: 'Imagem',
                                    txtOf: 'de',
	                                imageBtnClose:'/images/lightbox-btn-close.jpg',
	                                imageBtnPrev: '/images/lightbox-btn-prev.jpg',
	                                imageBtnNext: '/images/lightbox-btn-next.jpg',});
	      
	      $("a.modal").fancybox({
        		maxWidth	: 800,
        		maxHeight	: 600,
        		fitToView	: false,
        		width		: '70%',
        		height		: '70%',
        		autoSize	: true,
        		closeClick	: true,
        		openEffect	: 'fade',
        		closeEffect	: 'none'
      	});
    }
}

var River = function(obj,options){
    var that  = this;
    this.obj  = obj;
    this.arrow_left = options.arrow_left;
    this.arrow_right = options.arrow_right;
    this.container = undefined;
    this.current = undefined;
    this.elements = new Array();
    this.canMove = true;
    
    this.startup = function(){
      this.build_struture(); 
      this.readElements();
      
      this.arrow_right.click(function(event) {
        that.goRight();
      });
      this.arrow_left.click(function(event) {
        that.goLeft();
      });
      
      $(document).unbind('keydown');
      $(document).keydown(function(e) {
          if (e.keyCode == 37) { that.goLeft(); }
          if (e.keyCode == 39) { that.goRight(); }
      });
    },
    this.build_struture = function(){
        this.obj.children().wrapAll($("<div class='river-container'></div>"));
        this.container = this.obj.children().first();
        this.obj.css({"overflow":"hidden","float":"left"});
        this.container.css({"width":999999});
    },
    this.readElements = function(){
        this.container.children().each(function(index) {
          that.elements.push(new RiverElement($(this),index));
        });
        
        var current_element =this.elements[0];
        current_element.setCurrent();
        this.current = current_element;
    },
    this.goRight = function(){
        if(!this.canMove){return false;}
        
        var next_element = this.elements[this.current.position + 1];
        if(next_element !== undefined){
            this.canMove    = false;
            this.current.removeCurrent();
            this.container.stop(true).animate({"marginLeft": parseInt(this.container.css("marginLeft").split('px')[0]) - next_element.obj.outerWidth(true)}, 300, function(){ 
                that.canMove = true; 
            });
            this.current = next_element;
            this.current.setCurrent();            
        }
    },
    this.goLeft = function(){
        if(!this.canMove){return false;}
        
        var prev_element = this.elements[this.current.position - 1];
        if(prev_element !== undefined){
            this.canMove    = false;
            this.current.removeCurrent();
            this.container.stop(true).animate({"marginLeft": parseInt(this.container.css("marginLeft").split('px')[0]) + prev_element.obj.outerWidth(true)}, 300, function(){ 
                that.canMove = true;
            });
            this.current = prev_element;
            this.current.setCurrent();            
        }
    }
    this.startup();
}

var RiverElement = function(obj,index){
    var that = this;
    this.obj = obj;
    this.position = index;
    
    this.setCurrent = function(){
        this.obj.addClass('current');
    },
    
    this.removeCurrent = function(){
        this.obj.removeClass('current');
    }
}