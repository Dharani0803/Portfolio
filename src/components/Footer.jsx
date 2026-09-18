import { useState } from "react";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const email = "dharani5126@gmail.com";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <section
      id="footer"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#2E2C3F] text-white"
    >
      <div className="flex w-full flex-col items-center px-6 pb-[100px] pt-[30px]">

        {/* MAIN HEADING */}
        <h2
          className="
            max-w-[1250px]
            text-center
            text-[clamp(3.8rem,5vw,5rem)]
            font-semibold
            leading-[0.98]
            tracking-[-0.065em]
            text-[#f7f3e8]
          "
        >
          Let's connect and build something <br/> amazing !
        </h2>

        {/* CURVY UNDERLINE */}
        <div className="mt-[20px] w-[280px] sm:w-[360px] md:w-[430px]">
          <svg
            viewBox="0 0 430 42"
            className="h-auto w-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 22C35 7 61 34 91 20C121 6 147 34 177 20C207 6 235 34 265 20C295 6 322 34 350 20C377 8 402 24 426 17"
              stroke="#9BE65A"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* EMAIL */}
        <div className="mt-[40px] flex items-center gap-[14px]">

          <div
            className="
              flex
              h-[60px]
              min-w-[200px]
              items-center
              justify-between
              rounded-full
              bg-[#f7f7f5]
              px-[25px]
              text-[#252525]
              shadow-sm
              sm:min-w-[240px]
              md:min-w-[280px]
            "
          >
            <span
              className="
                text-[17px]
                font-semibold
                sm:text-[17px]
              "
            >
              {email}
            </span>

            {/* STATUS DOT */}
            <span className="ml-4 h-[10px] w-[10px] shrink-0 rounded-full bg-[#42a5ff]" />
          </div>

          {/* COPY BUTTON */}
          <button
            type="button"
            onClick={copyEmail}
            aria-label="Copy email"
            className="
              flex
              h-[60px]
              w-[60px]
              items-center
              justify-center
              rounded-full
              bg-[#2a2e29]
              text-white/90
              transition-all
              duration-200
              hover:bg-[#343934]
              active:scale-95
            "
          >
            {copied ? (
              <svg
                viewBox="0 0 24 24"
                className="h-[23px] w-[23px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  d="M5 12.5l4.2 4.2L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-[23px] w-[23px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <rect
                  x="8"
                  y="8"
                  width="12"
                  height="12"
                  rx="1.5"
                />

                <path
                  d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"
                />
              </svg>
            )}
          </button>
        </div>

        {/* SOCIAL ICONS */}
        <div className="mt-[30px] flex items-center gap-[16px]">

          {/* GITHUB */}
          <a
            href="https://github.com/Dharani0803"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="
              flex
              h-[55px]
              w-[55px]
              items-center
              justify-center
              rounded-full
              bg-[#f7f7f5]
              text-[#252525]
              transition-transform
              duration-200
              hover:scale-105
            "
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[30px] w-[30px] fill-current"
            >
              <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.24c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.23 1.84 1.23 1.07 1.84 2.8 1.31 3.48 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
            </svg>
          </a>

          {/* LINKEDIN */}
          <a
            href="https://www.linkedin.com/in/dharani-k83/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="
              flex
              h-[55px]
              w-[55px]
              items-center
              justify-center
              rounded-full
              bg-[#f7f7f5]
              text-[#252525]
              transition-transform
              duration-200
              hover:scale-105
            "
          >
            <span className="text-[25px] font-bold leading-none">
              in
            </span>
          </a>

          {/* WHATSAPP */}
          <a
            href="https://wa.me/918870489169"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="
              flex
              h-[55px]
              w-[55px]
              items-center
              justify-center
              rounded-full
              bg-[#f7f7f5]
              text-[#252525]
              transition-transform
              duration-200
              hover:scale-105
            "
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[30px] w-[30px] fill-current"
            >
              <path d="M12 2a9.9 9.9 0 0 0-8.5 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3.1.8.8-3-.2-.3A8 8 0 1 1 12 20Zm4.4-5.9c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1-.1.2-.5.7-.6.8-.1.1-.2.2-.4.1-.2-.1-.8-.3-1.5-.9-.5-.5-.9-1-1-1.2-.1-.2 0-.3.1-.4l.3-.3.2-.4c.1-.1 0-.3 0-.4-.1-.1-.5-1.2-.7-1.6-.2-.4-.4-.3-.5-.3h-.4c-.1 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.1 1.5 2.3 3.7 3.2.5.2.9.3 1.2.4.5.1 1 .1 1.4.1.4-.1 1.2-.5 1.3-1 .2-.5.2-.9.1-1-.1-.1-.2-.1-.4-.2Z" />
            </svg>
          </a>

          {/* EMAIL */}
          <a
            href={`mailto:${email}`}
            aria-label="Email"
            className="
              flex
              h-[55px]
              w-[55px]
              items-center
              justify-center
              rounded-full
              bg-[#f7f7f5]
              text-[#252525]
              transition-transform
              duration-200
              hover:scale-105
            "
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[30px] w-[30px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
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

        </div>
      </div>



        {/* BOTTOM FOOTER */}
        <div className="absolute bottom-0 left-0 w-full px-6">
          {/* LINE */}
          <div className="h-px w-full bg-white/15" />

          {/* BOTTOM CONTENT */}
          <div className="grid grid-cols-3 items-center">

            {/* LOGO */}
            <div className="flex items-center">
              <img
              src="/logo.png"
              alt="DK Dharani"
              className="block h-auto w-[90px] object-contain opacity-80 transition-opacity duration-200 hover:opacity-100"
            />
            </div>

            {/* NAVIGATION */}
            <nav className="flex items-center justify-center gap-[28px] text-[14px] font-medium text-white/60">
              <a href="#home" className="transition-colors hover:text-white">
                Home
              </a>
              <a href="#about" className="transition-colors hover:text-white">
                About
              </a>
              <a href="#skills" className="transition-colors hover:text-white">
                Skills
              </a>
              <a href="#projects" className="transition-colors hover:text-white">
                Projects
              </a>
              <a

                href="#contact"
                className="transition-colors hover:text-white"
                onClick={(e) => {
                  e.preventDefault();

                  const contactSection = document.querySelector(
                    '[data-scroll-section="7"]'
                  );

                  if (contactSection) {
                    window.scrollTo({
                      top: contactSection.offsetTop,
                      behavior: "auto", // instant — no visible manual scroll
                    });
                  }
                }}
              >
                Contact
              </a>
            </nav>

            {/* COPYRIGHT */}<div>
            <div className="flex justify-end text-[10px] text-white/45">
              © ALL RIGHTS RESERVED.
            </div>
            <div className="flex justify-end text-[10px] text-white/45">
              2026 DHARANI K
            </div></div>

          </div>
        </div>


     
    </section>
  );
}