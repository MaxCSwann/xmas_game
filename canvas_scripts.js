var imgs = {};
var canvas = document.getElementById('canvas');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
var cw = canvas.width;
var ch = canvas.height;
var ctx = canvas.getContext('2d');
var santa;
var mousePos = [300, 300];
var counter = 0;

function init() {
  var sources = {
      cover: 'images/house_cross-section-cover.png',
      xray: 'images/house_cross-section.png',
      santa_icon: 'images/santa.png'
  }

  ImageLoader(sources, function(images){
      imgs = images;
      window.requestAnimationFrame(draw);
      santa = new Santa();
  });

  
}

function draw(){
    //ctx.globalCompositeOperation = 'copy';
    ctx.clearRect(0, 0, cw, ch);
    //cover image

    //need to save and restore clip for clearRect to work
    //explanation here: https://stackoverflow.com/questions/56088068/how-do-i-perform-clearrect-in-canvas-after-clip
    ctx.save();
    ctx.drawImage(imgs.cover, 0, 0, cw, ch);

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.ellipse(mousePos[0], mousePos[1], 30, 30, 0, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.clip();

    //xray image
    ctx.drawImage(imgs.xray, 0, 0, cw, ch);

    //santa
    santa.display()
    ctx.restore();

    ctx.save();
    ctx.font = "30px Arial";
    ctx.fillText(counter, 10, 50);
    ctx.restore();
    //recurse
    window.requestAnimationFrame(draw);

}

//return 2d positon array
//passing canvas is irrelevant cause canvas is global scope but leaving in cause might change that later
function getMousePosition(canvas, event){
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    var pos = [x, y];

    return pos;
}
//event listeners
canvas.addEventListener('mousedown', function(event) {
    
    var pos = getMousePosition(canvas, event);

    if(pos[0]>santa.xpos&&pos[0]<(santa.xpos+santa.width) && pos[1]>santa.ypos&&pos[1]<(santa.ypos+santa.height)){
        console.log("hello");
        santa.clicked();
        //could run load end screen here
    }

}, false);

canvas.addEventListener('mousemove', function(event) {
    var pos = getMousePosition(canvas, event);
    mousePos = pos;

    // if(pos[0]>santa.xpos&&pos[0]<(santa.xpos+santa.width) && pos[1]>santa.ypos&&pos[1]<(santa.ypos+santa.height)){
    //     console.log("run animation");
    //     //could run load end screen here
    // }
}, false);

function Santa(){
	this.icon = imgs.santa_icon; 
	this.width = 50;
	this.height = 50;
    this.xpos = random(0, (cw-this.width));
	this.ypos = random(0, (ch-this.height));

	this.display = function(){
        ctx.drawImage(this.icon, this.xpos, this.ypos, this.width, this.height);
		//image(this.icon, this.xpos, this.ypos, 50, 50)
    }
    this.move = function(x, y){
        this.xpos += x;
        this.ypos += y;
    }
    this.randomPos = function(){
        this.xpos = random(0, (cw-this.width));
	    this.ypos = random(0, (ch-this.height));
    }
	this.clicked = function(){
        console.log("santa clicked");
        counter++;
        this.randomPos();
        //could trigger animation here or something
	}
}

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


function ImageLoader(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;

    // get num of sources
    for (var src in sources) {
        numImages++;
    }

    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function() {

            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}

init();