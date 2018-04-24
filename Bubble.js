var Width = 1024, Height = 768, wall_speed = 5;

class Bubble
{
	constructor(x, y, r, re, gr, bl)
	{
		this.alive = 1;
		this.x = x;
		this.y = y;
		this.r = r;
		this.red = re;
		this.green = gr;
		this.blue = bl;
	}
}

class Wall
{
	constructor(y, h)
	{
		this.hasPoint = 1;
		this.gap = floor(random(50, 700));
		this.y = y;
		this.height = h;
		this.bonusNum = 0;
		this.hasBonus = 0;
	}
}

var score = 0;
var lastBonusScore = 0;
var r, g, b;
var bonusX;
var drawBonus = 1;

function setup()
{
	score = 0;
	lastBonusScore = 0;
	r = g = b = 255;
	bub = new Bubble(500, 800, 50, random(0,255), random(0,255), random(0,255));
	wall1 = new Wall(-5, 30);
	wall2 = new Wall(-384, 30);

	wall2.bonusNum = floor(random(1,3));
	wall2.hasBonus = 0;

	mouseX = 500; mouseY = 700;
	wall_speed = 5;
}

function drawBub()
{
	fill(r, g, b);
	if(bub.alive == 0)
		return false;

	//follow the mouse cursor
	bub.x += 30 * (mouseX - bub.x) / 100;
	bub.y += 30 * (mouseY - bub.y) / 100;
	//bub.x = mouseX;
	//bub.y = mouseY;

	//make sure we dont go out of the screen
	if(bub.x + bub.r / 2 > Width) bub.x = Width - bub.r / 2;
	if(bub.x - bub.r / 2 < 0) bub.x = bub.r / 2;
	if(bub.y + bub.r / 2 > Height) bub.y = Height - bub.r / 2;
	if(bub.y - bub.r / 2 < 0) bub.y = bub.r / 2;

	//draw the circle
	ellipse(bub.x, bub.y, bub.r);
}

function drawWall()
{
	fill(255);

	wall2.y += wall_speed;

	if(wall2.y - wall2.height > Height)
	{
		wall2.gap = floor(random(0, Width - 130));
		if(wall2.gap >= Width / 2)
			bonusX = floor(random(0, Width/2 - 100));
		else
			bonusX = floor(random(Width / 2 + 100, Width - 90));
		wall2.y = -50;
		wall2.hasPoint = 1;

		if(lastBonusScore >= wall2.bonusNum && wall2.hasBonus == 0)
		{
			wall2.hasBonus = 1;
			drawBonus = 1;
			lastBonusScore = 0;
		}
		else if (lastBonusScore >= wall2.bonusNum && wall2.hasBonus == 1)
		{
			wall2.hasBonus = 0;
			lastBonusScore = 0;
			wall2.bonusNum = floor(random(1, 3));
		}

		lastBonusScore += 1;
	}

	if(wall2.hasBonus)
	{
		if(bonusX >= Width/2)
		{
			fill(255);
			rect(0, wall2.y, wall2.gap, wall2.height, 20);
			rect(wall2.gap + 130, wall2.y, bonusX - wall2.gap - 130, wall2.height, 20);
			fill(255, 255, 0);
			if(drawBonus)
				ellipse(bonusX + 40, wall2.y + wall2.height / 2, wall2.height / 1.1, wall2.height);
			fill(255);
			rect(bonusX + 80, wall2.y, Width - bonusX - 80, wall2.height, 20);
		}
		else
		{
			fill(255);
			rect(0, wall2.y, bonusX, wall2.height, 20);
			fill(255,255,0);
			if(drawBonus)
				ellipse(bonusX + 40, wall2.y + wall2.height / 2, wall2.height / 1.1, wall2.height);
			fill(255);
			rect(bonusX + 80, wall2.y, wall2.gap - bonusX - 80, wall2.height, 20);
			rect(wall2.gap + 130, wall2.y, Width - wall2.gap - 130, wall2.height, 20);
		}
	}
	else
	{
		fill(255);
		rect(0, wall2.y, wall2.gap, wall2.height, 20);
		rect(wall2.gap + 130, wall2.y, Width, wall2.height, 20);
	}

	wall1.y += wall_speed;

	if(wall1.y - wall1.height > Height) 
	{
		wall1.gap = floor(random(50, Width - 200));
		wall1.y = -50;
		wall1.hasPoint = 1;
	}
	
	fill(255);
	rect(0, wall1.y, wall1.gap, wall1.height, 20);
	rect(wall1.gap + 130, wall1.y, Width - wall1.gap - 130, wall1.height, 20);
}

function changeCol()
{
	r = random(0,255);
	g = random(0,255);
	b = random(0,255);
	while(400 > r + g + b)
	{
		r = random(0,255);
		g = random(0,255);
		b = random(0,255);
	}
}

function check()
{
	if (!(bub.y + bub.r / 2  < wall1.y || bub.y - bub.r / 2 > wall1.y + wall1.height) || !(bub.y + bub.r / 2  < wall2.y || bub.y - bub.r / 2 > wall2.y + wall2.height))
	{
		if( !(bub.x - bub.r/2 > bonusX && bub.x + bub.r/2 < bonusX + 80 || bub.x - bub.r/2 > wall1.gap && bub.x + bub.r/2 < wall1.gap + 130 || bub.x - bub.r/2 > wall2.gap && bub.x + bub.r/2 < wall2.gap + 130) )
		{
			bub.alive = 0;
			wall_speed = 0;
			background(0);
			textSize(70);
			textAlign(CENTER);
			text('Your score is', Width / 2 - 50, height / 2 - 100);
			textAlign(CENTER);
			textSize(100);
			text(score, Width / 2 - 50, height / 2);
			textSize(70);
			textAlign(CENTER);
			text('Click to start again!', Width / 2 - 30, height / 2 + 200);
			if (mouseIsPressed) 
			{
				if (mouseButton == LEFT)
					setup();
			}
		}
	}
	if(bub.y + bub.r / 2 < wall2.y && wall2.hasPoint)
	{
		score += 1;
		if(bub.x - bub.r / 2 > bonusX && bub.x + bub.r / 2 < bonusX + 80 && wall2.hasBonus)
		{
			score += 1;
			drawBonus = 0;
		}
		wall2.hasPoint = 0;
		changeCol();
	}
	if(bub.y + bub.r / 2 < wall1.y && wall1.hasPoint)
	{
		score += 1;
		wall1.hasPoint = 0;
		changeCol();
	}
}

function draw()
{
	createCanvas(Width, Height);
	background(0);

	fill(255);
	drawWall();
	drawBub();
	fill(255);
	textSize(40);
	text(score, Width - 60, 40);
	check();
	if(wall_speed < 30)
	wall_speed += 0.003;
}