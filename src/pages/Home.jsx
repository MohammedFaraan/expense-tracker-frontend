import { useEffect } from "react";
import heroImage from "../assets/hero-image1.svg";
import { LuWorkflow, LuSparkles } from "react-icons/lu";
import { PiShieldCheckeredFill } from "react-icons/pi";
import { Link } from "react-router-dom";

const iconMap = {
  LuWorkflow,
  LuSparkles,
  PiShieldCheckeredFill,
};

const features = [
  {
    title: "Automated Tracking",
    desc: "Seamlessly sync your accounts and monitor every transaction with editorial precision.",
    icon: "LuWorkflow",
  },
  {
    title: "Smart Insights",
    desc: "Move beyond spreadsheets and receive curated weekly narratives about your spending habits.",
    icon: "LuSparkles",
  },
  {
    title: "Secure Budgeting",
    desc: "Bank-grade security keeps your data safe while helping you plan with confidence.",
    icon: "PiShieldCheckeredFill",
  },
];

const testimonials = [
  {
    quote:
      "Lumina does not just show my balance. It gives me peace of mind. The interface is stunning and the insights are genuinely helpful.",
    name: "Julianne Smith",
    role: "Creative Director",
  },
  {
    quote:
      "Finally, a finance app that feels like it belongs in this century. Minimal, fast, and secure.",
    name: "Marcus Chen",
    role: "Software Engineer",
  },
];

function Home() {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 0);
      }
    }
  }, []);

  return (
    <div className="space-y-24 pt-16">
      <section
        id="home"
        className="scroll-mt-28 bg-base-200/70 px-6 py-16 lg:px-12"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div className="space-y-6 text-left">
            <h1 className="text-4xl font-black leading-tight text-base-content lg:text-6xl">
              Master Your{" "}
              <span className="text-secondary">Financial Story</span>
            </h1>
            <p className="max-w-xl text-base-content/70 lg:text-lg">
              Elevate your wealth management with pristine ledger design.
              Minimal expense tracking for clarity, beauty, and confidence.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/signup" className="btn btn-secondary text-white">
                Get Started
              </Link>
              <a href="#dashboard" className="btn btn-soft">
                View Demo
              </a>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[560px] [perspective:1400px]">
            <div className="relative transform-gpu">
              <div className="absolute -inset-2 rounded-[2rem] bg-black/10 blur-xl" />
              <div className="relative rounded-[1.8rem] bg-base-100 p-3 ring-1 ring-black/5 shadow-[0_24px_60px_rgba(8,12,26,0.24)] transition-transform duration-500 md:[transform:rotate(1.2deg)] lg:[transform:rotate(2deg)_skewY(0.3deg)]">
                <div className="relative overflow-hidden rounded-[1.35rem] bg-[#031220]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#123451_0%,#081826_45%,#020914_100%)]" />
                  <img
                    src={heroImage}
                    alt="Dashboard preview"
                    className="relative z-10 w-full h-auto object-cover transform-gpu lg:[transform:rotate(0.6deg)_scale(1.01)] [filter:contrast(1.04)_saturate(1.06)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="scroll-mt-28 px-6 lg:px-12">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
            The Experience
          </p>
          <h2 className="mt-2 text-4xl font-extrabold text-base-content">
            The Pristine Ledger
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded bg-secondary" />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map((item) => {
              const Icon = iconMap[item.icon];

              return (
                <article
                  key={item.title}
                  className="card bg-base-100 shadow-sm"
                >
                  <div className="card-body text-left">
                    {Icon && (
                      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                        <Icon size={20} />
                      </div>
                    )}
                    <h3 className="card-title text-xl">{item.title}</h3>
                    <p className="text-base-content/70">{item.desc}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="testimonials"
        className="scroll-mt-28 bg-base-200/70 px-6 py-16 lg:px-12"
      >
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <div className="space-y-4 text-left">
            <h2 className="text-4xl font-extrabold text-base-content">
              Trusted by those who value clarity.
            </h2>
            <p className="text-base-content/70">
              Join over 50,000 users who transformed their relationship with
              money using Lumina.
            </p>
            <p className="text-sm font-semibold text-base-content/60">
              4.9/5 Average Rating
            </p>
          </div>

          <div className="space-y-4">
            {testimonials.map((item) => (
              <article
                key={item.name}
                className="rounded-2xl bg-base-100 p-6 shadow-sm"
              >
                <p className="text-left text-base-content/80">{item.quote}</p>
                <div className="mt-4 text-left">
                  <p className="font-semibold text-base-content">{item.name}</p>
                  <p className="text-sm text-base-content/60">{item.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* <section id="pricing" className="scroll-mt-28 px-6 lg:px-12">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-4xl font-extrabold text-base-content">
            Simple, Honest Pricing
          </h2>
          <p className="mt-2 text-base-content/70">
            Choose the plan that fits your financial journey.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <article className="card border border-base-300 bg-base-100">
              <div className="card-body text-left">
                <h3 className="text-2xl font-bold">Free</h3>
                <p className="text-4xl font-black">
                  $0<span className="text-base font-normal">/mo</span>
                </p>
                <ul className="space-y-2 text-base-content/75">
                  <li>3 Connected Accounts</li>
                  <li>Basic Categorization</li>
                  <li>Monthly Reports</li>
                </ul>
                <button className="btn btn-outline btn-secondary mt-4">
                  Start for Free
                </button>
              </div>
            </article>

            <article className="card border-2 border-secondary bg-base-100 shadow-xl">
              <div className="card-body text-left">
                <div className="badge badge-secondary badge-outline">
                  Most Popular
                </div>
                <h3 className="text-2xl font-bold">Pro</h3>
                <p className="text-4xl font-black">
                  $12<span className="text-base font-normal">/mo</span>
                </p>
                <ul className="space-y-2 text-base-content/75">
                  <li>Unlimited Accounts</li>
                  <li>AI Smart Insights</li>
                  <li>Priority Support</li>
                  <li>Custom Categories</li>
                </ul>
                <button className="btn btn-secondary mt-4 text-white">
                  Upgrade to Pro
                </button>
              </div>
            </article>

            <article className="card border border-base-300 bg-base-100">
              <div className="card-body text-left">
                <h3 className="text-2xl font-bold">Enterprise</h3>
                <p className="text-4xl font-black">
                  $49<span className="text-base font-normal">/mo</span>
                </p>
                <ul className="space-y-2 text-base-content/75">
                  <li>All Pro Features</li>
                  <li>Family Sharing (5 users)</li>
                  <li>Advisor Access</li>
                </ul>
                <button className="btn btn-outline btn-secondary mt-4">
                  Contact Sales
                </button>
              </div>
            </article>
          </div>
        </div>
      </section> */}

      <section id="dashboard" className="scroll-mt-28 px-6 lg:px-12">
        <div className="mx-auto max-w-5xl rounded-3xl bg-neutral px-8 py-14 text-center text-neutral-content shadow-2xl">
          <h2 className="text-4xl font-black">
            Ready to rewrite your financial story?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-content/70">
            Start your finance journey today. Experience the future of finance.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/signup" className="btn btn-secondary text-white">
              Get Started Now
            </Link>
            <Link
              to="/login"
              className="btn btn-ghost border border-neutral-content/30 text-neutral-content"
            >
              Login
            </Link>
          </div>
        </div>
      </section>
      <footer className="flex items-center justify-between bg-base-200/70 px-6 py-6">
        <div className="space-y-1">
          <h2 className="font-bold text-xl">Finance Intel</h2>
          <p>
            &copy; {new Date().getFullYear()} Finance Intel. All rights reserved
          </p>
        </div>
        <div className="flex gap-5 align-middle ">
          <p>Privacy</p>
          <p>Terms & Service</p>
          <p>Cookie Policy</p>
          <p>Contact Us</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
