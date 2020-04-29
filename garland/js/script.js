(function (){

	const divBox = document.querySelector('div.garland');
	const MIN_RADIUS = 10;
	const MAX_RADIUS = 30;
	const WIDTH = divBox.clientWidth;
	const HEIGHT = divBox.clientHeight;
	const MIN_DISTANCE = 100;
	const MAX_ATTEMPT_COUNT = 100; 
	const COLORS = ['blue', 'green', 'red', 'yellow'];
	const INTERVAL = 1000;
	let timerId;

	Math.rndInt = function (min, max) {
		return Math.floor(min + Math.random() * (max + 1 - min));
	}

	const GARLAND = createGarlandArray();
	generateDivGarland();
	//render();

	let startBtn = document.querySelector('.btn__start');
	let stopBtn = document.querySelector('.btn__stop');
	startBtn.addEventListener('click', function() {
		startBtn.style.display = 'none';
		stopBtn.style.display = 'block';
		timerId = setInterval(garlnadChangeColor, 1000);
	});
	stopBtn.addEventListener('click', function() {
		startBtn.style.display = 'block';
		stopBtn.style.display = 'none';
		clearInterval(timerId);
	});
	


	function createGarlandArray() {
		let res = [];
		let attemptCount = 0;
		while(true) {
			let point = getRandomPoint();
			if (testP(point)) {
				res.push(point);
				attemptCount = 0;
			}
			else attemptCount++;
			if (attemptCount > MAX_ATTEMPT_COUNT) break;
		}
		console.log(res);
		return res;
	
		function getRandomPoint() {
			return {
				x: Math.rndInt(MAX_RADIUS, WIDTH - MAX_RADIUS),
				y: Math.rndInt(MAX_RADIUS, HEIGHT - MAX_RADIUS),
				r: Math.rndInt(MIN_RADIUS, MAX_RADIUS),
				c: Math.rndInt(0, COLORS.length - 1)
			};
		}
		function testP(point) {
			return res.every(e => {
				let a = e.x - point.x;
				let b = e.y - point.y;
				let distance = Math.sqrt(a * a + b * b);
				return distance >= MIN_DISTANCE;
			});
		}
	}

	function generateDivGarland() {
		GARLAND.forEach(point => {
			let span = document.createElement('span');
			span.style.left = point.x + 'px';
			span.style.top = point.y + 'px';
			span.style.width = span.style.height = point.r * 2 + 'px';
			span.style.backgroundColor = COLORS[point.c];
			span.dataset.colorIndex = point.c;
			divBox.appendChild(span);
		});
	}


	function garlnadChangeColor() {
		divBox.querySelectorAll('span').forEach(span => {
			let oldColor = +span.dataset.colorIndex;
			let newColor;
			do {
				newColor = Math.rndInt(0, COLORS.length - 1);
			} while (oldColor === newColor);
			span.dataset.colorIndex = newColor;
			span.style.backgroundColor = COLORS[newColor];
		});
	}

})();

