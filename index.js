
module.exports = class Xllax {
	constructor(id) {
		const that = this;
		this.offsetTop = 0;
		this.screen = {width: 0, height: 0};
		this.lastYPosition = 0;
		this.lerpLevel = 0.05;
		this.id = id;

		//Bindings
		this.bindings(id);
	}

	render(el) {
		const that = this;
		const hasLaxDistance = el.hasAttribute('data-lax-distance');
		const isCenter = el.hasAttribute('data-lax-center');

		let laxDistance;
		if (hasLaxDistance) {
			laxDistance = Number(el.dataset.laxDistance);
		}

		// The screen height 0.5 and laxDistance * 0.5 thing
		// Is to ensure that the el stays in the middle
		// of the screen
		let differenceFromTopOfView = (this.offsetTop + this.screen.height) - el.offsetTop;
		if (isCenter) {
			differenceFromTopOfView = (this.offsetTop + (this.screen.height * 0.5) + (laxDistance * 0.5)) - el.offsetTop;
		}

		//This attribute auto-calculates the speed
		//If you know the distance you want to cover
		//While the screen scrolls over it
		let speed = 0;
		if (hasLaxDistance) {
			const elHeight = el.getBoundingClientRect().height;
			const windowHeight = this.screen.height;
			speed = laxDistance / (elHeight + windowHeight + laxDistance);
		}

		let whereShouldBe = differenceFromTopOfView * speed;
		this.lastYPosition = lerp(this.lastYPosition, whereShouldBe, this.lerpLevel);


		let transform = `translateY(${this.lastYPosition}px)`;
		if (el.hasAttribute("data-lax-horizontal")) {
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
		this.offsetTop = getTopOffset();
		window.addEventListener('scroll', (e) => {
			that.offsetTop = getTopOffset();
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

function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();

    return rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight)
}

