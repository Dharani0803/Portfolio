import { useState, useEffect } from "react";
import IntroCover from "./components/introCover";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Journey from "./components/Journey";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./index.css";
import { NetworkGlobe } from "./components/ui/network-globe";

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    if (!introFinished) return;

    const sections = document.querySelectorAll("[data-scroll-section]");

    const handleScroll = () => {
      const scrollPosition =
        window.scrollY + window.innerHeight * 0.5;

      let currentSection = 0;

      // Home always active at top
      if (window.scrollY < 50) {
        currentSection = 0;
      } else {
        sections.forEach((section) => {
          const top = section.offsetTop;
          const bottom = top + section.offsetHeight;

          if (
            scrollPosition >= top &&
            scrollPosition < bottom
          ) {
            currentSection = Number(
              section.dataset.scrollSection
            );
          }
        });
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [introFinished]);

  return (
    <>
      <style>{`
        html,
        body {
          overflow-x: hidden;
        }

        ::-webkit-scrollbar:horizontal {
          display: none;
        }
      `}</style>

      <main className="portfolio bg-black">

        {/* JOURNEY GLOBE — FIXED TO SCREEN */}
        <div
          className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-300 ${
            activeSection === 3 ||
            activeSection === 4 ||
            activeSection === 5
              ? "opacity-100"
              : "opacity-0"
          }`}
        >
          <NetworkGlobe />
        </div>

        {/* COMMON SCROLL LINES
            Hidden ONLY on Footer */}
        {activeSection !== 8 && (
          <div className="fixed left-[30px] top-[50%] z-[999] hidden -translate-y-1/2 md:block">
            <div className="flex flex-col gap-[17px]">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
                <span
                  key={index}
                  className={`scroll-line ${
                    activeSection === index
                      ? "scroll-active"
                      : ""
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {!introFinished ? (
          <IntroCover
            onFinished={() => setIntroFinished(true)}
          />
        ) : (
          <>
            {/* HOME */}
            <div data-scroll-section="0">
              <Home />
            </div>

            {/* ABOUT */}
            <div data-scroll-section="1">
              <About />
            </div>

            {/* SKILLS */}
            <div data-scroll-section="2">
              <Skills />
            </div>

            {/* JOURNEY */}
            <div data-scroll-section="3">
              <Journey />
            </div>

            {/* PROJECTS */}
            <div data-scroll-section="4">
              <Projects />
            </div>

            {/* SERVICES */}
            <div data-scroll-section="5">
              <Services />
            </div>

            {/* CERTIFICATIONS */}
            <div
              data-scroll-section="6"
              className="relative z-20"
            >
              <Certifications />
            </div>

            {/* CONTACT */}
<div data-scroll-section="7" className="relative z-10">
  <div className="h-screen w-full bg-[#11131d]" />

  <div
    className={`fixed inset-0 z-50 h-screen w-full transition-all duration-700 ease-out ${
      activeSection === 7
        ? "opacity-100 translate-y-0 pointer-events-auto"
        : "opacity-0 translate-y-10 pointer-events-none"
    }`}
  >
    <Contact />
  </div>
</div>

            {/* FOOTER
                Section 8 = Footer */}
            <div data-scroll-section="8">
              <Footer />
            </div>
          </>
        )}
      </main>

      {/* SOCIAL ICONS
          Hidden ONLY on Footer */}
      {activeSection !== 8 && (
        <div className="fixed bottom-[40px] right-[15px] z-40 flex flex-col gap-[15px]">

          {/* WHATSAPP */}
          <a
            href="https://wa.me/918870489169"
            target="_blank"
            rel="noopener noreferrer"
            className="home-social social-button"
            aria-label="WhatsApp"
            onClick={(e) => e.stopPropagation()}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[24px] w-[24px] fill-white"
            >
              <path d="M12 2a9.9 9.9 0 0 0-8.5 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3.1.8.8-3-.2-.3A8 8 0 1 1 12 20Zm4.4-5.9c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1-.1.2-.5.7-.6.8-.1.1-.2.2-.4.1-.2-.1-.8-.3-1.5-.9-.5-.5-.9-1-1-1.2-.1-.2 0-.3.1-.4l.3-.3.2-.4c.1-.1 0-.3 0-.4-.1-.1-.5-1.2-.7-1.6-.2-.4-.4-.3-.5-.3h-.4c-.1 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.1 1.5 2.3 3.7 3.2.5.2.9.3 1.2.4.5.1 1.2.5 1.3 1 .2-.5.2-.9.1-1-.1-.1-.2-.1-.4-.2Z" />
            </svg>
          </a>

          {/* EMAIL */}
          <a
            href="mailto:dharani5126@gmail.com"
            className="home-social social-button"
            aria-label="Email"
            onClick={(e) => e.stopPropagation()}
          >
            <svg
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="1.5"
              />
              <path d="M3 7l9 6 9-6" />
            </svg>
          </a>

          {/* LINKEDIN */}
          <a
            href="https://www.linkedin.com/in/dharani-k83/"
            target="_blank"
            rel="noopener noreferrer"
            className="home-social social-button"
            aria-label="LinkedIn"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="linkedin-icon">in</span>
          </a>

          {/* GITHUB */}
          <a
            href="https://github.com/Dharani0803"
            target="_blank"
            rel="noopener noreferrer"
            className="home-social social-button"
            aria-label="GitHub"
            onClick={(e) => e.stopPropagation()}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[24px] w-[24px] fill-white"
            >
              <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.24c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.23 1.84 1.23 1.07 1.84 2.8 1.31 3.48 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
            </svg>
          </a>
        </div>
      )}
    </>
  );
}