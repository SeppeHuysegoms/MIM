import gsap, { SteppedEase } from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

let huidigPuzzelStuk;
let nieuwPuzzelStuk;
let kliks = 0;

const audioTest31 = new Audio("./assets/test31.mp3");
const audioTest32 = new Audio("./assets/test32.mp3");
const audioTest33 = new Audio("./assets/test33.mp3");
const audioTest34 = new Audio("./assets/test34.mp3");
const audioTest35 = new Audio("./assets/test35.mp3");
const audioTest1Geslaagd = new Audio("./assets/test1Geslaagd.mp3");
const audioTest1Gefaald = new Audio("./assets/test1Gefaald.mp3");
const audioTest3Antwoord = ["Iers", "Schots", "Iers", "Iers", "Schots"];
const feedbackJuist = [
  "De Engelse Kunnen je niet foppen",
  "Duidelijk ons signaal!",
  "Je bent ze te slim af",
  "Goed gehoord!",
  "Hoor dat mooie Schotse geluid",
];
const feedbackFout = [
  "Aj verkeerd gegokt!",
  "Nee dit was een signaal van ons",
  "Ze hebben je weer beetgenomen",
  "Dit was duidelijk een Iers signaal",
  "Oei dit was een Schots signaal",
];
let audioTest3 = 0;
let nextAudio = 1;
let playing = audioTest31;

const maxTimeTest1 = 10;
let timeTest1 = 0;
let clicks = 0;
let timer;
let minClicks = 50;

const $counterClicks = document.querySelector(".chapter12Clicks");
const $time = document.querySelector(".chapter12Time");

let randomVolgorde = ["5", "8", "2", "6", "1", "4", "3", "9", "7"];

const init = () => {
  const $hamburgerMenu = document.querySelector(".hamburger");
  const $menuMobile = document.querySelector(".menuMobile");
  for (const child of $menuMobile.children) {
    child.addEventListener("click", toggleMenu);
  }

  $hamburgerMenu.addEventListener("click", toggleMenu);

  for (let i = 0; i < 9; i++) {
    let puzzelstuk = document.createElement("img");
    puzzelstuk.id = "puzzelstuk" + i.toString();
    puzzelstuk.src = "./assets/puzzelstuk" + randomVolgorde.shift() + ".png";

    puzzelstuk.addEventListener("click", touchStart);
    document.querySelector(".test2").appendChild(puzzelstuk);
  }

  const $beeld8 = document.querySelector(".beeld8");
  $beeld8.classList.add("beeld8JS");

  for (const child of $beeld8.children) {
    child.classList.add("onderdeelJS");
  }
  animatieBeeld2();
  animatieOnderdelen();
  animatieBeeld51();
  animatieBeeld5();

  document
    .querySelector(".buttonIers")
    .addEventListener("click", controleerTest3);
  document
    .querySelector(".buttonSchots")
    .addEventListener("click", controleerTest3);
  document.querySelector(".buttonStart").addEventListener("click", startTest3);
  document.querySelector(".buttonIers").style.display = "none";
  document.querySelector(".buttonSchots").style.display = "none";
  document.querySelector(".beeld12Tekst1").style.display = "none";
  document.querySelector(".beeld12Tekst2").style.display = "none";
  document
    .querySelector(".beeld12Image1")
    .addEventListener("click", revealTekst);
  document
    .querySelector(".beeld12Image2")
    .addEventListener("click", revealTekst2);
  document
    .querySelector(".beeld12Image1")
    .addEventListener("mouseover", revealTekst);
  document
    .querySelector(".beeld12Image2")
    .addEventListener("mouseover", revealTekst2);
  document
    .querySelector(".beeld12Image1")
    .addEventListener("mouseout", hideTekst);
  document
    .querySelector(".beeld12Image2")
    .addEventListener("mouseout", hideTekst2);

  const $fotoTest1 = document.querySelector(".chapter12Image");
  $fotoTest1.addEventListener("click", countClicks);
};

const countClicks = () => {
  if (clicks === 0) {
    timer = setInterval(startTimer, 500);
  }

  if (timeTest1 < maxTimeTest1) {
    clicks += 1;
    $counterClicks.innerHTML = clicks + " kliks";
  }
};

const startTimer = () => {
  timeTest1 += 0.5;
  console.log(timeTest1);
  $time.innerHTML = timeTest1 + "sec.";

  if (timeTest1 === maxTimeTest1) {
    clearInterval(timer);
    if (clicks < minClicks) {
      document.querySelector(".chapter12Tekst>.instructies").innerHTML =
        "Je signaal was niet sterk genoeg, sommige van je troepen zijn recht in de val getrapt";
      audioTest1Gefaald.play();
    } else {
      document.querySelector(".chapter12Tekst>.instructies").innerHTML =
        "Je hebt snel een luid signaal kunnen geven, waardoor je tropen zijn gered";
      audioTest1Geslaagd.play();
    }
  }
};

const revealTekst = () => {
  document.querySelector(".beeld12Tekst1").style.display = "block";
};
const revealTekst2 = () => {
  document.querySelector(".beeld12Tekst2").style.display = "block";
};
const hideTekst = () => {
  document.querySelector(".beeld12Tekst1").style.display = "none";
};
const hideTekst2 = () => {
  document.querySelector(".beeld12Tekst2").style.display = "none";
};

const toggleMenu = () => {
  document.querySelector(".navMobile").classList.toggle("menuShow");
  document.querySelector(".hamburger").classList.toggle("hamburgerShow");
  document.querySelector("body").classList.toggle("overflow-y-hidden");
};

const startTest3 = () => {
  console.log("test3");
  document.querySelector(".buttonIers").style.display = "block";
  document.querySelector(".buttonSchots").style.display = "block";

  document.querySelector(".buttonStart").style.display = "none";
  audioTest31.play();
};

const controleerTest3 = (e) => {
  let klasse = e.currentTarget.className;
  let antwoord;
  let $feedback = document.querySelector(".beeld13Tekst>.instructies");
  if (klasse.includes("Iers")) {
    antwoord = "Iers";
  } else {
    antwoord = "Schots";
  }
  playing.pause();

  if (antwoord == audioTest3Antwoord[audioTest3]) {
    document.querySelector(".fragment" + nextAudio).src =
      "./assets/fragmentJuist.png";
    $feedback.innerText = feedbackJuist[audioTest3];
    console.log(feedbackJuist[audioTest3]);
  } else {
    console.log("Je hebt verloren!");
    document.querySelector(".fragment" + nextAudio).src =
      "./assets/fragmentFout.png";
    $feedback.innerText = feedbackFout[nextAudio];
  }
  audioTest3 += 1;
  nextAudio += 1;
  switch (nextAudio) {
    case 2:
      audioTest32.play();
      playing = audioTest32;
      break;
    case 3:
      audioTest33.play();
      playing = audioTest33;
      break;
    case 4:
      audioTest34.play();
      playing = audioTest34;
      break;
    case 5:
      audioTest35.play();
      playing = audioTest35;
      break;
    case 6:
      document.querySelector(".buttonIers").style.display = "none";
      document.querySelector(".buttonSchots").style.display = "none";
  }
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
      duration: 25,
      yPercent: 100,
      ease: "sine.in",
    });

    tlOnderdelen.from(
      ".onderdeel" + i + ">.onderdeelImageMask>img",
      {
        duration: 25,
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

    tlOnderdelen.to(
      ".onderdeel" + i + ">.onderdeelTekst",
      {
        duration: 20,
        opacity: 0,
        ease: "sine.in",
      },
      "<35"
    );
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
const animatieBeeld2 = () => {
  const mm = gsap.matchMedia();
  mm.add(
    {
      isXs: "(max-width: 1000px)",
      isMd: "(min-width: 400px)",
    },
    (context) => {
      const { conditions } = context;

      const tlbeeld2 = gsap.timeline({
        scrollTrigger: {
          duration: 10,
          trigger: ".beeld2",
          markers: true,
          toggleActions: "play none none reverse",
          pin: true,
          start: "bottom 100%",
          end: "bottom 0%",
          scrub: 1,
        },
      });

      tlbeeld2.to(
        ".beeld2Tekst",
        {
          duration: 10,
          opacity: 0,
        },
        "<5"
      );

      tlbeeld2.to(
        ".beeld2Image1",
        {
          duration: 10,
          xPercent: -40,
          left: "50%",
          yPercent: -50,
          top: "40%",
          x: 0,
          y: 0,
          position: "absolute",
        },
        "<10"
      );

      tlbeeld2.to(
        ".beeld2Image2",
        {
          duration: 10,
          xPercent: -80,
          left: "50%",
          top: "50%",
        },
        "<"
      );

      if (conditions.isXs) {
        tlbeeld2.to(
          ".beeld2Image1",
          {
            duration: 10,
            scale: 1.25,
          },
          "<"
        );

        tlbeeld2.to(
          ".beeld2Image2",
          {
            duration: 10,
            scale: 1.5,
          },
          "<"
        );
      }
    }
  );
};

const animatieBeeld51 = () => {
  let tlBeeld51Image = gsap.timeline({
    scrollTrigger: {
      trigger: ".beeld5Image",
      markers: true,
      toggleActions: "play none none reverse",
      start: "bottom 150%",
      end: "bottom 100%",
      scrub: 1,
    },
  });

    tlBeeld51Image.from(".beeld5Image", {
      duration: 20,
      y: 100,
      ease: "sine.in",
    });
       tlBeeld51Image.from(
         ".beeld51Image",
         {
           duration: 20,
           opacity:0,
           ease: "sine.in",
         },
         "<"
       );
  }
const animatieBeeld5 = () => {
  let tlBeeld5Image = gsap.timeline(
    {
      scrollTrigger: {
        duration: 60,
        trigger: ".beeld5",
        pin: true,
        markers: true,
        toggleActions: "play none none reverse",
        start: "bottom 100%",
        end: "bottom 0%",
        scrub: 1,
      },
    }
    
  );
   tlBeeld5Image.from(".beeld5Background", {
     duration: 2,
     opacity: 0.9,
     ease: "sine.in",
   });
    tlBeeld5Image.from(
      ".beeld5Tekst",
      {
        duration: 0.5,
        scale: 0,
        opacity: 0,
        ease: "sine.in",
      },
      "<-0.05"
    );

    tlBeeld5Image.from(".beeld5Tekst>h4", {
      duration: 0.3,
      y: -500,
      opacity: 0,
      ease: "sine.in",
    },"<+0.25");
        tlBeeld5Image.from(".beeld5Tekst>p", {
          duration: 0.3,
          y: 400,
          opacity: 0,
          ease: "sine.in",
        }, "<");
};

init();
