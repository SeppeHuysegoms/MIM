import gsap, { SteppedEase } from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

let huidigPuzzelStuk;
let nieuwPuzzelStuk;
var randomVolgorde = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];
const correcteVolgorde = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const init = () => {
  const $hamburgerMenu = document.querySelector(".hamburger");

  $hamburgerMenu.addEventListener("click", test);
  for (let i = 0; i < 9; i++) {
    let puzzelstuk = document.createElement("img");
    puzzelstuk.id = "puzzelstuk" + i.toString();
    puzzelstuk.src = "./assets/puzzelstuk" + randomVolgorde.shift() + ".png";

    puzzelstuk.addEventListener("dragstart", dragStart);
    puzzelstuk.addEventListener("dragover", dragOver);
    puzzelstuk.addEventListener("dragenter", dragEnter);
    puzzelstuk.addEventListener("dragleave", dragLeave);
    puzzelstuk.addEventListener("drop", dragDrop);
    puzzelstuk.addEventListener("dragend", dragEnd);

    document.querySelector(".test2").appendChild(puzzelstuk);
  }

  const $beeld8 = document.querySelector(".beeld8");
  $beeld8.classList.add("beeld8JS");

     let load = gsap.from(".onderdeel1", {
       yPercent: 100,
       opacity: 0,
       ease: "sine.in",
       duration: 2,
     });

  ScrollTrigger.create({
    trigger: ".beeld8",
    start: "left 30%",
    end: "left 0%",
    toggleActions: "play none none reverse",
    animation: load,
    scrub: 1,
  });

  let pinBeeld8 = gsap.from(".beeld8", {
    duration: 350,
  });

  ScrollTrigger.create({
    trigger: ".beeld8",
    start: "bottom 100%",
    end: "bottom -45%",
    toggleActions: "play none none reverse",
    animation: pinBeeld8,
    scrub: 1,
    pin: true,
  });
};

const test = () => {
  document.querySelector(".navMobile").classList.toggle("menuShow");
  document.querySelector(".hamburger").classList.toggle("hamburgerShow");
  document.querySelector("body").classList.toggle("overflow-y-hidden");
};

const dragStart = (e) => {
  console.log(e.currentTarget);
  huidigPuzzelStuk = e.currentTarget;
};

const dragOver = (e) => {
  e.preventDefault();
};

const dragEnter = (e) => {
  e.preventDefault();
};

const dragLeave = () => {};

const dragDrop = (e) => {
  nieuwPuzzelStuk = e.currentTarget;
};

function dragEnd() {
  let huidigImage = huidigPuzzelStuk.src;
  let nieuweImage = nieuwPuzzelStuk.src;

  huidigPuzzelStuk.src = nieuweImage;
  nieuwPuzzelStuk.src = huidigImage;
  checkPuzzel();
}

const checkPuzzel = () => {
  const $puzzel = document.querySelector(".test2");
  let i = 0;
  let goed = 0;
  for (const child of $puzzel.children) {
    i += 1;

    if (child.src.indexOf(i) == -1) {
      //console.log("fout");
      break;
    } else {
      console.log("goed");
      goed += 1;
    }

    if (goed == 9) {
      console.log("Je hebt gewonnen!");
    }
  }
};
init();
