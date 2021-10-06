
function setup() {
  createCanvas(600, 600);

  const map = new Map;
  map.createHardCodedMap();

  fill(0);

  console.log(map.mapArray);
  map.mapArray.forEach((y, y_index) => {
    y.forEach((x, x_index) => {
      if (x == 1) {
        fill(150, 200, 150)
        rect(x_index * 200, y_index * 200, 200)
      }
    })
  })
}

function draw() {
  // if (mouseIsPressed) {
  //   fill(0);
  // } else {
  //   fill(255);
  // }
  // ellipse(mouseX, mouseY, 80, 80);
}
