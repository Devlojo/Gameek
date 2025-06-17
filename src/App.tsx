/* Components */
import Header from "@/components/layout/Header";
import Home from "@/pages/Home";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { BurgerMenu } from "./components/ui/BurgerMenu";
import { SignInModal } from "@/components/ui/SignInModal";

const App = (): JSX.Element => {
  const [activeBurgerMenu, setActiveBurgerMenu] = useState(false);
  const [openSignInModal, setOpenSignInModal] = useState(false);

  const handleActiveBurgerMenu = () => {
    setActiveBurgerMenu((prev) => !prev);
  };

  const handleSignInModal = () => {
    setOpenSignInModal((prev) => !prev);
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
        <div className="mx-auto flex max-w-5xl flex-col gap-4">
          <Header
            activeBurgerMenu={activeBurgerMenu}
            handleActiveBurgerMenu={handleActiveBurgerMenu}
            handleSignInModal={handleSignInModal}
          />
          {activeBurgerMenu && (
            <BurgerMenu handleActiveBurgerMenu={handleActiveBurgerMenu} />
          )}
          {openSignInModal && <SignInModal />}
          <Home />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;
