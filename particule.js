class Particule {
	constructor() {
		this.VISION = 50;
		this.MAX_ACCELERATION = 1;
		this.MAX_VELOCITY = 6;
		this.MASS = 5;
		this.INITIAL_SPEED = 5;
		this.SEPARATION_FACTOR = 3;
		this.ALIGNMENT_FACTOR = 1;
		this.COHESION_FACTOR = 0.1;
		this.position = createVector(random(width), random(height));
		this.velocity = p5.Vector.random2D();
		this.velocity.mult(this.INITIAL_SPEED);
		this.acceleration = createVector(0, 0);
		this.color = [random(100, 255), random(100, 255), random(100, 255)];
		this.neighbours = null;
	}

	limitPosition(pos) {
		pos.x = pos.x % width;
		if (pos.x < 0)
			pos.x = width;
		pos.y = pos.y % height;
		if (pos.y < 0)
			pos.y = height;
		return (pos);
	}

	update() {
		this.getNeighbours();
		this.separation();
		this.alignment();
		this.cohesion();
		this.obstacle();
		this.acceleration.limit(this.MAX_ACCELERATION);
		this.acceleration.mult(1 / this.MASS);
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.MAX_VELOCITY);
		this.acceleration.set(0, 0);
		this.position.add(this.velocity);
		this.position = this.limitPosition(this.position);
	}

	draw() {
		fill(this.color);
		noStroke();
		push();
		translate(this.position.x, this.position.y);
		rotate(this.velocity.heading() - PI / 2);
		beginShape();
		vertex(0, 15);
		vertex(-5, -5);
		vertex(5, -5);
		endShape();
		pop();
		bg.fill(this.color);
		bg.ellipse(this.position.x, this.position.y, 5, 5);
	}

	getNeighbours() {
		this.neighbours = [];
		for (let other of particules) {
			if (other !== this) {
				const d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
				if (d < this.VISION) {
					other.distance = d;
					this.neighbours.push(other);
				}
			}
		}
	}

	separation() {
		if (this.neighbours.length === 0)
			return;
		for (let n of this.neighbours) {
			const vec = createVector(this.position.x - n.position.x, this.position.y - n.position.y);
			if (n.distance !== 0)
				vec.mult(this.SEPARATION_FACTOR / n.distance);
			this.acceleration.add(vec);
		}
	}

	obstacle() {
		for (let o of obstacles) {
			const d = dist(o.position.x, o.position.y, this.position.x, this.position.y);
			if (d < 150) {
				const vec = createVector(this.position.x - o.position.x, this.position.y - o.position.y);
				if (d !== 0)
					vec.mult(30 / d);
				this.acceleration.add(vec);
			}
		}
	}

	alignment() {
		if (this.neighbours.length === 0)
			return;
		let mean_velocity = createVector(0, 0);
		for (let n of this.neighbours)
			mean_velocity.add(n.velocity);
		if (this.neighbours.length !== 0)
			mean_velocity.div(this.neighbours.length);
		let force = p5.Vector.sub(mean_velocity, this.velocity);
		force.mult(this.ALIGNMENT_FACTOR);
		this.acceleration.add(force);
	}

	cohesion() {
		if (this.neighbours.length === 0)
			return;
		let mean_position = createVector(0, 0);
		for (let n of this.neighbours)
			mean_position.add(n.position);
		if (this.neighbours.length !== 0)
			mean_position.div(this.neighbours.length);
		let force = p5.Vector.sub(mean_position, this.position);
		force.mult(this.COHESION_FACTOR);
		this.acceleration.add(force);
	}

}