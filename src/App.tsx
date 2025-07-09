/* Components */
import { Header } from "@/components/layout/Header";
import { Home } from "@/pages/Home";
import { Footer } from "@/components/layout/Footer";
import { GameGeneralMenu } from "@/pages/GameGeneralMenu";
import { GameReviewsMenu } from "@/pages/GameReviewsMenu";
import { GameImagesMenu } from "@/pages/GameImagesMenu";
import { GameVideosMenu } from "@/pages/GameVideosMenu";
import { useState } from "react";
import { BurgerMenu } from "./components/ui/BurgerMenu";
import { ScrollToTopButton } from "@/components/ui/ScrollToTopButton";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
      <Router>
        <div className="bg-global">
          <ScrollToTopButton />
          {activeBurgerMenu && (
            <BurgerMenu handleActiveBurgerMenu={handleActiveBurgerMenu} />
          )}
          <Header
            activeBurgerMenu={activeBurgerMenu}
            handleActiveBurgerMenu={handleActiveBurgerMenu}
          />

          <div className="mx-auto flex max-w-5xl flex-col gap-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/games/:id" element={<GameGeneralMenu />} />
              <Route path="/games/reviews/:id" element={<GameReviewsMenu />} />

              <Route
                path="/games/screenshots/:id"
                element={<GameImagesMenu />}
              />
              <Route path="/games/videos/:id" element={<GameVideosMenu />} />
            </Routes>

            <Footer />
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
