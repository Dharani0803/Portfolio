import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { KineticGrid } from "./ui/kinetic-grid";

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    number: "01",
    title: "Full-Stack MERN Development",
    organization: "Error Makes Clever Academy",
    date: "July 2026",
    description:
      "A hands-on certification focused on modern full-stack web development, covering frontend and backend development with the MERN ecosystem and practical application building.",
  },
  {
    number: "02",
    title: "Prompt Engineering",
    organization: "Error Makes Clever Academy",
    date: "July 2026",
    description:
      "Certification focused on effective prompt design and AI interaction techniques, developing practical skills for communicating with and working alongside AI tools.",
  },
  {
    number: "03",
    title: "Python with Full-Stack Development",
    organization: "Hitakey Tech Solution Pvt Ltd",
    date: "January 2026",
    description:
      "Certification focused on Python and full-stack web development, strengthening programming fundamentals and practical web application development skills.",
  },
  {
    number: "04",
    title: "IBM CSR Training Program",
    organization: "ICT Academy",
    date: "December 2025",
    credential: "G-2026-G5110-0047",
    description:
      "Training focused on cybersecurity concepts and awareness, providing practical exposure to security fundamentals and responsible digital practices.",
  },
  {
    number: "05",
    title: "Industrial Exposure",
    organization: "iHub School of Learning",
    date: "February 2025",
    description:
      "Industry-oriented exposure designed to connect academic learning with practical technology environments and professional development.",
  },
  {
    number: "06",
    title: "ICETCSMA’25 Conference Certification",
    organization: "ICETCSMA’25",
    date: "January 2025",
    description:
      "Conference participation and certification reflecting exposure to emerging technologies, technical discussions, and current developments in the computing domain.",
  },
  {
    number: "07",
    title: "Diploma in User Interface Automation",
    organization: "ICT Academy",
    date: "December 2024",
    description:
      "A specialized certification focused on user interface automation, combining technical concepts with practical exposure to building and working with automated interfaces.",
  },
];

export default function Certifications() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
  const section = sectionRef.current;
  const cards = cardsRef.current.filter(Boolean);

  if (!section || !cards.length) return;

  gsap.set(cards, {
    y: (index) => (index === 0 ? 0 : 80),
    x: (index) => (index === 0 ? 0 : 25),
    scale: (index) => (index === 0 ? 1 : 0.96),
    opacity: (index) => (index === 0 ? 1 : 0),
    zIndex: (index) => certifications.length - index,
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: `+=${certifications.length * 650}`,
      pin: true,
      scrub: 2.5,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  certifications.forEach((_, index) => {
    if (index === 0) return;

    const previous = cards[index - 1];
    const current = cards[index];

    // Previous card moves away smoothly
    tl.to(
      previous,
      {
        y: -45,
        x: -12,
        scale: 0.97,
        opacity: 0,
        duration: 1.4,
        ease: "power2.inOut",
      },
      "+=0.25"
    );

    // New card slides in
    tl.fromTo(
      current,
      {
        y: 90,
        x: 25,
        scale: 0.96,
        opacity: 0,
      },
      {
        y: 0,
        x: 0,
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      },
      "<0.35"
    );
  });

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
  };
}, []);

  return (
    <section
      id="certifications"
      data-scroll-section="6"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#161616] text-white"
    ><KineticGrid/>

      {/* TOP HEADER */}

      <div className="absolute left-[7vw] top-[4vh] z-30">
        <div className="flex items-center">
          <span className="text-[9px] font-medium tracking-[0.35em] text-white/[0.62]">
            SELECTED CREDENTIALS
          </span>
        </div>

        <div className="mt-2 flex items-end gap-4">
          <h2 className="m-0 text-6xl font-bold leading-[0.85] tracking-[-0.055em] text-white/90">
            CERTIFICATIONS
          </h2>
        </div>
      </div>


      {/* CARD */}

      <div className="absolute left-0 top-[27vh] h-[61vh] w-full">
        <div className="absolute left-1/2 top-0 h-full w-[62%] max-w-[1120px] -translate-x-1/2">
        

          {certifications.map((cert, index) => (
            <article
              key={cert.number}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="absolute inset-0 overflow-hidden rounded-[26px] border-2 border-black/50 bg-white/95 p-2 shadow-[0_35px_100px_rgba(0,0,0,0.45)] p-[2vw] will-change-transform"
            >

              

              {/* LARGE BACKGROUND NUMBER */}

              <span className="pointer-events-none absolute bottom-[6vw] right-[3vw] select-none text-[clamp(170px,18vw,230px)] font-bold leading-[0.75] tracking-[-0.010em] text-black/[0.055]">
                {cert.number}
              </span>

              {/* CARD HEADER */}

              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <span className=" text-[8px] font-medium tracking-[0.3em] text-black/[0.4]">
                    VERIFIED CREDENTIAL
                  </span>

                  <div className="mt-1 flex items-center gap-4">
                    <span className="text-[25px] font-medium leading-none tracking-[-0.05em] text-black">
                      {cert.number}
                    </span>

                    <span className="border-l border-black/[0.4] pl-[14px] text-[9px] tracking-[0.12em] text-black/[0.4]">
                      {cert.date}
                    </span>
                  </div>
                </div>

                <span className="text-[8px] tracking-[0.2em] text-black/[0.4]">
                  {cert.number} / 07
                </span>
              </div>

              {/* MAIN CONTENT */}

              <div className="relative z-10 mt-[6vh] max-w-[850px]">
                <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.28em] text-black/[0.4]">
                  Certification
                </p>

                <h3 className="m-0 max-w-[800px] text-[clamp(30px,3.4vw,60px)] font-medium leading-[0.98] tracking-[-0.045em] text-black">
                  {cert.title}
                </h3>

                <div className="mb-7 mt-3 h-0.5 w-[180px] bg-[linear-gradient(to_right,#d8663c,rgba(216,102,60,0.2),transparent)]">
                  <span />
                </div>

                <p className="mb-[10px] text-[10px] font-medium uppercase tracking-[0.2em] text-black/[0.52]">
                  {cert.organization}
                </p>

                <p className="m-0 max-w-[720px] text-[13px] leading-[1.75] text-black/[0.45]">
                  {cert.description}
                </p>

                {cert.credential && (
                  <div className="mt-5 flex items-center gap-[14px]">
                    <span className="text-[8px] uppercase tracking-[0.2em] text-black/[0.40]">
                      Credential ID
                    </span>

                    <strong className="text-[9px] font-medium tracking-[0.1em] text-black/[0.45]">
                      {cert.credential}
                    </strong>
                  </div>
                )}
              </div>

              {/* BOTTOM */}

              <div className="absolute bottom-[2.8vw] left-[3.2vw] right-[3.2vw] z-10 flex items-end justify-between">
                <div>
                  <span >
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[7px] font-medium tracking-[0.25em] text-black/[0.4]">
                  <span className="flex h-[17px] w-[17px] items-center justify-center rounded-full border border-[#d8663c]/[0.45] text-[9px] text-[#d8663c]">
                    ✓
                  </span>

                  <span>VERIFIED</span>
                </div>
              </div>

            </article>
          ))}

        </div>
      </div>


    </section>
  );
}