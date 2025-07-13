const canvas = document.getElementById("malla");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let points = [];

for (let x = 0; x < canvas.width; x += 60) {
  for (let y = 0; y < canvas.height; y += 60) {
    points.push({x, y});
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let point of points) {
    let dx = point.x - mouse.x;
    let dy = point.y - mouse.y;
    let dist = Math.sqrt(dx*dx + dy*dy);
    let radius = Math.max(2, 8 - dist / 50);
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "#00f0ff";
    ctx.fill();
  }
}

let mouse = { x: 0, y: 0 };
canvas.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function loop() {
  draw();
  requestAnimationFrame(loop);
}

loop();
