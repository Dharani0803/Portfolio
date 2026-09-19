import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ShootingStars from "./ui/shootingstars";

export default function About() {
  const aboutRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(aboutRef);

      // =====================================================
      // BLOCK 1: heading + orange line + intro
      // =====================================================
      gsap.set(q(".about-heading, .about-intro"), {
        opacity: 0,
        y: 24,
      });

      gsap.set(q(".about-line"), {
        opacity: 0,
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: q(".about-heading")[0],
            start: "top 95%",
            once: true,
          },
        })
        .to(q(".about-heading"), {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
        })
        .to(
          q(".about-line"),
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.4,
            ease: "power3.out",
          },
          0.1
        )
        .to(
          q(".about-intro"),
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
          },
          0.15
        );

      // =====================================================
      // BLOCK 2: photo + ABOUT ME + paragraphs
      // Own trigger, so it doesn't wait for block 1 to finish
      // =====================================================
      gsap.set(q(".about-image"), {
        opacity: 0,
        y: 30,
        scale: 0.97,
      });

      gsap.set(q(".about-title, .about-paragraph"), {
        opacity: 0,
        y: 18,
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: q(".about-image")[0],
            start: "top 92%",
            once: true,
          },
        })
        .to(q(".about-image"), {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
        })
        .to(
          q(".about-title"),
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power3.out",
          },
          0.1
        )
        .to(
          q(".about-paragraph"),
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
            stagger: 0.08,
          },
          0.2
        );
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={aboutRef}
      id="about"
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        border-t
        border-[#353535]
        rounded-t-[40px]
        bg-[#080808]
        px-[5vw]
        pt-[50px]
        text-white
      "
    >
      <ShootingStars />

      {/* =========================================
          WHO AM I
      ========================================== */}

      <div className="w-full pl-[25px]">

        <h1
          className="
            about-heading
            flex
            items-baseline
            gap-[12px]
            text-[clamp(3rem,6vw,6rem)]
            font-black
            uppercase
            leading-[0.85]
            tracking-[-0.055em]
          "
          style={{
            fontFamily: "Arial Black, Arial, sans-serif",
          }}
        >
          <span>WHO</span>

          <span
            className="
              text-[0.82em]
              font-normal
              lowercase
              tracking-[-0.04em]
            "
            style={{
              fontFamily: "Georgia, Times New Roman, serif",
              fontStyle: "italic",
            }}
          >
            am
          </span>

          <span>I?</span>
        </h1>

        {/* ORANGE LINE */}

        <div
          className="
            about-line
            mt-[15px]
            h-[5px]
            w-[125px]
            rounded-full
            bg-gradient-to-r
            from-[#d8663c]
            to-transparent
          "
        />

        {/* DESCRIPTION */}

        <p
          className="
            about-intro
            mt-[20px]
            max-w-[1450px]
            text-[clamp(1.15rem,1.65vw,1.75rem)]
            font-normal
            leading-[1.55]
            tracking-[-0.015em]
            text-white
          "
          style={{
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          I am a Full Stack Developer driven by a passion for building clean,
          intuitive, and reliable digital experiences.
        </p>
      </div>

      {/* =========================================
          ABOUT ME
      ========================================== */}

      <div
        className="
          mx-[35px]
          mt-[40px]
          flex
          min-h-[70vh]
          w-full
          max-w-[1450px]
          items-center
          gap-[6vw]
          pb-[80px]
          md:mt-[85px]
        "
      >

        {/* LEFT IMAGE */}

        <div className="about-image relative w-full max-w-[300px] shrink-0 md:w-[40%]">

          {/* BACK CARD */}

          <div
            className="
              absolute
              -left-[10px]
              -top-[10px]
              h-full
              w-full
              rounded-[28px]
              bg-[#616262]
            "
          />

          {/* MAIN IMAGE */}

          <div
            className="
              relative
              z-10
              aspect-[0.78]
              w-full
              overflow-hidden
              rounded-[28px]
              bg-[#181818]
            "
          >
            <img
              src="/about-photo.jpeg"
              alt="Dharani"
              onLoad={() => ScrollTrigger.refresh()}
              className="
                w-full
                h-full
                object-cover
                object-center
              "
            />
          </div>
        </div>

        {/* RIGHT CONTENT */}

        <div className="w-full pl-[2vw]">

          <p
            className="
              about-title
              text-[18px]
              font-medium
              uppercase
              tracking-[0.25em]
              text-white/75
              md:text-left
            "
          >
            ABOUT ME
          </p>

          <div
            className="
              mt-[30px]
              space-y-[15px]
              pr-[50px]
              text-[16px]
              font-normal
              leading-[1.9]
              tracking-[-0.005em]
              text-white/60
              md:text-[17px]
            "
          >

            <p className="about-paragraph">
              I’m curious about how things work and enjoy turning that curiosity
              into something I can build. My interest in development grew from
              creating simple interfaces to building complete web applications,
              and I’ve come to enjoy both the creative and technical sides of
              the process.
            </p>

            <p className="about-paragraph">
              I like working across the frontend and backend, connecting
              different pieces of a product and making sure everything works
              together smoothly. I also enjoy exploring UI/UX, which helps me
              think about not just how something works, but how it feels to use.
            </p>

            <p className="about-paragraph">
              I adapt easily to new situations and enjoy learning along the way.
              Whether I’m working independently or with others, I like sharing
              ideas, taking responsibility, and finding ways to move things
              forward together.
            </p>

            <p className="about-paragraph">
              Every project gives me a chance to learn, improve, and approach
              the next challenge with a better perspective.
            </p>

            <p className="about-paragraph pt-[10px] text-center font-medium text-white/80">
              I build, I explore, I learn — and I keep creating.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}