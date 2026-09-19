import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ShootingStars from "./ui/shootingstars";

gsap.registerPlugin(ScrollTrigger);

const icon = (name, color = "ffffff") =>
  `https://cdn.simpleicons.org/${name}/${color}`;

const skills = [
  { name: "HTML", icon: icon("html5", "E34F26") },
  { name: "CSS", icon: "https://cdn.simpleicons.org/css/1572B6" },
  { name: "JavaScript", icon: icon("javascript", "F7DF1E") },
  { name: "TypeScript", icon: icon("typescript", "3178C6") },
  { name: "Python", icon: icon("python", "3776AB") },

  { name: "React.js", icon: icon("react", "61DAFB") },
  { name: "Next.js", icon: icon("nextdotjs", "FFFFFF") },
  { name: "Redux", icon: icon("redux", "764ABC") },
  { name: "Tailwind CSS", icon: icon("tailwindcss", "06B6D4") },
  { name: "Vite", icon: icon("vite", "646CFF") },
  { name: "Axios", icon: icon("axios", "5A29E4") },
  { name: "Recharts", mark: "RC" },

  { name: "Node.js", icon: icon("nodedotjs", "339933") },
  { name: "Express.js", icon: icon("express", "FFFFFF") },
  { name: "REST APIs", mark: "API" },
  { name: "JWT Authentication", mark: "JWT" },
  { name: "Mongoose", icon: icon("mongoose", "880000") },

  { name: "MongoDB", icon: icon("mongodb", "47A248") },
  { name: "MongoDB Atlas", icon: icon("mongodb", "47A248") },
  { name: "MySQL", icon: icon("mysql", "4479A1") },
  { name: "Firebase", icon: icon("firebase", "FFCA28") },

  { name: "Git", icon: icon("git", "F05032") },
  { name: "GitHub", icon: icon("github", "FFFFFF") },
  { name: "Postman", icon: icon("postman", "FF6C37") },
  { name: "Vercel", icon: icon("vercel", "FFFFFF") },
  { name: "Render", icon: icon("render", "46E3B7") },
  { name: "Photoshop", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/adobephotoshop.svg" },
  { name: "Netlify", icon: icon("netlify", "00C7B7") },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const wordRef = useRef(null);

  useLayoutEffect(() => {
    let interval;

    const ctx = gsap.context(() => {
      // Everything starts together (position parameter = offset from start),
      // so the whole reveal finishes in ~1 second instead of ~3.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            once: true,
          },
        })
        .fromTo(
          ".skills-ghost",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 0.055, duration: 0.7, ease: "power3.out" },
          0
        )
        .fromTo(
          ".skills-title",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
          0.05
        )
        .fromTo(
          ".skills-divider",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.5, ease: "power3.out" },
          0.15
        )
        .fromTo(
          ".skills-learning",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
          0.2
        )
        .fromTo(
          ".skill-pill",
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.012,
            ease: "power3.out",
          },
          0.25
        );

      // Rotating word
      const words = ["IMPROVE", "LEARN", "ADAPT", "GROW"];
      let index = 0;

      const changeWord = () => {
        if (!wordRef.current) return;

        gsap.to(wordRef.current, {
          y: -10,
          opacity: 0,
          duration: 0.22,
          ease: "power2.in",
          onComplete: () => {
            if (!wordRef.current) return;

            index = (index + 1) % words.length;
            wordRef.current.textContent = words[index];

            gsap.fromTo(
              wordRef.current,
              { y: 10, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.22,
                ease: "power2.out",
              }
            );
          },
        });
      };

      interval = setInterval(changeWord, 2200);
    }, sectionRef);

    return () => {
      clearInterval(interval);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen w-full overflow-hidden bg-[#080808] text-white"
    >
      {/* Blurred background SKILLS */}
      <div
        className="
          skills-ghost
          pointer-events-none
          absolute
          left-1/2
          top-[20px]
          -translate-x-1/2
          select-none
          whitespace-nowrap
          text-[clamp(5rem,15vw,15rem)]
          font-black
          uppercase
          leading-none
          tracking-[-0.08em]
          blur-[8px]
        "
      >
        SKILLS
      </div>
      <ShootingStars />

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-screen
          w-full
          max-w-[1400px]
          flex-col
          items-center
          px-[30px]
          pb-[60px]
          pt-[95px]
        "
      >
        {/* TITLE */}
        <h2
          className="
            skills-title
            text-center
            text-[clamp(3.2rem,5vw,5.5rem)]
            font-medium
            leading-none
            tracking-[-0.055em]
          "
        >
          Skills
        </h2>

        {/* DIVIDER */}
        <div className="skills-divider mt-[55px] flex w-full max-w-[520px] items-center">
          {/* LEFT */}
          <div className="relative flex-1">
            <div className="h-[1px] w-full bg-white/[0.10]" />

            <span className="absolute left-0 top-1/2 -translate-y-1/2">
              <span
                className="block h-0 w-0"
                style={{
                  borderTop: "5px solid transparent",
                  borderBottom: "5px solid transparent",
                  borderRight: "10px solid rgba(255,255,255,0.10)",
                }}
              />
            </span>
          </div>

          {/* CENTER */}
          <div className="relative z-10 mx-[10px] h-[22px] w-[52px]">
            <span
              className="
                absolute
                left-[7px]
                top-1/2
                h-[17px]
                w-[17px]
                -translate-y-1/2
                rotate-45
                border
                border-white/65
                bg-black
              "
            />

            <span
              className="
                absolute
                right-[7px]
                top-1/2
                h-[17px]
                w-[17px]
                -translate-y-1/2
                rotate-45
                border
                border-white/65
                bg-black
              "
            />
          </div>

          {/* RIGHT */}
          <div className="relative flex-1">
            <div className="h-[1px] w-full bg-white/[0.10]" />

            <span className="absolute right-0 top-1/2 -translate-y-1/2">
              <span
                className="block h-0 w-0"
                style={{
                  borderTop: "5px solid transparent",
                  borderBottom: "5px solid transparent",
                  borderLeft: "10px solid rgba(255,255,255,0.10)",
                }}
              />
            </span>
          </div>
        </div>

        {/* LEARNING TEXT */}
        <div
          className="
            skills-learning
            mt-[42px]
            flex
            items-center
            justify-center
            gap-[9px]
            text-center
            text-[13px]
            font-medium
            uppercase
            tracking-[0.22em]
            text-white/55
            md:text-[15px]
          "
        >
          <span>I CONSTANTLY TRY TO</span>

          <span
            ref={wordRef}
            className="min-w-[72px] text-white"
          >
            LEARN
          </span>
        </div>

        {/* SKILL PILLS */}
        <div
          className="
            mt-[65px] mb-[50px]
            flex
            w-full
            max-w-[1000px]
            flex-wrap
            items-center
            justify-center
            gap-x-[10px]
            gap-y-[12px]
            md:gap-x-[10px]
            md:gap-y-[12px]
          "
        >
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="
                skill-pill
                flex
                h-[50px]
                items-center
                gap-[10px]
                rounded-full
                border
                border-white/[0.09]
                bg-[#111214]
                px-[15px]
                shadow-[0_0_20px_rgba(255,255,255,0.015)]
                transition-all
                duration-300
                hover:border-white/20
                hover:bg-[#151618]
              "
            >
              {skill.icon ? (
                <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center">
                  <img
                    src={skill.icon}
                    alt=""
                    className="h-[21px] w-[21px] object-contain"
                  />
                </span>
              ) : (
                <span
                  className="
                    flex
                    h-[24px]
                    w-[24px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-[5px]
                    border
                    border-white/20
                    text-[7px]
                    font-bold
                    tracking-wide
                    text-white/75
                  "
                >
                  {skill.mark}
                </span>
              )}

              <span
                className="
                  whitespace-nowrap
                  text-[14px]
                  font-medium
                  tracking-[-0.01em]
                  text-white/85
                "
              >
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}