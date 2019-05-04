
module.exports = class Xllax {
	constructor(id, options) {
		const that = this;
		this.scrollTop = 0;
		this.screen = {width: 0, height: 0};
		this.lastYPosition = 0;
		this.id = id;

		//Options
		this.lerpLevel = options.drag ? options.drag : 0.05;
		this.laxDistance = options.distance ? options.distance : 0;
		this.center = options.center ? options.center : true;
		this.horizontal = options.horizontal ? options.horizontal : false;
		this.id = id;

		//Bindings
		if (!options.distance) return console.error('A distance must be supplied for Xllax')
		this.bindings(id);
	}

	render(el) {
		const that = this,
			  isCenter = this.center,
			  laxDistance = this.laxDistance,
			  screenHeight = this.screen.height,
			  scrollTop = this.scrollTop,
			  isHorizontal = this.horizontal,
			  elHeight = el.getBoundingClientRect().height;

		let differenceFromTopOfView = (scrollTop + screenHeight) - el.offsetTop;
		if (isCenter) {
			//Ensure by the time the el is in the center of the screen
			//It's at translate(0, 0)
			differenceFromTopOfView = el.offsetTop - (scrollTop + ((screenHeight * 0.5) - elHeight));
		}

		//This attribute auto-calculates the speed
		//If you know the distance you want to cover
		//While the screen scrolls over it
		const speed = laxDistance / (elHeight + screenHeight + laxDistance);

		const whereShouldBe = differenceFromTopOfView * speed;
		this.lastYPosition = lerp(this.lastYPosition, whereShouldBe, this.lerpLevel);

		let transform = `translateY(${this.lastYPosition}px)`;
		if (isHorizontal) {
			transform = `translateX(${this.lastYPosition}px)`;
		}

		el.style.transform = transform;
		el.style.webkitTransform = transform;
		el.style.msTransform = transform;

		if (document.getElementById(this.id) !== null) {
			requestAnimationFrame(() => this.render(el));
		}
	}

	bindings(id) {
		const that = this;

		//On scroll
		this.scrollTop = getTopOffset();
		window.addEventListener('scroll', (e) => {
			that.scrollTop = getTopOffset();
		});

		//On resize
		this.screen = getScreenDimensions();
		window.addEventListener('resize', () => this.screen = getScreenDimensions());

		//Parallax through ID
		const el = document.getElementById(id);
		that.render(el);
	}
}

function getScreenDimensions () {
	const width = window.innerWidth;
	const height = window.innerHeight;
	return {width, height};
}

function getTopOffset () {
	const offsetTop = window.scrollY;
	return offsetTop;
}

const lerp = (a, b, n) => (1 - n) * a + n * b;


