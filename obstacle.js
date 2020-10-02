class Obstacle {
	constructor(x, y) {
		this.position = createVector(x, y);
		this.color = [random(100), random(100), random(100)];
	}

	draw() {
		ellipseMode(CENTER);
		fill(this.color);
		ellipse(this.position.x, this.position.y, 50, 50);
	}
}