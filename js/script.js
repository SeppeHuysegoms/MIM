import gsap, { SteppedEase } from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);


const init = () => {

  const $hamburgerMenu = document.querySelector(".hamburger");

  $hamburgerMenu.addEventListener("click", test)



    const $beeld8 = document.querySelector('.beeld8');
    $beeld8.classList.add("beeld8JS");
    const $onderdelen = document.querySelectorAll(".onderdeel");

    $onderdelen.forEach((onderdeel) => {;
    onderdeel.classList.add("onderdeelJS");});

    let load = gsap.from(".onderdeel1>.onderdeelTekst", {
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
}

const test = () => {
  document.querySelector(".navMobile").classList.toggle("menuShow");
  document.querySelector(".hamburger").classList.toggle("hamburgerShow");
  document.querySelector("body").classList.toggle("overflow-y-hidden");
}
init();


