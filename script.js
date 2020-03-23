const box = Array.from(document.querySelectorAll('td'));
const banner = document.getElementById('banner');
const msg = document.querySelector('div#banner p');
const resetButton = document.querySelector('button');
const h1 = document.querySelector('h1');
// box.forEach((el, i) => {
// 	el.textContent = i;
// });

let win = false;

const winSituation = [
	[ 0, 1, 2 ],
	[ 0, 3, 6 ],
	[ 0, 4, 8 ],
	[ 1, 4, 7 ],
	[ 2, 5, 8 ],
	[ 3, 4, 5 ],
	[ 6, 7, 8 ],
	[ 6, 4, 2 ]
];

let player1 = [];
let player2 = [];

let play = true;

const boxFill = (event) => {
	if (win) {
		banner.style.display = 'block';
	} else {
		if (event.target.textContent === '') {
			if (play) {
				event.target.textContent = '🦊';
				player1.push(Number(event.target.id));
				// console.log(event.target.id);
			} else {
				event.target.textContent = '🐷';
				player2.push(Number(event.target.id));
			}
			play = !play;

			if (winCheck(player1).includes(true)) {
				// alert('player 1 Won');
				const x = winCheck(player1).indexOf(true);
				winSituation[x].forEach((e) => {
					document.getElementById(e).style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
				});
				win = true;
				msg.textContent = 'Player 1 Wins';
				banner.style.display = 'block';
			} else if (winCheck(player2).includes(true)) {
				// alert('player 2 Won');
				const x = winCheck(player2).indexOf(true);
				winSituation[x].forEach((e) => {
					document.getElementById(e).style.backgroundColor = 'rgba(0, 0, 255, 0.5)';
				});
				win = true;
				msg.textContent = 'Player 2 Wins';
				banner.style.display = 'block';
			}

			if (!win && player1.length + player2.length === 9) {
				banner.style.display = 'block';
			}
		}
	}
};

const winCheck = (player) => {
	return winSituation.map((el) => {
		return el.every((val) => player.includes(val));
	});
};

box.forEach((it) => {
	it.addEventListener('click', boxFill);
});

const reset = () => {
	box.forEach((el) => {
		el.textContent = '';
		el.style.backgroundColor = 'white';
	});
	banner.style.display = 'none';
	win = false;
	play = true;
	player1 = [];
	player2 = [];
	msg.textContent = 'Game Over';
};

resetButton.addEventListener('click', reset);
h1.addEventListener('click', reset);
