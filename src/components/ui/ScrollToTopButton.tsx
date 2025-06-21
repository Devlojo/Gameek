import { useEffect, useState } from "react";
import { RxDoubleArrowUp } from "react-icons/rx";

export const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showButton) return null;

  return (
    <button className="fixed bottom-10 right-10 z-10 animate-bounce rounded-full border-2 border-mainYellow p-2 text-mainYellow hover:cursor-pointer">
      <RxDoubleArrowUp
        className="size-8"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
    </button>
  );
};
