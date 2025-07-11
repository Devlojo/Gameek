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
import { SignIn } from "./pages/SignIn";
import { Login } from "./pages/Login";
import { Review } from "./pages/Review";
import { AutoScrollToTop } from "@/components/layout/AutoScrollToTop";
import { Games } from "@/pages/Games";

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
        <div className="min-h-screen bg-global">
          <AutoScrollToTop />
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
              <Route path="/games" element={<Games />} />
              <Route path="/games/:id" element={<GameGeneralMenu />} />
              <Route path="/games/reviews/:id" element={<GameReviewsMenu />} />

              <Route
                path="/games/screenshots/:id"
                element={<GameImagesMenu />}
              />
              <Route path="/games/videos/:id" element={<GameVideosMenu />} />
              <Route path="/review/:id/:userName" element={<Review />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/login" element={<Login />} />
            </Routes>

            <Footer />
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
