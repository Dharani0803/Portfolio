import { useEffect, useRef } from "react";

export default function AmanStars() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let animationFrame;

    const stars = [];
    const shootingStars = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    /*
      AMAN STYLE STATIC STAR FIELD
    */
    const createStars = () => {
      stars.length = 0;

      const count = Math.floor(
        (width * height) / 18000
      );

      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 0.75 + 0.25,
          baseOpacity:
            Math.random() * 0.45 + 0.15,
          twinkle:
            Math.random() * Math.PI * 2,
          speed:
            Math.random() * 0.015 + 0.005,
        });
      }
    };

    /*
      OCCASIONAL SHOOTING STAR
    */
    const createShootingStar = () => {
      shootingStars.push({
        x: Math.random() * width * 0.85 + width * 0.15,
        y: Math.random() * height * 0.45,

        length: Math.random() * 90 + 60,

        speed: Math.random() * 7 + 5,

        opacity: Math.random() * 0.35 + 0.25,

        life: 0,

        maxLife: Math.random() * 45 + 35,
      });
    };

    const drawStars = (time) => {
      stars.forEach((star) => {
        star.twinkle += star.speed;

        const opacity =
          star.baseOpacity +
          Math.sin(star.twinkle + time * 0.0004) * 0.08;

        ctx.beginPath();

        ctx.arc(
          star.x,
          star.y,
          star.radius,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = `rgba(255,255,255,${Math.max(
          0.04,
          opacity
        )})`;

        ctx.fill();
      });
    };

    const drawShootingStars = () => {
      shootingStars.forEach((star, index) => {
        star.life++;

        star.x -= star.speed;
        star.y += star.speed * 0.42;

        const progress =
          star.life / star.maxLife;

        let opacity = star.opacity;

        if (progress < 0.15) {
          opacity *= progress / 0.15;
        }

        if (progress > 0.75) {
          opacity *=
            (1 - progress) / 0.25;
        }

        /*
          diagonal thin tail
        */
        const tailX =
          star.x + star.length;

        const tailY =
          star.y - star.length * 0.42;

        const gradient =
          ctx.createLinearGradient(
            star.x,
            star.y,
            tailX,
            tailY
          );

        gradient.addColorStop(
          0,
          `rgba(255,255,255,${opacity})`
        );

        gradient.addColorStop(
          0.25,
          `rgba(255,255,255,${opacity * 0.45})`
        );

        gradient.addColorStop(
          1,
          "rgba(255,255,255,0)"
        );

        ctx.beginPath();

        ctx.moveTo(
          star.x,
          star.y
        );

        ctx.lineTo(
          tailX,
          tailY
        );

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        /*
          tiny bright head
        */
        ctx.beginPath();

        ctx.arc(
          star.x,
          star.y,
          1,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = `rgba(255,255,255,${opacity})`;

        ctx.fill();

        if (
          star.life > star.maxLife ||
          star.x < -150 ||
          star.y > height + 100
        ) {
          shootingStars.splice(index, 1);
        }
      });
    };

    let lastShootingStar = 0;

    const animate = (time) => {
      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      drawStars(time);

      /*
        Shooting star every ~4–8 seconds
      */
      if (
        time - lastShootingStar >
        4000 + Math.random() * 4000
      ) {
        createShootingStar();
        lastShootingStar = time;
      }

      drawShootingStars();

      animationFrame =
        requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resize();
      createStars();
    };

    resize();
    createStars();

    window.addEventListener(
      "resize",
      handleResize
    );

    animationFrame =
      requestAnimationFrame(animate);

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );

      cancelAnimationFrame(
        animationFrame
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
    />
  );
}