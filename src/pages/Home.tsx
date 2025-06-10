import { LatestReleasesSection } from "../components/LatestReleasesSection";
import { BestGamesSection } from "../components/BestGamesSection";
import { LatestReviewsSection } from "../components/LatestReviewsSection";

const Home = (): JSX.Element => {
  return (
    <>
      <LatestReleasesSection />
      <BestGamesSection />
      <LatestReviewsSection />
    </>
  );
};

export default Home;
