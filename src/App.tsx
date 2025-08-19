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
import { NewGames } from "@/pages/NewGames";
import { Reviews } from "@/pages/Reviews";
import { ReviewForm } from "@/pages/ReviewForm";
import { LegalMention } from "@/pages/LegalMention";
import { PrivacyPolicy } from "@/pages/PrivacyPolicy";
import { GeneralConditionsOfUse } from "@/pages/GeneralConditionsOfUse";
import { Contact } from "@/pages/Contact";
import { About } from "@/pages/About";

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
              <Route path="/jeux" element={<Games />} />
              <Route path="/jeux/sorties" element={<NewGames />} />
              <Route path="/tests" element={<Reviews />} />
              <Route path="/creation/test/:id" element={<ReviewForm />} />
              <Route path="/jeu/:id" element={<GameGeneralMenu />} />
              <Route path="/jeu/tests/:id" element={<GameReviewsMenu />} />

              <Route path="/jeu/images/:id" element={<GameImagesMenu />} />
              <Route path="/jeu/videos/:id" element={<GameVideosMenu />} />
              <Route path="/test/:id/:userName" element={<Review />} />
              <Route path="/inscription" element={<SignIn />} />
              <Route path="/connexion" element={<Login />} />
              <Route path="/mention-legales" element={<LegalMention />} />
              <Route
                path="/politique-de-confidentialite"
                element={<PrivacyPolicy />}
              />
              <Route
                path="/conditions-generales-utilisation"
                element={<GeneralConditionsOfUse />}
              />
              <Route path="/contact" element={<Contact />} />
              <Route path="/a-propos" element={<About />} />
            </Routes>

            <Footer />
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
