var particules = [];
var obstacles = [];
var bg = null;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	bg = createGraphics(width, height);
	for (let _ = 0; _ < 120; ++_)
		particules.push(new Particule());
	obstacles.push(new Obstacle(width / 2, height / 2));
}

function draw() {
	background(0);
	bg.noStroke();
	bg.fill(0, 0, 0, 50);
	bg.rect(0, 0, width, height);
	image(bg, 0, 0, width, height);
	obstacles.forEach(o => {
		o.draw();
	});
	particules.forEach(p => {
		p.update();
		p.draw();
	});
}