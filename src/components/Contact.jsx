import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setStatus("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(
        "https://formspree.io/f/mbgllrok",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            message: form.message,
          }),
        }
      );

      if (response.ok) {
        setForm({
          name: "",
          email: "",
          message: "",
        });

        setStatus("Message sent successfully!");
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong. Please try again.");
    }

    setTimeout(() => {
      setStatus("");
    }, 3000);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full overflow-hidden bg-[#11131d] text-white"
    >
      <div className="flex min-h-screen w-full">

        {/* LEFT */}

        <div className="relative min-h-screen w-1/2 overflow-hidden bg-[#0e1017]">

          <div className="pointer-events-none absolute -left-[360px] top-[155px] h-[1200px] w-[900px] rotate-[-45deg] bg-[#151a2a] opacity-[0.42]" />

          <div className="pointer-events-none absolute -left-[470px] top-[410px] h-[1250px] w-[980px] rotate-[-45deg] bg-[#171c2d] opacity-[0.38]" />

          <div className="pointer-events-none absolute -left-[560px] top-[670px] h-[1200px] w-[980px] rotate-[-45deg] bg-[#181d2e] opacity-[0.32]" />

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_48%_45%,transparent_20%,rgba(5,7,12,0.28)_100%)]" />

          <div className="absolute left-[8.7vw] top-1/2 z-10 -translate-y-1/2">

            <h1 className="whitespace-nowrap font-['Instrument_Sans',sans-serif] text-[clamp(3.5rem,5vw,5.8rem)] font-semibold leading-[0.98] tracking-[-0.02em] text-[#f5f5f7]">
              Conversation
              <br />
              comes first
            </h1>

            <p className="mt-[43px] font-['Instrument_Sans',sans-serif] text-[clamp(1.15rem,1.5vw,1.55rem)] font-normal leading-[1.4] tracking-[-0.025em] text-[#b7b9c8]">
              That's often where good things begin.
            </p>

          </div>
        </div>

        {/* RIGHT */}

        <div className="relative min-h-screen w-1/2 bg-[#191a26]">

          <div className="absolute left-1/2 top-[8.5vh] w-[59.6%] max-w-[590px] -translate-x-1/2">

            <h2 className="text-center font-['Instrument_Sans',sans-serif] text-[25px] font-semibold leading-none text-[#f2f2f4]">
              Open to opportunities
            </h2>

            <form onSubmit={handleSubmit} className="mt-[40px]">

              {/* NAME */}

              <div className="mb-[15px]">

                <label className="mb-[8px] block font-['Instrument_Sans',sans-serif] text-[17px] text-[#b7b8c4]">
                  Name
                </label>

                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="How should I call you?"
                  className="box-border w-full rounded-[17px] border border-[#30313c] bg-[#22232e] p-3 px-[20px] font-['Instrument_Sans',sans-serif] text-[15px] text-[#eeeeef] outline-none placeholder:text-[#70717b]"
                />

              </div>

              {/* EMAIL */}

              <div className="mb-[15px]">

                <label className="mb-[8px] block font-['Instrument_Sans',sans-serif] text-[17px] text-[#b7b8c4]">
                  Email
                </label>

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Where can I reach you?"
                  className="box-border w-full rounded-[17px] border border-[#30313c] bg-[#22232e] p-3 px-[20px] font-['Instrument_Sans',sans-serif] text-[16px] text-[#eeeeef] outline-none placeholder:text-[#70717b]"
                />

              </div>

              {/* MESSAGE */}

              <div>

                <label className="mb-[8px] block font-['Instrument_Sans',sans-serif] text-[17px] text-[#b7b8c4]">
                  Message
                </label>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Anything you'd like to discuss?"
                  className="box-border h-[150px] w-full resize-none rounded-[17px] border border-[#30313c] bg-[#22232e] px-[20px] py-[20px] font-['Instrument_Sans',sans-serif] text-[16px] leading-[1.4] text-[#eeeeef] outline-none placeholder:text-[#70717b]"
                />

              </div>

              {/* SEND */}

              <div className="mt-[15px] flex justify-center">

                <button
                  type="submit"
                  className="rounded-[7px] border border-[#37373a] bg-[#10131E] px-7 py-3 font-['Instrument_Sans',sans-serif] text-[16px] font-semibold text-[#575759] transition-all duration-200 hover:border-[#555866] hover:text-[#eeeeef] active:scale-95"
                >
                  Send
                </button>

              </div>

            </form>

          </div>
        </div>
      </div>

      {/* POPUP */}

      {status && (
        <div
          className={`
            fixed
            left-1/2
            top-[30px]
            z-[9999]
            -translate-x-1/2
            rounded-full
            px-[24px]
            py-[12px]
            font-['Instrument_Sans',sans-serif]
            text-[14px]
            font-medium
            shadow-2xl
            ${
              status === "Message sent successfully!"
                ? "bg-[#9BE65A] text-[#11131d]"
                : "bg-[#f7f7f5] text-[#22232e]"
            }
          `}
        >
          {status}
        </div>
      )}
    </section>
  );
}