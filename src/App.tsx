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
import { DashboardBack } from "@/pages/admin/DashboardBack";
import { ReviewListBack } from "@/pages/admin/ReviewListBack";
import { ProfileBack } from "@/pages/admin/ProfileBack";
import { UserListBack } from "@/pages/admin/UserListBack";
import { PageNotFound } from "@/components/layout/PageNotFound";
import { useUser } from "@/hooks/useUser";
import { useNotificationsSocket } from "@/hooks/useNotificationsSocket";
import { NotificationAlert } from "@/components/ui/NotificationAlert";
import { TNotification } from "./types/notification";
import { useNotificationCount } from "@/hooks/useNotificationCount";
import { Notifications } from "@/pages/Notifications";
import { UserActivity } from "@/pages/UserActivity";
import { Profile } from "@/pages/Profile";
import { EditProfile } from "@/pages/EditProfile";
import { EditReview } from "@/pages/EditReview";
import { ReportedComments } from "@/pages/admin/ReportedComments";
import { socket } from "./socket";

const App = (): JSX.Element => {
  const [activeBurgerMenu, setActiveBurgerMenu] = useState(false);
  const [alertModalCreatedReview, setAlertModalCreatedReview] = useState(false);

  const { loading, user } = useUser();
  const [notif, setNotif] = useState<TNotification | null>(null);
  const { setNotifCount } = useNotificationCount();

  useEffect(() => {
    if (!user?.id) return;
    setNotifCount(0); // reset quand user change
    socket.emit("register", user.id);
  }, [user?.id]);

  useNotificationsSocket(user?.id as number, (newNotif: TNotification) => {
    setNotif(newNotif);
  });

  const handleActiveBurgerMenu = () => {
    setActiveBurgerMenu((prev) => !prev);
  };

  useEffect(() => {
    if (!notif) return;
    const timer = setTimeout(() => setNotif(null), 5000);
    return () => clearTimeout(timer);
  }, [notif]);

  // Si le menu burger est activé, alors le scroll est désactivé
  if (activeBurgerMenu) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  if (loading) return <p></p>;

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
          {notif && <NotificationAlert setNotif={setNotif} notif={notif} />}

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
                    setAlertModalCreatedReview={setAlertModalCreatedReview}
                  />
                }
              />
              <Route
                path="/modification-du-test/:gameSlug/:userName"
                element={<EditReview />}
              />
              <Route path="/jeu/:id" element={<GameGeneralMenu />} />
              <Route path="/jeu/tests/:id" element={<GameReviewsMenu />} />

              <Route path="/jeu/images/:id" element={<GameImagesMenu />} />
              <Route path="/jeu/videos/:id" element={<GameVideosMenu />} />
              <Route path="/test/:gameSlug/:userName" element={<Review />} />
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

              <Route path="/mon-activite" element={<UserActivity />} />
              <Route path="/mon-profil" element={<Profile />} />
              <Route path="/modification-du-compte" element={<EditProfile />} />

              <Route path="/a-propos" element={<About />} />
              <Route path="/notifications" element={<Notifications />} />

              <Route path="/back" element={<DashboardBack />} />

              <Route path="/back/utilisateurs" element={<UserListBack />} />
              <Route path="/back/tests" element={<ReviewListBack />} />
              <Route path="/back/profil/:username" element={<ProfileBack />} />
              <Route path="/back/commentaires" element={<ReportedComments />} />
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
