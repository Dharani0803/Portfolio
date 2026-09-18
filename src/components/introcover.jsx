import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function IntroCover({ onFinished }) {
  const transitionStartedRef = useRef(false);
  const roleTextRef = useRef(null);

  /* =====================================================
     NAME + ROLE + TRANSITION
  ===================================================== */

  useEffect(() => {
    const nameElements = gsap.utils.toArray(
      ".name-letter"
    );

    const roleText = roleTextRef.current;

    if (!nameElements.length) return;

    const middle =
      (nameElements.length - 1) / 2;

    gsap.set(nameElements, {
      opacity: 1,

      x: (index) => {
        if (index < middle) return -45;
        if (index > middle) return 45;
        return 0;
      },

      clipPath: "inset(0 100% 0 0)",
    });

    gsap.set(roleText, {
      opacity: 0,
      y: 15,
    });

    const timeline = gsap.timeline();

    /* NAME REVEAL */
    timeline.to(
      nameElements,
      {
        x: 0,
        clipPath: "inset(0 0% 0 0)",
        duration: 1.35,
        ease: "power4.out",
        stagger: {
          amount: 0.12,
        },
      },
      0.7
    );

    /* ROLE REVEAL */
    timeline.to(
      roleText,
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: "power3.out",
      },
      1.5
    );

    /* START 5-PART TRANSITION */
    timeline.call(
      () => {
        startFinalTransition();
      },
      [],
      2.6
    );

    return () => {
      timeline.kill();
    };
  }, []);

  /* =====================================================
     FINAL TRANSITION
  ===================================================== */

  const startFinalTransition = () => {
    if (transitionStartedRef.current) return;

    transitionStartedRef.current = true;

    const parts = gsap.utils.toArray(
      ".intro-transition-part"
    );

    gsap.set(parts, {
      xPercent: 105,
      autoAlpha: 1,
    });

    gsap.to(parts, {
      xPercent: -105,
      duration: 0.42,
      stagger: 0.045,
      ease: "power4.inOut",

      onComplete: () => {
        onFinished?.();
      },
    });
  };

  return (
    <div className="intro-cover">

      {/* CENTER CONTENT */}

      <div className="intro-content">

        <h1 className="intro-name">

          <span className="name-letter">
            DHARANI
          </span>

          <span className="name-space" />

          <span className="name-letter">
            K
          </span>

        </h1>

        <p className="intro-role">

          <span
            ref={roleTextRef}
            className="intro-role-text"
          >
            FULL-STACK DEVELOPER
          </span>

        </p>

      </div>

      {/* 5 PART TRANSITION */}

      <div className="intro-transition">

        <div className="intro-transition-part part-1" />
        <div className="intro-transition-part part-2" />
        <div className="intro-transition-part part-3" />
        <div className="intro-transition-part part-4" />
        <div className="intro-transition-part part-5" />

      </div>

    </div>
  );
}