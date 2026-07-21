import { Link, NavLink } from "react-router-dom";
import { Home, Info, Shield, MessageSquare, Award, Mail, X, BookOpen, Briefcase } from "lucide-react";
import { useState } from "react";
import { GuardianWorksLogo } from "./GuardianWorksLogo";
import { GalaxyButton } from "./GalaxyButton";
import { useQuoteModal } from "@/context/QuoteModalContext";

const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/about", label: "About Us", icon: Info },
  { to: "/services", label: "Services", icon: Shield, sub: [
    { to: "/services#facilities-management", label: "Facilities Management" },
    { to: "/services#retail-security", label: "Retail Security" },
    { to: "/services#concierge-security", label: "Concierge Security" },
    { to: "/services#event-security", label: "Event Security" },
    { to: "/services#fire-marshal-services", label: "Fire Marshal Services" },
    { to: "/services#temporary-recruitment", label: "Temporary Recruitment" },
    { to: "/services#commercial-cleaning", label: "Commercial Cleaning" },
  ]},
  { to: "/#industries", label: "Industries", icon: Award },
  { to: "/#why-choose-us", label: "Why Choose Us", icon: Award },
  { to: "/careers", label: "Careers", icon: Briefcase },
  { to: "/contact", label: "Contact", icon: Mail },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { openQuoteModal } = useQuoteModal();

  return (
    <>
      <div className="navbar-container">
        <header className="navbar">
          {/* Logo brand */}
          <Link to="/" className="navbar-brand" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}>
            <GuardianWorksLogo variant="full-light" height={42} />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center">
            <ul className="navbar-nav">
              {NAV.map((n) => {
                if (n.sub) {
                  return (
                    <li key={n.label} className="nav-item relative group">
                      <NavLink
                        to={n.to}
                        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
                        className={({ isActive }) =>
                          `nav-link ${isActive ? "active" : ""} flex items-center gap-1`
                        }
                      >
                        <n.icon className="nav-icon" />
                        {n.label}
                      </NavLink>
                      {/* Submenu Dropdown */}
                      <div className="absolute left-0 top-full pt-2 hidden group-hover:block w-60 z-50">
                        <div className="bg-white border border-[#0B3B73]/20 shadow-2xl rounded-xl py-2 backdrop-blur-xl">
                          {n.sub.map((s) => (
                            <a
                              key={s.label}
                              href={s.to}
                              className="block px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#071F3D] hover:bg-[#0B3B73] hover:text-white transition-colors rounded-md mx-1"
                            >
                              {s.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </li>
                  );
                }
                return (
                  <li key={n.label} className="nav-item">
                    {n.to.startsWith("/#") ? (
                      <a href={n.to} className="nav-link">
                        <n.icon className="nav-icon" />
                        {n.label}
                      </a>
                    ) : (
                      <NavLink
                        to={n.to}
                        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
                        className={({ isActive }) =>
                          `nav-link ${isActive ? "active" : ""}`
                        }
                        end={n.to === "/"}
                      >
                        <n.icon className="nav-icon" />
                        {n.label}
                      </NavLink>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* CTA Quote Button */}
          <div className="hidden lg:flex items-center">
            <GalaxyButton onClick={() => openQuoteModal()}>
              Get a quote
            </GalaxyButton>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className={`mobile-toggle ${open ? "active" : ""}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </header>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${open ? "active" : ""}`}
        onClick={() => setOpen(false)}
      />

      {/* Mobile Menu Slide-down Overlay */}
      <div className={`mobile-menu ${open ? "active" : ""}`}>
        <div className="mobile-menu-header">
          <Link
            to="/"
            className="mobile-menu-brand"
            onClick={() => {
              setOpen(false);
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
            }}
          >
            <div className="bg-white border border-[#0B3B73]/20 p-1.5 px-3 rounded-lg inline-flex items-center shadow-md">
              <GuardianWorksLogo variant="full-light" height={36} />
            </div>
          </Link>
          <button className="mobile-menu-close" onClick={() => setOpen(false)} aria-label="Close menu">
            <X className="w-6 h-6" />
          </button>
        </div>

        <ul className="mobile-menu-nav">
          {NAV.map((n) => {
            if (n.sub) {
              return (
                <li key={n.label} className="mobile-menu-item flex flex-col items-start w-full">
                  <div className="flex items-center w-full justify-between pr-4">
                    <NavLink
                      to={n.to}
                      onClick={() => {
                        setOpen(false);
                        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                      }}
                      className={({ isActive }) =>
                        `mobile-menu-link ${isActive ? "active" : ""}`
                      }
                    >
                      <n.icon className="mobile-menu-icon" />
                      {n.label}
                    </NavLink>
                  </div>
                  <div className="pl-6 border-l border-[#1E6EB6]/40 flex flex-col gap-2 mt-1 mb-2 w-full">
                    {n.sub.map((s) => (
                      <a
                        key={s.label}
                        href={s.to}
                        onClick={() => setOpen(false)}
                        className="block py-1.5 text-[10px] font-display uppercase tracking-wider text-slate-300 hover:text-primary-light transition-colors"
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </li>
              );
            }
            return (
              <li key={n.label} className="mobile-menu-item">
                {n.to.startsWith("/#") ? (
                  <a
                    href={n.to}
                    onClick={() => setOpen(false)}
                    className="mobile-menu-link"
                  >
                    <n.icon className="mobile-menu-icon" />
                    {n.label}
                  </a>
                ) : (
                  <NavLink
                    to={n.to}
                    onClick={() => {
                      setOpen(false);
                      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                    }}
                    className={({ isActive }) =>
                      `mobile-menu-link ${isActive ? "active" : ""}`
                    }
                    end={n.to === "/"}
                  >
                    <n.icon className="mobile-menu-icon" />
                    {n.label}
                  </NavLink>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mobile-cta flex justify-center">
          <GalaxyButton
            onClick={() => {
              setOpen(false);
              openQuoteModal();
            }}
          >
            Get a quote
          </GalaxyButton>
        </div>
      </div>
    </>
  );
}
