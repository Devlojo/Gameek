/* Components */
import Header from "@/components/layout/Header";
import Home from "@/pages/Home";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { BurgerMenu } from "./components/ui/BurgerMenu";

const App = (): JSX.Element => {
  const [activeBurgerMenu, setActiveBurgerMenu] = useState(false);

  const handleActiveBurgerMenu = () => {
    setActiveBurgerMenu((prev) => !prev);
  };

  // Si le menu burger est activé, alors le scroll est désactivé
  if (activeBurgerMenu) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
  return (
    <>
      <div className="h-full bg-global">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <Header
            activeBurgerMenu={activeBurgerMenu}
            handleActiveBurgerMenu={handleActiveBurgerMenu}
          />
          {activeBurgerMenu && (
            <BurgerMenu handleActiveBurgerMenu={handleActiveBurgerMenu} />
          )}

          <Home />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;
