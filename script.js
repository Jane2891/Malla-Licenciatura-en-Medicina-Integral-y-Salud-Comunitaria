const canvas = document.getElementById("malla");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let points = [];
for (let x = 0; x < canvas.width; x += 60) {
  for (let y = 0; y < canvas.height; y += 60) {
    points.push({ x, y });
  }
}

let mouse = { x: 0, y: 0 };
canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

let semestreActivo = null; // ← este cambiará al dar clic

document.querySelectorAll(".semestre").forEach((section) => {
  section.addEventListener("click", () => {
    semestreActivo = section.dataset.semestre;
  });
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let point of points) {
    let dx = point.x - mouse.x;
    let dy = point.y - mouse.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    let radius = Math.max(2, 8 - dist / 50);

    let color = "#00f0ff"; // Azul por defecto

    if (semestreActivo !== null) {
      const zona = parseInt(semestreActivo);
      const zonaY = canvas.height / 11; // ← 11 zonas (para 11 secciones)
      const yMin = (zona - 1) * zonaY;
      const yMax = zona * zonaY;

      if (point.y >= yMin && point.y < yMax) {
        color = "#ff66d2"; // Rosa si está en la zona activa
      }
    }

    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }
}

function loop() {
  draw();
  requestAnimationFrame(loop);
}

loop();
