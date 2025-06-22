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
    <button className="fixed bottom-10 right-10 z-10 rounded-full bg-mainYellow p-3 text-black hover:cursor-pointer">
      <RxDoubleArrowUp
        className="size-6"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
    </button>
  );
};
