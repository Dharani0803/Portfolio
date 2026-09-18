import { useEffect, useRef } from "react";

/**
 * Kinetic grid background — a lattice of dots/lines that bends toward
 * the cursor and sends out a ripple wave on every click.
 *
 * Usage (put it behind your page content, same pattern as the other
 * background components):
 *
 *   <section className="relative overflow-hidden bg-black min-h-screen">
 *     <KineticGrid />
 *     <div className="relative z-10">...your content...</div>
 *   </section>
 */
/**
 * One shared color function for BOTH dots and lines — dim white at
 * rest, blending to blue as proximity (t, 0..1) to the cursor increases.
 * Using the same function for both means they always change together.
 */
function colorFor(t) {
  if (t <= 0) return "rgba(255,255,255,0.4)";
  const rr = Math.round(255 + (40 - 255) * t);
  const gg = Math.round(255 + (140 - 255) * t);
  return `rgba(${rr},${gg},255,${0.4 + t * 0.55})`;
}

function proximity(x, y, mouse, warpRadius) {
  const dx = mouse.x - x;
  const dy = mouse.y - y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  return dist < warpRadius ? 1 - dist / warpRadius : 0;
}

export function KineticGrid({
  spacing = 48,
  warpRadius = 220,
  warpStrength = 30,
  className = "",
}) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const ripplesRef = useRef([]);
  const pointsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationId;

    const buildGrid = () => {
      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;
      const points = [];
      for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < cols; c++) {
          const bx = c * spacing;
          const by = r * spacing;
          row.push({ bx, by, x: bx, y: by });
        }
        points.push(row);
      }
      pointsRef.current = points;
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid();
    };
    resize();
    window.addEventListener("resize", resize);
    const resizeObserver = new ResizeObserver(resize);
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

    // Listen on window (not the canvas) so the canvas can stay
    // pointer-events-none and never block clicks on real page content,
    // while still reacting to the cursor anywhere on the page.
    const handleMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      ripplesRef.current.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        start: performance.now(),
      });
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    window.addEventListener("click", handleClick);

    const rippleDuration = 1200; // ms
    const rippleMaxRadius = 420;
    const rippleWidth = 60;
    const rippleStrength = 22;

    const draw = () => {
      const mouse = mouseRef.current;
      const now = performance.now();

      ripplesRef.current = ripplesRef.current.filter(
        (r) => now - r.start < rippleDuration
      );

      ctx.clearRect(0, 0, width, height);

      const points = pointsRef.current;

      // --- update each point's position ---
      for (let r = 0; r < points.length; r++) {
        for (let c = 0; c < points[r].length; c++) {
          const p = points[r][c];
          let targetX = p.bx;
          let targetY = p.by;

          // pull toward the cursor, stronger the closer it is
          const dx = mouse.x - p.bx;
          const dy = mouse.y - p.by;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < warpRadius) {
            const force = (1 - dist / warpRadius) ** 2 * warpStrength;
            const nx = dist === 0 ? 0 : dx / dist;
            const ny = dist === 0 ? 0 : dy / dist;
            targetX += nx * force;
            targetY += ny * force;
          }

          // click ripples — a travelling ring that pushes points outward
          for (const ripple of ripplesRef.current) {
            const age = now - ripple.start;
            const waveRadius = (age / rippleDuration) * rippleMaxRadius;
            const rdx = p.bx - ripple.x;
            const rdy = p.by - ripple.y;
            const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
            const diff = Math.abs(rdist - waveRadius);
            if (diff < rippleWidth) {
              const fade = 1 - age / rippleDuration;
              const localForce = (1 - diff / rippleWidth) * rippleStrength * fade;
              const nx = rdist === 0 ? 0 : rdx / rdist;
              const ny = rdist === 0 ? 0 : rdy / rdist;
              targetX += nx * localForce;
              targetY += ny * localForce;
            }
          }

          // ease toward the target for a smooth, elastic feel
          p.x += (targetX - p.x) * 0.15;
          p.y += (targetY - p.y) * 0.15;
        }
      }

      // --- draw connecting lines (tinted blue + brighter near the cursor) ---
      ctx.lineWidth = 1;
      for (let r = 0; r < points.length; r++) {
        for (let c = 0; c < points[r].length; c++) {
          const p = points[r][c];
          if (c < points[r].length - 1) {
            const pRight = points[r][c + 1];
            const mx = (p.x + pRight.x) / 2;
            const my = (p.y + pRight.y) / 2;
            ctx.strokeStyle = colorFor(proximity(mx, my, mouse, warpRadius));
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pRight.x, pRight.y);
            ctx.stroke();
          }
          if (r < points.length - 1) {
            const pDown = points[r + 1][c];
            const mx = (p.x + pDown.x) / 2;
            const my = (p.y + pDown.y) / 2;
            ctx.strokeStyle = colorFor(proximity(mx, my, mouse, warpRadius));
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pDown.x, pDown.y);
            ctx.stroke();
          }
        }
      }

      // --- draw dots (bigger at rest, even bigger + blue near cursor) ---
      for (let r = 0; r < points.length; r++) {
        for (let c = 0; c < points[r].length; c++) {
          const p = points[r][c];
          const t = proximity(p.bx, p.by, mouse, warpRadius);
          ctx.fillStyle = colorFor(t);
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.2 + t * 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("click", handleClick);
    };
  }, [spacing, warpRadius, warpStrength]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-0 h-full w-full pointer-events-none ${className}`}
    />
  );
}