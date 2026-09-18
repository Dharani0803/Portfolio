import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const projectsRef = useRef(null);

  const projects = [
    {
      number: "01",
      title: "Pizza Palace",
      description:
        "A full-stack pizza ordering platform designed to provide a complete online ordering experience, from browsing pizzas and managing the cart to placing and tracking orders. The application includes authentication, user profiles, order history, offers, and an admin dashboard for managing pizzas and orders.",
      domains: [
        "Full-Stack Development",
        "Frontend Development",
        "Backend Development",
        "E-Commerce",
        
      ],
      technologies: [
        "React.js",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Render",
        "MongoDB Atlas",
        "JWT",
        "REST API",
        "Mongoose",
        "Vercel",
        "GitHub",
      ],
      image: "/project1.jpg",
      link: "https://pizza-palace-51u8.vercel.app/",
    },
    {
      number: "02",
      title: "WeatherVerse",
      description:
        "WeatherVerse is a modern weather dashboard that lets users search for real-time weather information by city. It presents temperature, weather conditions, feels-like temperature, weather alerts, and a 5-day forecast through interactive charts. The interface uses dynamic backgrounds and a glassmorphism-inspired visual style to create an engaging weather experience.",
      domains: [
        "Web Development",
        "API Integration",
        "Data Visualization",
        "Real-Time Data",
      ],
      technologies: [
        "React.js",
        "Vite",
        "Axios",
        "Recharts",
        "Tailwind CSS",
        "OpenWeatherMap API",
      ],
      image: "/project2.jpg",
      link: "https://weather-report-app-lac-six.vercel.app/",
    },
    {
      number: "03",
      title: "BulkMail",
      description:
        "BulkMail is a full-stack MERN application designed to simplify bulk email management. Users can upload Excel files containing email lists, send bulk emails, track email history, and manage email campaigns through a streamlined interface.",
      domains: [
        "Backend Development",
        "Email Automation",
        "API Integration",
        "File Processing",
      ],
      technologies: [
        "React.js",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Resend API",
        "Vercel",
        "Render",
      ],
      image: "/project3.webp",
      link: "https://bulkmail-app-ashen.vercel.app/",
    },
    {
      number: "04",
      title: "Favourite Student List",
      description:
        "A React-based Student Management application designed to manage student information through a clean and interactive interface. Users can view students, add or remove favourite students, use a registration flow with validation, navigate between pages, and manage application-wide state through Context API.",
      domains: [
        "Frontend Development",
        "React Development",
        "State Management",
        "Context API",
      ],
      technologies: [
        "React.js",
        "JavaScript",
        "Context API",
        "React Router DOM",
        "Tailwind CSS",
      ],
      image: "/project4.avif",
      link: "https://favourite-student-list-seven.vercel.app/",
    },
    {
      number: "05",
      title: "Nostra",
      description:
        "Nostra is a responsive e-commerce fashion website designed to create an interactive shopping experience. The project includes product presentation, search functionality, category filtering, size, color and price filters, signup with validation, and an interactive contact experience.",
      domains: [
        "Frontend Development",
        "E-Commerce",
        "UI/UX",
        "JavaScript Interactivity",
      ],
      technologies: ["HTML5", "Tailwind CSS", "JavaScript"],
      image: "/project5.png",
      link: "https://dharani0803.github.io/Nostra/",
    },
    {
      number: "06",
      title: "Greenden",
      description:
        "A responsive plant and gardening website designed to showcase products in a clean and engaging shopping experience. The project focuses on responsive layouts, product presentation, intuitive navigation, and a visually appealing interface for users interested in plants and gardening products.",
      domains: [
        "Frontend Development",
        "E-Commerce",
        "Product Showcase",
        "Interactive Web Interface",
      ],
      technologies: ["HTML5", "Tailwind CSS"],
      image: "/project6.png",
      link: "https://dharani0803.github.io/Greenden-Project/",
    },
  ];


  useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    const section = projectsRef.current;

    const heroText = section.querySelectorAll(
      ".projects-hero-text"
    );

    const projectCards = section.querySelectorAll(
      ".project-reveal"
    );

    // HERO initial state
    gsap.set(heroText, {
      opacity: 0,
      y: 30,
    });

    // PROJECT initial state
    gsap.set(projectCards, {
      opacity: 0,
      y: 35,
    });

    // Hero reveal
    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        once: true,
      },
    }).to(heroText, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
    });

    // Each project reveals separately
    projectCards.forEach((project) => {
      gsap.to(project, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: project,
          start: "top 82%",
          once: true,
        },
      });
    });
  }, projectsRef);

  return () => ctx.revert();
}, []);

  return (
    <section ref={projectsRef}
 id="projects" className="relative w-full bg-transparent text-white">

      {/* HERO */}
      <div className="relative h-[65vh] w-full overflow-hidden">

        {/* TOP LINE */}
        <div className="absolute left-1/2 top-[7%] flex w-[88%] -translate-x-1/2 items-center">
          <div className="h-px flex-1 bg-white/20" />

          <p className="projects-hero-text mx-7 whitespace-nowrap text-[15px] uppercase tracking-[0.22em] text-white/60">
            EACH PROJECT SHAPED HOW I WORK TODAY.
          </p>

          <div className="h-px flex-1 bg-white/20" />
        </div>

        {/* SELECTED PROJECTS */}
        <h1
          className="
          projects-hero-text
            absolute
            left-[7%]
            top-[20%]
            whitespace-nowrap
            text-[clamp(3.5rem,8vw,8.5rem)]
            font-black
            uppercase
            leading-none
            tracking-[-0.065em]
          "
        >
          SELECTED PROJECTS
        </h1>

        {/* SHOWCASE */}
        {/* SHOWCASE */}
<div className="projects-hero-text showcase-hover absolute left-[48%] top-[50%]">
  <div className="showcase-text cursor-pointer">
    SHOWCASE
  </div>
</div>
      </div>

      {/* PROJECTS */}
      <div className="relative w-full pb-20">

        {projects.map((project) => (
          <article
  key={project.number}
  className="project-reveal relative w-full overflow-hidden bg-transparent py-[40px]"
>
            {/* CONTENT */}
            <div className="relative mx-auto flex w-[86%] items-start gap-[7%]">

              {/* LEFT */}
              <div className="w-[50%] shrink-0">

                {/* NUMBER */}
                <p className="text-[14px] tracking-[0.2em] text-white/30">
                  {project.number}
                </p>

                {/* TITLE */}
                <h2 className="text-[30px] font-bold">
                  {project.title}
                </h2>

                {/* SMALL LINE */}
                <div
          className="
            mt-[10px]
            h-[2px]
            w-[125px]
            rounded-full
            bg-gradient-to-r
            from-[#d8663c]
            to-transparent
          "/>

                {/* DESCRIPTION */}
                <p
                  className="
                    mt-[25px]
                    max-w-[700px]
                    text-[clamp(1rem,1.35vw,1.35rem)]
                    leading-[1.65]
                    tracking-[-0.015em]
                    text-white/65
                  "
                >
                  {project.description}
                </p>

                {/* DOMAINS */}
                <div className="mt-[20px] grid grid-cols-2 gap-x-[45px] gap-y-[15px]">

                  {project.domains.map((domain, index) => (
                    <div
                      key={domain}
                      className="flex items-center gap-[10px]"
                    >
                      <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[10px] border border-[white/15] bg-white/[0.05]">
                        <span className="text-[14px] text-[#d8663c]">
                          {["✦", "▥", "▯", "♢"][index % 4]}
                        </span>
                      </div>

                      <span className="text-[17px] text-white/80">
                        {domain}
                      </span>
                    </div>
                  ))}

                </div>

                {/* TECHNOLOGIES */}
                <div className="mt-[25px] flex flex-wrap gap-[9px]">

                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="
                        rounded-[6px]
                        border
                        border-white/20
                        hover:border-white/60
                        px-[13px]
                        py-[7px]
                        text-[12px]
                        text-white/60
                      "
                    >
                      {technology}
                    </span>
                  ))}

                </div>
              </div>

              {/* RIGHT IMAGE */}
              <div className="w-[45%] shrink-0 pt-25">

                <div
                  className="
                    relative
                    aspect-[1.15/0.85]
                    overflow-hidden
                    rounded-[20px]
                    border
                    border-white/[0.12]
                    bg-[#080808]
                  "
                >

                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    className="
                      h-full
                      w-full
                      scale-[1.03]
                      object-cover
                      blur-[7px]
                    "
                  />

                  {/* DARK OVERLAY */}
                  <div className="absolute inset-0 bg-black/20" />

                  {/* VIEW LIVE */}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      flex
                      -translate-x-1/2
                      -translate-y-1/2
                      items-center
                      gap-[9px]
                      rounded-full
                      border
                      border-white/60
                      bg-black/45
                      px-[24px]
                      py-[11px]
                      text-[13px]
                      font-medium
                      text-white
                      backdrop-blur-md
                      transition-all
                      duration-300
                      hover:bg-white
                      hover:text-black
                    "
                  >
                    <span>↗</span>
                    <span>View Live</span>
                  </a>

                </div>
              </div>

            </div>
          </article>
        ))}

      </div>
    </section>
  );
}