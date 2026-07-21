import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CustomCursor } from "@/components/site/CustomCursor";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { PageLoader } from "@/components/site/PageLoader";
import { QuoteModalProvider } from "@/context/QuoteModalContext";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Testimonials from "@/pages/Testimonials";
import Accreditations from "@/pages/Accreditations";
import EmployerResources from "@/pages/EmployerResources";
import Careers from "@/pages/Careers";
import Contact from "@/pages/Contact";
import AdminDashboard from "@/pages/AdminDashboard";
import NotFound from "@/pages/NotFound";

const LOADER_DISPLAY_MS = 1200;

export default function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadingOut(true);
      setTimeout(() => setShowLoader(false), 500);
    }, LOADER_DISPLAY_MS);

    return () => clearTimeout(fadeTimer);
  }, []);

  return (
    <BrowserRouter>
      <QuoteModalProvider>
        {showLoader && <PageLoader fadingOut={fadingOut} />}
        <ScrollToTop />
        <CustomCursor />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/accreditations" element={<Accreditations />} />
          <Route path="/employer-resources" element={<EmployerResources />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </QuoteModalProvider>
    </BrowserRouter>
  );
}
