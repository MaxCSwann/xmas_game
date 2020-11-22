let xray;
let santa_img;
let magnifying_mask;
let santas = [];
let magnifier = 30;
let transparent

function preload() {
	xray = loadImage('images/house_cross-section.png');
	cover = loadImage('images/house_cross-section-cover.png');
	magnifying_mask = loadImage('images/magnifying-mask.png');
	santa_img = loadImage('images/santa.png');
}

function setup() {
	pixelDensity(1);
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent('sketch-holder');
	
	image(xray, 0, 0, width, height);

	
	for(var i =0; i<5; i++){
		santas[i] = new Santa();
	}
	for(var i =0; i<santas.length; i++){
		santas[i].display();
	}
}

function draw() {
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(){
	for(var i =0; i<santas.length; i++){
		santas[i].clicked(mouseX, mouseY);
	}
}

function Santa(){
	this.icon = santa_img; 
	this.sizex = 50;
	this.sizey = 50;
	this.xpos = random(0, width-this.sizex);
	this.ypos = random(0, height-this.sizey);

	this.display = function(){
		image(this.icon, this.xpos, this.ypos, 50, 50)
	}
	this.clicked = function(mx, my){
		if(mx>this.xpos&&mx<(this.xpos+this.sizex) && my>this.ypos&&my<(this.ypos+this.sizey)){
			console.log("hello");
		}
	}
}
