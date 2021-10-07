function setup() {
  canvas = createCanvas(1200, 800);
  canvas.parent("play-area")
}

function draw() {
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80);
}
