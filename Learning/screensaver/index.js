let body = document.getElementById("container");
let saver = [document.getElementById("saver")];
let saverCount = 1; //Used for saver element count, the array itself grows infinitely
let spd = 10;
let hori = [spd];
let verti = [spd];
let bounces = [0];

let hit = [0]; //0 = none, 1 = side, 2+ = corner

let bonus = 1;
let cornerCooldown = 0;
let points = 0;
let pointsTxt = document.getElementById("pointsTxt");

let timer = 60;

function resetHit(ind)
{
	//If hit was 0 that means it bounced twice to reset
	if (hit[ind] == 1)
	{
		hit[ind] = 0;

		if (ind > 0)
		{
			points -= 5 * bonus;
			if (bounces[ind] == 2) { saver[ind].style.opacity = 0.66; }
			if (bounces[ind] == 1) { saver[ind].style.opacity = 0.22; }
		}
	}
}

function moveSaver()
{
	if (timer <= 0) { return; }

	for (let i = 0; i < saver.length; i++)
	{
		if (saver[i] == null) { continue; }

		saver[i].style.left = parseInt(saver[i].style.left) + hori[i] + "px";
		saver[i].style.top = parseInt(saver[i].style.top) + verti[i] + "px";
		saver[i].style.right = parseInt(saver[i].style.right) + hori[i] + "px";
		saver[i].style.bottom = parseInt(saver[i].style.bottom) + verti[i] + "px";

		if (parseInt(saver[i].style.bottom) > document.documentElement.clientHeight - 10) { verti[i] = -spd; bounces[i]--; hit[i]++; }
		if (parseInt(saver[i].style.top) < 0) { verti[i] = spd; bounces[i]--; hit[i]++; }

		if (parseInt(saver[i].style.right) > document.documentElement.clientWidth - 10) { hori[i] = -spd; bounces[i]--; hit[i]++; }
		if (parseInt(saver[i].style.left) < 0) { hori[i] = spd; bounces[i]--; hit[i]++; }

		//Corner hit win
		if (hit[i] >= 2)
		{
			if (cornerCooldown > 0) { hit[i] = 0; }
			else
			{
				if (i != 0) { points += 100 * bonus; }
				else { bonus += 0.2; }
				hit[i] = 0;

				cornerCooldown = 5;
			}
		}

		if (hit[i] == 1) { setTimeout(resetHit, 50, i); } //If spawned in and hits sides make timer for losing points

		if (bounces[i] <= 0 && i > 0) { saver[i].remove(); saver[i] = null; saverCount--; }
	}

	cornerCooldown--;
	timer -= 1/60;

	pointsTxt.innerText = `Points: ${Math.round(points)}\nBonus Mult: ${Math.round(bonus*100)/100}x\nTime: ${Math.ceil(timer)}s`;
}

setInterval(moveSaver, 1000/60);

window.addEventListener("keydown", (press) =>
{
	if (press.key != " " || saverCount > 3 || timer <= 0) { return; }
	
	let len = saver.length;
	saver[len] = saver[0].cloneNode(true);
	body.appendChild(saver[len]);
	
	hori[len] = [-1, 1][Math.round(Math.random())] * spd;
	verti[len] = [-1, 1][Math.round(Math.random())] * spd;

	while (hori[len] == hori[0] && verti[len] == verti[0])
	{
		hori[len] = [-1, 1][Math.round(Math.random())] * spd;
		verti[len] = [-1, 1][Math.round(Math.random())] * spd;
	}

	bounces[len] = 3;
	hit[len] = 0;

	saverCount++;
});

window.addEventListener("resize", () => { window.location.reload(); })