import { Header } from "@/components/layout/Header";
import { Home } from "@/pages/Home";
import { Footer } from "@/components/layout/Footer";
import { GameGeneralMenu } from "@/pages/GameGeneralMenu";
import { GameReviewsMenu } from "@/pages/GameReviewsMenu";
import { GameImagesMenu } from "@/pages/GameImagesMenu";
import { GameVideosMenu } from "@/pages/GameVideosMenu";
import { useEffect, useState } from "react";
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
import { About } from "@/pages/About";
import { TUser } from "@/types/user";
import { DashboardBack } from "@/pages/admin/DashboardBack";
import { ReviewListBack } from "@/pages/admin/ReviewListBack";
import { UserListBack } from "@/pages/admin/UserListBack";
import axios from "axios";
import { PageNotFound } from "./components/layout/PageNotFound";

const App = (): JSX.Element => {
  const [activeBurgerMenu, setActiveBurgerMenu] = useState(false);
  const [user, setUser] = useState<TUser | null>(null);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [alertModalCreatedReview, setAlertModalCreatedReview] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  // recupere le user authentifié dès que le composant se monte
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${apiUrl}/profile`, {
          withCredentials: true, // permet au navigateur d'envoyer le cookie HttpOnly au serveur
        });

        setUser(res.data.user);
      } catch (error) {
        setUser(null);
      }
    };

    fetchProfile();
  }, []);

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
            user={user}
            setUser={setUser}
          />

          <div className="mx-auto flex max-w-5xl flex-col gap-6">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    alertModalCreatedReview={alertModalCreatedReview}
                    setAlertModalCreatedReview={setAlertModalCreatedReview}
                  />
                }
              />
              <Route path="/jeux" element={<Games />} />
              <Route path="/jeux/sorties" element={<NewGames />} />
              <Route path="/tests" element={<Reviews />} />
              <Route
                path="/creation/test/:id"
                element={
                  <ReviewForm
                    user={user}
                    csrfToken={csrfToken}
                    setAlertModalCreatedReview={setAlertModalCreatedReview}
                  />
                }
              />
              <Route path="/jeu/:id" element={<GameGeneralMenu />} />
              <Route path="/jeu/tests/:id" element={<GameReviewsMenu />} />

              <Route path="/jeu/images/:id" element={<GameImagesMenu />} />
              <Route path="/jeu/videos/:id" element={<GameVideosMenu />} />
              <Route
                path="/test/:gameSlug/:userName"
                element={<Review userRole={user?.role} />}
              />
              <Route
                path="/inscription"
                element={
                  <SignIn
                    setUser={setUser}
                    user={user}
                    setCsrfToken={setCsrfToken}
                  />
                }
              />
              <Route
                path="/connexion"
                element={
                  <Login
                    setUser={setUser}
                    user={user}
                    setCsrfToken={setCsrfToken}
                  />
                }
              />
              <Route path="/mention-legales" element={<LegalMention />} />
              <Route
                path="/politique-de-confidentialite"
                element={<PrivacyPolicy />}
              />
              <Route
                path="/conditions-generales-utilisation"
                element={<GeneralConditionsOfUse />}
              />

              <Route path="/a-propos" element={<About />} />

              <Route
                path="/back"
                element={<DashboardBack userRole={user?.role} />}
              />

              <Route
                path="/back/utilisateurs"
                element={<UserListBack userRole={user?.role} />}
              />
              <Route
                path="/back/tests"
                element={<ReviewListBack userRole={user?.role} />}
              />
              {/* 404 fallback */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>

            <Footer />
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
