import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BackgroundPaths } from "./ui/background-paths";


gsap.registerPlugin(ScrollTrigger);

const words = [
  "CREATIVE",
  "DESIGNER",
  "BUILDER",
  "DEVELOP",
  "WEBDEV",
  "FOCUSED",
  "COMMIT",
];

export default function Home() {
  const titleRef = useRef(null);
  const wordIndex = useRef(0);
  const homeRef = useRef(null);

  const startWordAnimation = () => {
    const title = titleRef.current;

    if (!title) return;

    const nextIndex = (wordIndex.current + 1) % words.length;
    const nextWord = words[nextIndex];

    gsap.to(title, {
      x: -35,
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",

      onComplete: () => {
        title.textContent = nextWord;
        wordIndex.current = nextIndex;

        gsap.fromTo(
          title,
          {
            x: 35,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",

            onComplete: () => {
              gsap.delayedCall(2.2, startWordAnimation);
            },
          }
        );
      },
    });
  };

  useEffect(() => {
    const title = titleRef.current;
    const home = homeRef.current;
    // NOTE: scrollContent is now OUTSIDE homeRef, so we grab it from the document
    const scrollContent = document.querySelector(".home-scroll-content");

    if (!title || !home || !scrollContent) return;

    // -----------------------------------------
    // NAVBAR
    // -----------------------------------------

    gsap.fromTo(
      ".home-nav-item",
      {
        y: -20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      }
    );

    // -----------------------------------------
    // HERO TITLE
    // -----------------------------------------

    gsap.fromTo(
      title,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.15,
        ease: "power4.out",
        onComplete: startWordAnimation,
      }
    );

    // -----------------------------------------
    // RIGHT CONTENT
    // -----------------------------------------

    gsap.fromTo(
      ".home-info",
      {
        x: 40,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.9,
        delay: 0.4,
        ease: "power3.out",
      }
    );

    // -----------------------------------------
    // DIVIDER
    // -----------------------------------------

    gsap.fromTo(
      ".home-divider",
      {
        scaleY: 0,
      },
      {
        scaleY: 1,
        duration: 0.9,
        delay: 0.35,
        ease: "power3.out",
      }
    );

    // -----------------------------------------
    // SCROLL INDICATOR INTRO
    // -----------------------------------------

    gsap.fromTo(
      scrollContent,
      {
        x: -20,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.5,
        ease: "power3.out",
      }
    );



    // -----------------------------------------
    // SCROLL DOWN + LINE
    // ONLY THIS MOVES DOWN ON SCROLL
    // (scrollContent lives outside `home` now, so this
    //  animation is fully independent of the home->about
    //  scale/opacity transition below)
    // -----------------------------------------

    const scrollAnimation = gsap.to(scrollContent, {
      y: 180,
      opacity: 0,
      ease: "none",
      paused: true,
    });

    const scrollTrigger = ScrollTrigger.create({
      trigger: home,
      start: "top top",
      end: "+=300",
      scrub: 1.2,

      onUpdate: (self) => {
        scrollAnimation.progress(self.progress);
      },
    });

    // -----------------------------------------
    // SOCIAL BUTTONS
    // -----------------------------------------

    gsap.fromTo(
      ".home-social",
      {
        x: 25,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        delay: 0.5,
        ease: "power3.out",
      }
    );

    // -----------------------------------------
    // HOME → ABOUT TRANSITION
    // (only `home` scales/fades now — the scroll
    //  indicator is no longer a child of it, so it
    //  can't get dragged/skewed by this scale)
    // -----------------------------------------

    const about = document.querySelector(
      '[data-scroll-section="1"]'
    );

    let transition = null;

    if (about) {
      gsap.set(about, {
        zIndex: 20,
      });

      gsap.set(home, {
        zIndex: 10,
        opacity: 1,
        scale: 1,
      });

      transition = gsap.timeline({
        scrollTrigger: {
          trigger: about,
          start: "top bottom",
          end: "top 10%",
          scrub: 1.2,
        },
      });

      transition.to(home, {
        opacity: 0,
        y: 50,
        scale: 0.95,
        ease: "power2.out",
         force3D: true,
      });
    }

    // -----------------------------------------
    // CLEANUP
    // -----------------------------------------

    return () => {
      gsap.killTweensOf(title);
      gsap.killTweensOf(".home-nav-item");
      gsap.killTweensOf(".home-info");
      gsap.killTweensOf(".home-divider");
      gsap.killTweensOf(scrollContent);
      gsap.killTweensOf(".home-social");

      scrollTrigger.kill();
      scrollAnimation.kill();

      transition?.scrollTrigger?.kill();
      transition?.kill();
    };
  }, []);

  return (
    <>
      {/* ==================================================
          LEFT SCROLL INDICATOR
          Moved OUTSIDE <main ref={homeRef}> on purpose —
          it must never inherit home's scale/opacity tween
          from the Home -> About transition below.
      ================================================== */}

      <aside
        className="
          home-scroll
          fixed
          left-[30px]
          top-[83%]
          z-40
          hidden
          -translate-y-1/2
          md:block
        "
      >
        <div className="home-scroll-content flex flex-col items-center">

          <span className="scroll-text">
            SCROLL DOWN
          </span>

          <span className="scroll-long-line" />

        </div>
      </aside>

      <main id="home"
        ref={homeRef}
        className="sticky top-0 z-10 min-h-screen w-full overflow-hidden bg-black text-white"
      >
        <BackgroundPaths />

        {/* ==================================================
            NAVBAR
        ================================================== */}

        <header className="absolute left-0 top-0 z-50 w-full">
          <nav className="what-offer-title flex h-[100px] items-center px-[9vw]">

            {/* LOGO */}

            <div
              className=" flex items-center"
            >
              <img
                src="/logo.png"
                alt="DK Dharani"
                className="block h-auto w-[130px] object-contain opacity-80 transition-opacity duration-200 hover:opacity-100"
              />
            </div>

            {/* MENU */}

            <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[55px] md:flex">

              <a
                href="#about"
                className="home-nav-item nav-link"
              >
                About
              </a>

              <a
                href="#skills"
                className="home-nav-item nav-link"
              >
                Skills
              </a>

              <a
                href="#projects"
                className="home-nav-item nav-link"
              >
                Projects
              </a>

              <a

                href="#contact"
                className="home-nav-item nav-link"
                onClick={(e) => {
                  e.preventDefault();

                  const contactSection = document.querySelector(
                    '[data-scroll-section="7"]'
                  );

                  if (contactSection) {
                    window.scrollTo({
                      top: contactSection.offsetTop,
                      behavior: "auto", // instant — no visible manual scroll
                    });
                  }
                }}
              >
                Contact
              </a>

            </div>

            {/* RESUME */}

            <div className="ml-auto">
              <a
                href="/Resume.docx"
                className="home-nav-item resume-button"
              >
                Resume
              </a>
            </div>

          </nav>
        </header>

        {/* ==================================================
            HERO
        ================================================== */}

        <section className="relative z-10 flex min-h-screen w-full items-center justify-center px-[6vw]">

          <div className="flex w-full max-w-[1500px] items-center justify-center">

            {/* BIG WORD */}

            <div className="flex w-1/2 justify-end pr-[3vw]">
              <div className="w-[105%]">

                <div className="title-wrapper">

                  <h1
                    ref={titleRef}
                    className="hero-title"
                  >
                    CREATIVE
                  </h1>

                </div>

              </div>
            </div>

            {/* DIVIDER */}

            <div className="home-divider mx-[4vw] h-[230px] w-[2px] shrink-0" />

            {/* RIGHT CONTENT */}

            <div className="home-info flex shrink-0 items-center">

              <div>

                <h2 className="info-title">
                  Full-Stack Developer
                </h2>

                <p className="info-description">
    Building scalable digital experiences
    <br />
     from end to end
  </p>
                <p className="info-stack">
                  Based in India
                  <span> • </span>
                  React
                  <span> • </span>
                  Node
                  <span> • </span>
                  Tailwind
                </p>

              </div>

            </div>

          </div>

        </section>
      </main>
    </>
  );
}