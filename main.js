var particules = []
var bg = null;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	bg = createGraphics(width, height);
	for (let _ = 0; _ < 100; ++_)
		particules.push(new Particule());
}

function draw() {
	background(0);
	bg.noStroke();
	bg.fill(0, 0, 0, 50);
	bg.rect(0, 0, width, height);
	image(bg, 0, 0, width, height);
	particules.forEach(p => {
		p.update();
		p.draw();
	});
}