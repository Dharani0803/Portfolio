import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Journey() {
  const journeyRef = useRef(null);
  const lineRef = useRef(null);

  const journey = [
    {
      side: "left",
      title: "Internship at",
      company: "Cognifyz IT Solutions Pvt. Ltd.",
      date: "2026 - 2026",
      description:
        "Elevated my full-stack development experience at Cognifyz by building responsive web solutions, integrating robust backend services, and creating seamless, scalable user experiences.",
    },
    {
      side: "right",
      title: "Internship at",
      company: "Phoenix Softech",
      date: "2025 - 2025",
      description:
        "Explored AI-driven product development at Phoenix Softech, gaining hands-on exposure to emerging AI technologies, product workflows, and real-world development practices.",
    },
    {
      side: "left",
      title: "Internship at",
      company: "Vivartha",
      date: "2023 - 2023",
      description:
        "Kicked off my frontend journey at Vivartha, crafting modern, responsive web experiences and creating polished UI/UX posters tailored to client needs.",
    },
    {
      side: "right",
      title: "Education",
      company: "BCA – Bachelor of Computer Applications",
      date: "2023 - 2026",
      description:
        "Built a strong foundation in software development, web technologies and problem solving.",
    },
    {
      side: "left",
      title: "High School",
      company: "Anguvilas Higher Secondary School",
      date: "2021 - 2023",
      description:
        "Started exploring programming and developed an interest in technology and web development.",
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const line = lineRef.current;
      const items = gsap.utils.toArray(".journey-item");

      // Line starts hidden
      gsap.set(line, {
        scaleY: 0,
        transformOrigin: "top center",
      });

      // Cards + dots start hidden
      gsap.set(".journey-card", {
        opacity: 0,
        y: 35,
      });

      gsap.set(".journey-dot", {
        opacity: 0,
        scale: 0,
      });

      // Main timeline scroll animation
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: journeyRef.current,
          start: "top 75%",
          end: "bottom 80%",
          scrub: 1,
        },
      });

      // Center line reveals as page scrolls
      timeline.to(line, {
        scaleY: 1,
        ease: "none",
        duration: 1,
      });

      // Each item reveals one by one
      items.forEach((item) => {
        const card = item.querySelector(".journey-card");
        const dot = item.querySelector(".journey-dot");

        ScrollTrigger.create({
          trigger: item,
          start: "top 75%",
          toggleActions: "play none none reverse",

          onEnter: () => {
            gsap.to(dot, {
              opacity: 1,
              scale: 1,
              duration: 0.35,
              ease: "back.out(2)",
            });

            gsap.to(card, {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: "power3.out",
            });
          },

          onLeaveBack: () => {
            gsap.to(dot, {
              opacity: 0,
              scale: 0,
              duration: 0.25,
            });

            gsap.to(card, {
              opacity: 0,
              y: 35,
              duration: 0.4,
            });
          },
        });
      });
    }, journeyRef);


    const heading = journeyRef.current.querySelector(".journey-heading");
const titles = journeyRef.current.querySelectorAll(".journey-title");
const lines = journeyRef.current.querySelectorAll(".journey-heading-line");
const caption = journeyRef.current.querySelector(".journey-caption");

gsap.set(titles[0], {
  x: -80,
  opacity: 0,
});

gsap.set(titles[1], {
  x: 80,
  opacity: 0,
});

gsap.set(lines, {
  scaleX: 0,
});

gsap.set(caption, {
  y: 15,
  opacity: 0,
});

ScrollTrigger.create({
  trigger: heading,
  start: "top 80%",
  once: true,
  onEnter: () => {
    const tl = gsap.timeline();

    tl.to(titles[0], {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power4.out",
    })
      .to(
        titles[1],
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power4.out",
        },
        "<"
      )
      .to(
        lines,
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.05,
        },
        "-=0.5"
      )
      .to(
        caption,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );
  },
});

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={journeyRef}
      id="journey"
      className="bg-transparent px-6 py-10 text-white"
    >
      
      <div className="mx-auto max-w-[1100px]">

        <div className="journey-heading relative mb-24 overflow-hidden py-8">

  {/* Ghost typography */}
  <div
    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[clamp(5rem,16vw,14rem)] font-black uppercase leading-none tracking-[-0.08em] text-white/[0.025]"
  >
    JOURNEY
  </div>

  <div className="relative z-10 flex items-center justify-center gap-5">

    {/* Left line */}
    <span className="journey-heading-line h-px w-[clamp(40px,12vw,180px)] origin-right bg-white/20" />

    <div className="relative flex items-center">

      <h2 className="journey-title text-[clamp(3rem,7vw,6rem)] font-black uppercase leading-none tracking-[-0.065em] text-white">
        MY
      </h2>

      <span className="mx-4 h-3 w-3 rotate-45 border border-[#d8663c]" />

      <h2 className="journey-title text-[clamp(3rem,7vw,6rem)] font-black uppercase leading-none tracking-[-0.065em] text-white/40">
        JOURNEY
      </h2>

    </div>

    {/* Right line */}
    <span className="journey-heading-line h-px w-[clamp(40px,12vw,180px)] origin-left bg-white/20" />

  </div>

  {/* Small caption */}
  <p className="journey-caption relative z-10 mt-6 text-center text-[10px] uppercase tracking-[0.45em] text-white/30">
    THE ROAD SO FAR
  </p>

</div>

        <div className="relative">

          {/* Base line */}
          <div className="absolute left-1/2 hidden h-full w-1 -translate-x-1/2 bg-white/10 md:block" />

          {/* Scroll reveal line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 hidden h-full w-1 -translate-x-1/2 bg-[white]/80 border border-[#d8663c] md:block"
          />

          {journey.map((item, index) => (
            <div
              key={index}
              className={`journey-item relative mb-16 md:mb-24 md:flex ${
                item.side === "left"
                  ? "justify-start"
                  : "justify-end"
              }`}
            >

              {/* Dot */}
              <div className="journey-dot absolute left-1/2 z-20 hidden h-4 w-4 -translate-x-1/2 rounded-full bg-[white]/80 border border-[#d8663c] md:block" />

              {item.side === "left" ? (
                <>
                  <div className="w-full md:w-1/2 md:pr-10">
                    <JourneyCard item={item} />
                  </div>

                  <div className="hidden md:block md:w-1/2" />
                </>
              ) : (
                <>
                  <div className="hidden md:block md:w-1/2" />

                  <div className="w-full md:w-1/2 md:pl-10">
                    <JourneyCard item={item} />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function JourneyCard({ item }) {
  return (
    <div className="journey-card rounded-2xl border border-[white] bg-[#111] p-8 shadow-lg">
      <h3 className="text-xl font-semibold text-[#d8663c]">
        {item.title} {item.company}
      </h3>

      <p className="mt-1 text-sm text-gray-400">
        {item.date}
      </p>

      <p className="mt-2 text-gray-300">
        {item.description}
      </p>
    </div>
  );
}