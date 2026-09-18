import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const offers = [
  {
number: "01",
title: "Full-Stack Web Development",
description:
"Build complete, production-ready web applications from intuitive interfaces to robust backend systems. I create scalable digital products with a strong focus on functionality, maintainability, and user experience.",
points: [
"MERN Stack Development",
"Full-Stack Application Architecture",
"Authentication & Authorization",
"End-to-End Feature Development",
],
},
{
number: "02",
title: "AI-Enhanced Web Applications",
description:
"Build smarter web experiences by integrating AI into real-world products. I use AI capabilities and modern development workflows to create intelligent features that improve automation, interaction, and productivity.",
points: [
"AI API Integration",
"AI-Powered Features",
"Prompt Engineering",
"Intelligent Automation",
],
},
{
number: "03",
title: "Frontend & Interactive Experiences",
description:
"Transform ideas and designs into polished, responsive interfaces that feel fast and intuitive. I combine modern frontend technologies with thoughtful interactions to create engaging experiences across devices.",
points: [
"React & Next.js Development",
"Responsive UI & Component Design",
"GSAP Animations & Interactions",
"Figma-to-Code Implementation",
],
},
{
number: "04",
title: "Backend & API Development",
description:
"Build reliable backend systems that power modern web applications. I develop structured APIs, secure user flows, and efficient database integrations designed to keep applications organized and scalable.",
points: [
"Node.js & Express.js",
"RESTful API Development",
"MongoDB & Mongoose",
"Authentication & Secure API Flows",
],
},
{
number: "05",
title: "Performance & Deployment",
description:
"Take applications from working to refined. I optimize code, interfaces, and assets for better performance while setting up reliable deployment workflows for modern web applications.",
points: [
"Performance Optimization",
"SEO & Accessibility",
"Code Refactoring & Optimization",
"Vercel & Production Deployment",
],
  },
];

export default function Services() {
  const [activeOffer, setActiveOffer] = useState(0);
const screenRef = useRef(null);
  const contentRef = useRef(null);
  const cardsRef = useRef([]);
  const laptopRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current;
      const laptop = laptopRef.current;

      gsap.fromTo(
  ".what-offer-title",
  {
    opacity: 0,
    y: 35,
  },
  {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".what-offer-title",
      start: "top 75%",
      once: true,
    },
  }
);

gsap.fromTo(
  ".what-offer-description",
  {
    opacity: 0,
    y: 25,
  },
  {
    opacity: 1,
    y: 0,
    duration: 0.7,
    delay: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".what-offer-description",
      start: "top 78%",
      once: true,
    },
  }
);

      /* ---------------- LAPTOP FLOAT ---------------- */

      const floatingLaptop = gsap.to(laptop, {
        y: -14,
        rotateX: 3,
        rotateY: -4,
        rotateZ: -1,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      /* ---------------- CARDS ---------------- */

      gsap.set(cards, {
        y: "100%",
        zIndex: 1,
      });

      gsap.set(cards[0], {
        y: 0,
        zIndex: 2,
      });

      

      /* ---------------- PINNED CONTENT ---------------- */

      const tl = gsap.timeline({
        scrollTrigger: {
    trigger: contentRef.current,
    start: "top top",
    end: `+=${offers.length * 100}%`,
    pin: true,
    scrub: 1.3,
    anticipatePin: 1,
    invalidateOnRefresh: true,

    onUpdate: (self) => {
      const index = Math.min(
        offers.length - 1,
        Math.floor(self.progress * offers.length)
      );

      setActiveOffer(index);
    },
  },
      });

      /* ---------------- CARD SLIDE ---------------- */

      for (let i = 1; i < cards.length; i++) {
        tl.set(cards[i], {
          zIndex: i + 2,
        });

        tl.to(cards[i], {
          y: "0%",
          duration: 1,
          ease: "power2.inOut",
        });
      }

      /* ---------------- FINAL HOLD ---------------- */

      tl.to(
        {},
        {
          duration: 1,
        }
      );

      return () => {
        floatingLaptop.kill();
      };
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="what-i-offer"
      className="relative w-full bg-transparent text-white"
    >
      {/* ================= TITLE ================= */}

      <div className="relative h-[35vh] w-full px-[6vw] pt-[3vh] mb-10">
        <h1
          className="
          what-offer-title
            flex
            items-baseline
            gap-[12px]
            text-[clamp(2rem,6vw,6rem)]
            font-black
            uppercase
            leading-[0.85]
            tracking-[-0.055em]
          "
          style={{
            fontFamily: "Arial Black, Arial, sans-serif",
          }}
        >
          <span>WHAT I</span>

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
            OFFER
          </span><span>?</span>
        </h1>

        {/* ORANGE LINE */}

        <div
          className="
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
          what-offer-description
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
          I create modern digital solutions that combine clean design,
scalable development, and seamless user experiences.
        </p></div>

      {/* ================= PINNED CONTENT ================= */}

      <div
        ref={contentRef}
        className="relative h-screen w-full overflow-hidden bg-transparent"
      >
        {/* LAPTOP */}

<div className="absolute left-[2vw] top-[8vh] z-50 flex h-[75vh] w-[45vw] items-start justify-center">
  <div
    ref={laptopRef}
    className="relative w-[92%]"
    style={{
      transformStyle: "preserve-3d",
    }}
  >

  

<div
  ref={screenRef}
  className="absolute left-[20%] top-[16.7%] z-[15] h-[49%] w-[62%] overflow-hidden rounded-[2px]"
>
  <div
    className={`h-full w-full transition-all duration-450 ${
      activeOffer === 0
        ? "bg-[#171717]"
        : activeOffer === 1
        ? "bg-[#111827]"
        : activeOffer === 2
        ? "bg-[#f4f4f4]"
        : activeOffer === 3
        ? "bg-[#101010]"
        : "bg-[#151515]"
    }`}
  >
    {activeOffer === 0 && (
      <div className="h-full p-[6%]">
        <div className="mb-[7%] h-[5px] w-[32%] bg-white/70" />

        <div className="flex h-[75%] gap-[4%]">
          <div className="w-[18%] bg-white/[0.06] p-[6%]">
            <div className="mb-4 h-[3px] w-full bg-[#d16d50]" />
            <div className="mb-4 h-[3px] w-[70%] bg-white/20" />
            <div className="mb-4 h-[3px] w-[85%] bg-white/20" />
          </div>

          <div className="flex-1">
            <div className="mb-[5%] flex gap-[3%]">
              <div className="h-[25px] flex-1 bg-white/[0.08]" />
              <div className="h-[25px] flex-1 bg-white/[0.08]" />
              <div className="h-[25px] flex-1 bg-[#d16d50]/70" />
            </div>

            <div className="flex h-[60%] items-end gap-[3%] bg-white/[0.04] p-[5%]">
              <span className="h-[30%] flex-1 bg-[#d16d50]" />
              <span className="h-[55%] flex-1 bg-[#d16d50]" />
              <span className="h-[40%] flex-1 bg-[#d16d50]" />
              <span className="h-[75%] flex-1 bg-[#d16d50]" />
              <span className="h-[60%] flex-1 bg-[#d16d50]" />
              <span className="h-[88%] flex-1 bg-[#d16d50]" />
            </div>
          </div>
        </div>
      </div>
    )}

    {activeOffer === 1 && (
      <div className="h-full p-[7%]">
        <div className="mb-[8%] flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d16d50] text-[6px] font-bold text-white">
            AI
          </div>

          <div>
            <div className="h-[4px] w-16 bg-white/70" />
            <div className="mt-1 h-[3px] w-10 bg-white/20" />
          </div>
        </div>

        <div className="space-y-[6%]">
          <div className="w-[55%] bg-white/[0.08] p-[5%]">
            <div className="h-[3px] w-[75%] bg-white/30" />
            <div className="mt-2 h-[3px] w-[50%] bg-white/20" />
          </div>

          <div className="ml-auto w-[55%] bg-[#d16d50] p-[5%]">
            <div className="h-[3px] w-[75%] bg-white/70" />
            <div className="mt-2 h-[3px] w-[55%] bg-white/50" />
          </div>

          <div className="w-[45%] bg-white/[0.08] p-[5%]">
            <div className="h-[3px] w-[80%] bg-white/30" />
          </div>
        </div>
      </div>
    )}

    {activeOffer === 2 && (
      <div className="h-full p-[5%]">
        <div className="mb-[5%] h-[5px] w-[35%] bg-black/70" />

        <div className="flex h-[78%] gap-[4%]">
          <div className="w-[20%] bg-black/10 p-[6%]">
            <div className="mb-3 h-[3px] w-full bg-[#d16d50]" />
            <div className="mb-3 h-[3px] w-[70%] bg-black/20" />
            <div className="h-[3px] w-[85%] bg-black/20" />
          </div>

          <div className="flex-1">
            <div className="h-[45%] bg-white shadow-sm">
              <div className="p-[7%]">
                <div className="h-[5px] w-[45%] bg-black/70" />
                <div className="mt-3 h-[3px] w-[70%] bg-black/15" />
                <div className="mt-5 h-4 w-[25%] bg-[#d16d50]" />
              </div>
            </div>

            <div className="mt-[5%] flex gap-[4%]">
              <div className="h-[25px] flex-1 bg-white" />
              <div className="h-[25px] flex-1 bg-white" />
            </div>
          </div>
        </div>
      </div>
    )}

    {activeOffer === 3 && (
      <div className="relative h-full">
        <div className="absolute left-[8%] top-[20%] flex h-[18%] w-[22%] items-center justify-center border border-white/20 text-[6px] text-white/60">
          CLIENT
        </div>

        <div className="absolute left-[39%] top-[20%] flex h-[18%] w-[22%] items-center justify-center border border-[#d16d50] text-[6px] text-white/70">
          API
        </div>

        <div className="absolute right-[8%] top-[20%] flex h-[18%] w-[22%] items-center justify-center border border-white/20 text-[6px] text-white/60">
          AUTH
        </div>

        <div className="absolute left-[39%] bottom-[12%] flex h-[18%] w-[28%] items-center justify-center border border-white/20 text-[6px] text-white/60">
          DATABASE
        </div>

        <div className="absolute left-[30%] top-[29%] h-px w-[10%] bg-[#d16d50]/60" />
        <div className="absolute left-[61%] top-[29%] h-px w-[10%] bg-[#d16d50]/60" />
        <div className="absolute left-1/2 top-[38%] h-[28%] w-px bg-[#d16d50]/60" />
      </div>
    )}

    {activeOffer === 4 && (
      <div className="h-full p-[7%]">
        <div className="flex items-center gap-[8%]">
          <div className="text-white">
            <div className="text-[34px] font-bold leading-none">
              95
            </div>

            <div className="mt-1 text-[5px] tracking-[0.15em] text-white/40">
              PERFORMANCE
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <div className="h-[5px] bg-white/10">
              <div className="h-full w-[95%] bg-[#d16d50]" />
            </div>

            <div className="h-[5px] bg-white/10">
              <div className="h-full w-[88%] bg-[#d16d50]" />
            </div>

            <div className="h-[5px] bg-white/10">
              <div className="h-full w-[92%] bg-[#d16d50]" />
            </div>

            <div className="h-[5px] bg-white/10">
              <div className="h-full w-[78%] bg-[#d16d50]" />
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
</div>
    {/* LAPTOP */}
    <img
      src="/laptop.png"
      alt="Laptop"
      className="relative z-10 block w-full object-contain"
      draggable="false"
    />

  </div>
</div>

        {/* RIGHT CARDS */}

        <div className="absolute right-[0vw] z-30 h-[100vh] w-[50vw] overflow-hidden">
          <div className="relative h-full w-full">
            {offers.map((offer, index) => (
              <article
                key={offer.number}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="
                  absolute
                  inset-0
                  flex
                  items-center
                  bg-white
                  px-[4vw]
                  py-[3vh]
                  text-[#292624]
                  shadow-[0_25px_70px_rgba(0,0,0,0.7)]
                "
              >
                <div className="w-full max-w-[620px]">
                  <p className="mb-5 text-[11px] tracking-[0.25em] text-black/25">
                    {offer.number}
                  </p>

                  <h3 className="text-[clamp(2rem,3.1vw,3.8rem)] font-bold leading-[0.95] tracking-[-0.05em]">
                    {offer.title}
                  </h3>

                  <div className="mt-5 h-[4px] w-[170px] bg-[#d16d50]" />

                  <p className="mt-13 text-[17px] font-serif leading-[1.65] text-black/75">
                    {offer.description}
                  </p>

                  <div className="mt-10 space-y-4">
                    {offer.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-center gap-5 text-[17px] text-black/85"
                      >
                        <span className="text-[#d16d50]">✓</span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}