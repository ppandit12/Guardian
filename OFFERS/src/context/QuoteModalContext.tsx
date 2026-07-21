import { createContext, useContext, useState, type ReactNode } from "react";
import { GetQuoteModal } from "@/components/site/GetQuoteModal";

interface QuoteModalContextType {
  openQuoteModal: (service?: string) => void;
  closeQuoteModal: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextType | undefined>(undefined);

export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Facilities Management");

  const openQuoteModal = (service = "Facilities Management") => {
    setSelectedService(service);
    setIsOpen(true);
  };

  const closeQuoteModal = () => {
    setIsOpen(false);
  };

  return (
    <QuoteModalContext.Provider value={{ openQuoteModal, closeQuoteModal }}>
      {children}
      <GetQuoteModal
        isOpen={isOpen}
        onClose={closeQuoteModal}
        defaultService={selectedService}
      />
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  const context = useContext(QuoteModalContext);
  if (!context) {
    throw new Error("useQuoteModal must be used within a QuoteModalProvider");
  }
  return context;
}
