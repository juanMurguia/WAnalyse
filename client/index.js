//import LocomotiveScroll from "locomotive-scroll";

const scroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  multiplier: 0.3,
  inertia: 1,
});

/////

scroll.on("scroll", (args) => {
  if (typeof args.currentElements["hey"] === "object") {
    const progress = args.currentElements["hey"].progress;
    console.log("scroll");
    // Calcula la posición hacia la izquierda en base al progreso
    const positionX = (1 - progress) * 100; // 100 es el ancho del contenedor

    // Aplica la transformación CSS al elemento para moverlo hacia la izquierda
    const element = document.querySelector(".hey"); // Selecciona el elemento 'hey' (ajusta el selector según sea necesario)
    element.style.transform = translateX`(-${positionX}%)`; // Utiliza -positionX para moverlo hacia la izquierda
  }
});

//drop

//cursor
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
  "#000000",
  "#040404",
  "#080808",
  "#0c0c0c",
  "#101010",
  "#141414",
  "#181818",
  "#1c1c1c",
  "#202020",
  "#242424",
  "#282828",
  "#2c2c2c",
  "#303030",
  "#343434",
  "#383838",
  "#3c3c3c",
  "#404040",
  "#444444",
  "#484848",
  "#4c4c4c",
  "#505050",
  "#545454",
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function (e) {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";

    circle.style.scale = (circles.length - index) / circles.length;

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();
