import { useEffect, useRef } from "react";


const PARTICLE_COUNT = 70;

function makeParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    origin: 0.08 + Math.random() * 0.84,
    speed: 0.00018 + Math.random() * 0.00025,
    lift: Math.random(),
    phase: Math.random(),
    size: Math.random() > 0.82 ? 3 : 2,
    alpha: 0.25 + Math.random() * 0.45,
  }));
}

export default function Emailbox() {
  const cardRef = useRef(null);
  const domeRef = useRef(null);
  const particlesRef = useRef(null);
  const rafRef = useRef(null);

  const particles = useRef(makeParticles());

  useEffect(() => {
    const card = cardRef.current;
    const dome = domeRef.current;
    const particleLayer = particlesRef.current;

    if (!card || !dome || !particleLayer) return;

    const dots = [...particleLayer.children];

    let start = performance.now();
    let mouseNearBottom = false;
    let mouseLift = 0;

    const animate = (time) => {
      const elapsed = time - start;

      /* --------------------------------
         DARK CIRCLE MOVEMENT
      -------------------------------- */

      const breathing =
  Math.sin(elapsed * 0.0008) * 5 +
  Math.sin(elapsed * 0.00043) * 3;

const targetLift = mouseNearBottom ? 45 : 0;

mouseLift += (targetLift - mouseLift) * 0.08;

dome.style.bottom =
  `${-350 + breathing + mouseLift}px`;

     

      /* --------------------------------
         PARTICLES
         Dots originate from circle
      -------------------------------- */

      particles.current.forEach((p, i) => {
  const dot = dots[i];

  if (!dot) return;

  const progress =
    (elapsed * p.speed + p.phase) % 1;

  /*
    Circle-ன் upper surface
    left ↔ right spread
  */
  const spread =
    (p.origin - 0.5) * 500;

  /*
    Circle-லிருந்து மேலே எழுகிறது
  */
  const rise =
    progress * (150 + p.lift * 130);

  /*
    Small organic movement
  */
  const drift =
    Math.sin(
      elapsed * 0.001 +
        p.phase * 7
    ) * 10;

  const x =
    spread + drift;

  const y =
    -rise;

  /*
    Start invisible
    ↓
    appear
    ↓
    float upward
    ↓
    disappear
  */
  const fadeIn =
    Math.min(progress / 0.08, 1);

  const fadeOut =
    progress > 0.68
      ? Math.max(
          0,
          1 -
            (progress - 0.68) /
              0.32
        )
      : 1;

  const opacity =
    fadeIn *
    fadeOut *
    p.alpha;

  const scale =
    0.7 +
    Math.sin(progress * Math.PI) *
      0.45;

  /* THIS WAS MISSING */
  dot.style.transform = `
    translate3d(
      ${x}px,
      ${y}px,
      0
    )
    scale(${scale})
  `;

  dot.style.opacity = opacity;
});

      rafRef.current =
        requestAnimationFrame(animate);
    };

    /* --------------------------------
       CURSOR
    -------------------------------- */

    const handleMouseMove = (e) => {
      const rect =
        card.getBoundingClientRect();

      const x =
        (e.clientX - rect.left) /
        rect.width;

      const y =
        (e.clientY - rect.top) /
        rect.height;

      mouseNearBottom =
        y > 0.58 &&
        x > 0.15 &&
        x < 0.85;
    };

    const handleMouseLeave = () => {
      mouseNearBottom = false;
    };

    card.addEventListener(
      "mousemove",
      handleMouseMove
    );

    card.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    rafRef.current =
      requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(
        rafRef.current
      );

      card.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      card.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };
  }, []);

  return (
    <section
      className="
        relative
        flex
        min-h-screen
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-[#080a09]
        px-[12vw]
        py-[8vh]
      "
    >
      {/* =====================================
          MAIN CONTACT CARD
      ====================================== */}

      <div
        ref={cardRef}
        className="
          relative
          h-[min(533px,68vh)]
          w-full
          max-w-[1290px]
          overflow-hidden
          rounded-[30px]
          bg-[#8ABD1E]
          shadow-[inset_0_-80px_80px_rgba(0,0,0,0.65)]
        "
      >
        {/* =====================================
            GRID
        ====================================== */}

        {/* CENTER GRID ONLY */}
<div
  className="
    pointer-events-none
    absolute
    left-1/2
    top-[32%]
    z-[4]
    h-[45%]
    w-[58%]
    -translate-x-1/2
    opacity-[0.18]
  "
  style={{
    backgroundImage: `
      linear-gradient(
        rgba(20,30,10,.35) 1px,
        transparent 1px
      ),
      linear-gradient(
        90deg,
        rgba(20,30,10,.35) 1px,
        transparent 1px
      )
    `,
    backgroundSize: "54px 54px",
    maskImage:
      "radial-gradient(ellipse at center, black 45%, transparent 100%)",
    WebkitMaskImage:
      "radial-gradient(ellipse at center, black 45%, transparent 100%)",
  }}
/>
        

        {/* =====================================
            SOFT GREEN LIGHT
        ====================================== */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-[-300px]
            left-1/2
            z-[2]
            h-[300px]
            w-[690px]
            -translate-x-1/2
            rounded-[50%]
            bg-[#a9e51b]
            opacity-50
            blur-[40px]
          "
        />

        {/* PARTICLES */}
<div
  ref={particlesRef}
  className="
    pointer-events-none
    absolute
    left-1/2
    top-[78%]
    z-[7]
    h-[190px]
    w-[700px]
    -translate-x-1/2
  "
>
  {particles.current.map((particle) => (
    <span
      key={particle.id}
      className="
        absolute
        left-1/2
        top-0
        block
        rounded-full
        bg-[#18200f]
        will-change-transform
      "
      style={{
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        opacity: 0,
      }}
    />
  ))}
</div>

{/* GREEN INNER SHADOW */}
{/* DARK GREEN SHADOW AROUND DOME */}
<div
  className="
    pointer-events-none
    absolute
    bottom-[-330px]
    left-1/2
    z-[4]
    h-[390px]
    w-[850px]
    -translate-x-1/2
    rounded-[50%]
    bg-[#5d8615]
    opacity-[0.75]
    blur-[45px]
  "
/>

{/* DARK CIRCLE — EXACT CENTER */}
<div
  ref={domeRef}
  className="
    pointer-events-none
    absolute
    bottom-[-350px]
    left-1/2
    z-[5]
    h-[440px]
    w-[780px]
    -translate-x-1/2
    rounded-[50%]
    border
  border-[#6b6f68]
  bg-[#11160f]
  opacity-80
  "
/>

{/* BOTTOM INNER SHADOW */}
<div
  className="
    pointer-events-none
    absolute
    inset-x-0
    bottom-0
    z-[8]
    h-[180px]
    bg-gradient-to-b
    from-transparent
    via-[#6f9f18]/30
    to-[#3f5f0c]/75
  "
/>
        

        {/* =====================================
            CONTENT
        ====================================== */}

        <div
          className="
            relative
            z-[10]
            mx-auto
            flex
            w-[60%]
            max-w-[770px]
            flex-col
            pt-[36px]
          "
        >
          {/* HEADING */}

          <h2
            className="
              font-['Instrument_Sans',sans-serif]
              text-[clamp(2.8rem,3vw,4rem)]
              font-semibold
              
              text-[#10130e]
            "
          >
            Let's create great things
            <br />
            together
          </h2>

          {/* SUBTITLE */}

          <p
            className="
              mt-[17px]
              text-[18px]
              font-serif
              tracking-[-0.02em]
              text-[#24291e]
            "
          >
            Drop your email and I'll contact
            you soon ;)
          </p>

          {/* =====================================
              EMAIL INPUT
          ====================================== */}

          <form
            onSubmit={(e) =>
              e.preventDefault()
            }
            className="
              group
              relative
              mt-[50px]
              flex
              p-2
              w-[580px]
              items-center
              
              rounded-full
              bg-[#e0e1d5]/[0.88]
              
            "
          >
            <input
              type="email"
              placeholder="email here..."
              className="
                h-full
                min-w-0
                flex-1
                bg-transparent
                px-[20px]
                font-['Instrument_Sans',sans-serif]
                text-[16px]
                text-[#111]
                outline-none
                placeholder:text-[#313130]
              "
            />

            <button
  type="submit"
  aria-label="Submit email"
  className="
    mr-[15px]
    flex
    h-[40px]
    w-[22px]
    shrink-0
    items-center
    justify-center
    bg-transparent
    text-[#360c0c]
  "
>
  <svg
  width="23"
  height="20"
  viewBox="0 0 30 24"
  fill="none"
>
  <path
    d="M3 2L27 12L3 22V15L15 12L3 9V2Z"
    fill="#111"
    stroke="#111"
    strokeWidth="2"
    strokeLinejoin="round"
    strokeLinecap="round"
  />
</svg>
</button>
          </form>
        </div>
      </div>
    </section>
  );
}