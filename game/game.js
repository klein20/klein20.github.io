(function (){

	const maze = [
		'111111111111111111111',
		'100010000010001000001',
		'111010111010111011101',
		'100010101000000000101',
		'101110101010111110111',
		'100000100010100000101',
		'101111111110101110101',
		'101000100000100010001',
		'111011101110111111111',
		'100010000010000000001',
		'101111101010111111101',
		'100000001010001000001',
		'111111111111111111111'
	]; 

	const mazeBox = document.getElementById('maze');
	let html = '';
	maze.forEach(function (str) {
		html += '<p>';
		for (let i = 0; i < str.length; i++){
			html += `<span class="${+str[i] ? 'wall' : 'way'}"></span>`;
		}
		html += '</p>';
	});

	mazeBox.innerHTML = html;
	setRandomPosition('hero');
	setRandomPosition('chest');

	let btnLeft = document.querySelector('.left');
	let btnRight = document.querySelector('.right');
	let btnUp = document.querySelector('.up');
	let btnDown = document.querySelector('.down');

	window.addEventListener('keydown', keyDown);

	btnLeft.onclick = function () {goLeftRight('left')};
	btnRight.onclick = function () {goLeftRight('right')};
	btnUp.onclick = function () { toUpDown('up'); };
	btnDown.onclick = function () { toUpDown('down'); };
	// btnUp.onclick = goUp;
	// btnDown.onclick = goDown;

	function setRandomPosition(className) {
	while (true) {
	let y = rnd(maze.length - 1);
	let x = rnd(maze[y].length - 1);
	if (maze[y][x] === '0') {
		let span = mazeBox.children[y].children[x];
		if (span.classList.length !== 1) continue;
		span.classList.add(className);
		break;
	}
}
	function rnd(max) {
		return Math.floor(Math.random() * (max + 1));
	}
}

	// function goLeft (){
	// 	let spanHero = mazeBox.querySelector('.hero');
	// 	let spanTarget = spanHero.previousElementSibling;
	// 	if (!spanTarget || spanTarget.classList.contains('wall')) return;
	// 	spanHero.classList.remove('hero');
	// 	spanTarget.classList.add('hero');
	// 	checkChest(spanTarget);
	// }
	// function goRight (){
	// 	let spanHero = mazeBox.querySelector('.hero');
	// 	let spanTarget = spanHero.nextElementSibling;
	// 	if (!spanTarget || spanTarget.classList.contains('wall')) return;
	// 	spanHero.classList.remove('hero');
	// 	spanTarget.classList.add('hero');
	// 	checkChest(spanTarget);
	
	function goLeftRight(direction) {
		let spanHero = mazeBox.querySelector('.hero');
		// let spanTarget;
		// if (direction === 'left') spanTarget = spanHero.previousElementSibling;
		// else spanTarget = spanHero.nextElementSibling;
		let spanTarget = spanHero[direction === 'left' ? 'previousElementSibling' : 'nextElementSibling'];

		if (!spanTarget || spanTarget.classList.contains('wall')) return;
		spanHero.classList.remove('hero');
		spanTarget.classList.add('hero');
		checkChest(spanTarget);
	}
	function goUpDown(direction) {
		let spanHero = mazeBox.querySelector('.hero');
		let pTarget = spanHero.parentElement[direction === 'up' ? 'previousElementSibling' : 'nextElementSibling'];
		if (!pTarget) return;
		let index = 0;
		let spanTarget = spanHero;
		while (spanTarget = spanTarget.previousElementSibling) index++;
		spanTarget = pTarget.children[index];
		if (!spanTarget || spanTarget.classList.contains('wall')) return;
		spanHero.classList.remove('hero');
		spanTarget.classList.add('hero');
		checkChest(spanTarget);
	}
	// function goUp (){
	// 	let spanHero = mazeBox.querySelector('.hero');
	// 	let pTarget = spanHero.parentElement.previousElementSibling;
	// 	if (!pTarget) return;
	// 	let index = 0;
	// 	let spanTarget = spanHero;
	// 	while (spanTarget = spanTarget.previousElementSibling) index++;
	// 	spanTarget = pTarget.children[index];
	// 	if (!spanTarget || spanTarget.classList.contains('wall')) return;
	// 	spanHero.classList.remove('hero');
	// 	spanTarget.classList.add('hero');
	// 	checkChest(spanTarget);
	// }
	// function goDown () {
	// 	let spanHero = mazeBox.querySelector('.hero');
	// 	let pTarget = spanHero.parentElement.nextElementSibling;
	// 	if (!pTarget) return;
	// 	let index = 0;
	// 	let spanTarget = spanHero;
	// 	while (spanTarget = spanTarget.previousElementSibling) index++;
	// 	spanTarget = pTarget.children[index];
	// 	if (!spanTarget || spanTarget.classList.contains('wall')) return;
	// 	spanHero.classList.remove('hero');
	// 	spanTarget.classList.add('hero');
	// 	checkChest(spanTarget);
	// }
	function keyDown(e) {
		let key = e.code;
		if (key === 'KeyW' || key === 'ArrowUp') goUpDown('up');
		if (key === 'KeyS' || key === 'ArrowDown') goUpDown('down');
		if (key === 'KeyA' || key === 'ArrowLeft') goLeftRight('left');
		if (key === 'KeyD' || key === 'ArrowRight') goLeftRight('right');
	}

	function checkChest(spanHero) {
		if (!spanHero.classList.contains('chest')) return;
		setTimeout(() => {
			alert('Congratulation! \nYou WIN!!!');
			location.reload();
		}, 0);
			
	}

})();

