import gsap, { SteppedEase } from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

let huidigPuzzelStuk;
let nieuwPuzzelStuk;
let kliks = 0;
var randomVolgorde = ["5", "8", "2", "6", "1", "4", "3", "9", "7"];
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

    puzzelstuk.addEventListener("click", touchStart);

    puzzelstuk.setAttribute("draggable", true);

    document.querySelector(".test2").appendChild(puzzelstuk);
  }

  const $beeld8 = document.querySelector(".beeld8");
  $beeld8.classList.add("beeld8JS");
  for (const child of $beeld8.children) {
    child.classList.add("onderdeelJS");
  }

  animatieOnderdelen();
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

const dragEnd = () => {
  let huidigImage = huidigPuzzelStuk.src;
  let nieuweImage = nieuwPuzzelStuk.src;

  huidigPuzzelStuk.src = nieuweImage;
  nieuwPuzzelStuk.src = huidigImage;
  checkPuzzel();
};

const touchStart = (e) => {
  if (kliks == 0) {
    kliks += 1;
    console.log(e.currentTarget);
    huidigPuzzelStuk = e.currentTarget;
  } else {
    kliks += 1;
    nieuwPuzzelStuk = e.currentTarget;
  }

  if (kliks == 2) {
    kliks = 0;
    let huidigImage = huidigPuzzelStuk.src;
    let nieuweImage = nieuwPuzzelStuk.src;

    huidigPuzzelStuk.src = nieuweImage;
    nieuwPuzzelStuk.src = huidigImage;
    checkPuzzel();
  }
};

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

const animatieOnderdelen = () => {
  let tlOnderdelen = gsap.timeline({
    scrollTrigger: {
      trigger: ".beeld8",
      markers: true,
      toggleActions: "play none none reverse",
      pin: true,
      start: "bottom 100%",
      end: "bottom 0%",
      scrub: 1,
    },
  });

  for (let i = 1; i < 6; i++) {
    tlOnderdelen.from(".onderdeel" + i + ">.onderdeelImageMask", {
      duration: 15,
      yPercent: 100,
      ease: "sine.in",
    });

    tlOnderdelen.from(
      ".onderdeel" + i + ">.onderdeelImageMask>img",
      {
        duration: 15,
        yPercent: -100,
        ease: "sine.in",
      },
      "<"
    );
    tlOnderdelen.from(
      ".onderdeel" + i + ">.onderdeelTekst",
      {
        duration: 20,
        opacity: 0,
        ease: "sine.in",
      },
      "<25"
    );

    tlOnderdelen.to(".onderdeel" + i + ">.onderdeelTekst", {
      duration: 20,
      opacity: 0,
      ease: "sine.in",
    },"<35");
    tlOnderdelen.to(
      ".onderdeel" + i + ">.onderdeelImageMask>img",
      {
        duration: 20,
        opacity: 0,
        ease: "sine.in",
      },
      "<5"
    );
  }
};
init();
