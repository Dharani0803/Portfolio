import { useEffect, useRef } from "react";

// Evenly distributes points on a sphere surface (Fibonacci sphere).
function generateSpherePoints(count) {
  const points = [];
  const offset = 2 / count;
  const increment = Math.PI * (3 - Math.sqrt(5)); // golden angle

  for (let i = 0; i < count; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = i * increment;
    points.push({ x: Math.cos(phi) * r, y, z: Math.sin(phi) * r });
  }
  return points;
}

// Connects each point to its nearest few neighbours, once, at setup.
function buildEdges(points, neighbours = 3) {
  const edges = [];
  const seen = new Set();

  points.forEach((p, i) => {
    const nearest = points
      .map((q, j) => ({
        j,
        d: (p.x - q.x) ** 2 + (p.y - q.y) ** 2 + (p.z - q.z) ** 2,
      }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, neighbours);

    nearest.forEach(({ j }) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([i, j]);
      }
    });
  });

  return edges;
}

/**
 * Rotating wireframe globe, drawn on <canvas>.
 * Drop it inside any relatively-positioned, dark-background section:
 *
 *   <section className="relative overflow-hidden bg-black min-h-screen">
 *     <NetworkGlobe />
 *     ...your page content (give it position: relative + a higher z-index)
 *   </section>
 */
export function NetworkGlobe({
  pointCount = 80, // fewer points = less clutter
  radius = 300, // smaller sphere
  originX = 0.72, // 0 = left edge, 1 = right edge — where the globe's center sits
  originY = 0.35,
  className = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const points = generateSpherePoints(pointCount);
    const edges = buildEdges(points, 3);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const tiltX = 0.3; // fixed slight tilt, like the reference image
    const focal = 600;

    const draw = (time) => {
      const angleY = time * 0.00006; // slow constant rotation
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(tiltX);
      const sinX = Math.sin(tiltX);

      const projected = points.map((p) => {
        const x = p.x * cosY - p.z * sinY;
        const zRot = p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - zRot * sinX;
        const z2 = p.y * sinX + zRot * cosX;

        const scale = focal / (focal + z2 * radius);
        return {
          sx: x * radius * scale + width * originX,
          sy: y2 * radius * scale + height * originY,
          scale,
          z: z2,
        };
      });

      ctx.clearRect(0, 0, width, height);

      edges.forEach(([a, b]) => {
        const pa = projected[a];
        const pb = projected[b];
        const depth = (pa.z + pb.z) / 2;
        const alpha = Math.max(0, 0.1 - depth * 0.06);
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pa.sx, pa.sy);
        ctx.lineTo(pb.sx, pb.sy);
        ctx.stroke();
      });

      projected.forEach((p) => {
        const size = Math.max(0.6, 1.6 * p.scale); // smaller dots
        const alpha = Math.min(0.6, Math.max(0.08, p.scale - 0.35)); // dimmer overall

        // subtle glow only, not a big bright orb
        const glow = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, size * 1.6);
        glow.addColorStop(0, `rgba(255,255,255,${alpha * 0.25})`);
        glow.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, size * 1.6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [pointCount, radius, originX, originY]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-0 h-full w-full pointer-events-none ${className}`}
    />
  );
}