var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var plane = new Image();
var bg = new Image();
var fg = new Image();
var obstaclesUp = new Image();
var obstaclesDown = new Image();

plane.src = "plane.png";
bg.src = "bg.png";
fg.src = "fg.png";
obstaclesUp.src = "obstaclesUp.png";
obstaclesDown.src = "obstaclesDown.png";

// zwuk
var fly = new Audio();
var scoreAudio = new Audio();

fly.src = "fly.mp3";
scoreAudio.src = "scoreAudio.mp3";

var hole = 90;

// klacannia po knopci
document.addEventListener("keydown", flyUp);

function flyUp(){
	yPos -= 25;
	fly.play();
}

// bloky
var obstacles = [];

obstacles[0] = {
	x : cvs.width,
	y : 0
}
var score = 0;

// pozycija litaka
var xPos = 10;
var yPos = 150;
var gravit = 1.5;

function draw(){
	ctx.drawImage(bg, 0, 0);

	for (var i = 0; i < obstacles.length; i++) {
	ctx.drawImage(obstaclesUp, obstacles[i].x, obstacles[i].y);
	ctx.drawImage(obstaclesDown, obstacles[i].x, obstacles[i].y + obstaclesUp.height + hole);
	
	obstacles[i].x --;

	// widstan miz blokamy
	if(obstacles[i].x == 225){
		obstacles.push({
			x : cvs.width,
			y : Math.floor(Math.random() * obstaclesUp.height) - obstaclesUp.height});
	}

	if (xPos + plane.width >= obstacles[i].x 
	    && xPos <= obstacles[i].x + obstaclesUp.width 
	    && (yPos <= obstacles[i].y + obstaclesUp.height 
		|| yPos + plane.height >= obstacles[i].y + obstaclesUp.height + hole) 
		|| yPos + plane.height >= cvs.height - fg.height){
		location.reload(); 
	} 

		if (obstacles[i].x == 1) {
			score ++;
			scoreAudio.play();
		}
	}

	ctx.drawImage(fg, 0, cvs.height - fg.height);
	ctx.drawImage(plane, xPos, yPos);

	yPos += gravit;

	ctx.fillStyle = "#000";
	ctx.font = "24px Verdana";
	ctx.fillText("Score: " + score, 10, cvs.height - 25);

	requestAnimationFrame(draw);
}

// teper wpewnenni szczo wsi kartynky zahruzylys
obstaclesDown.onload = draw;
