import { LatestReleasesSection } from "@/components/homepage/LatestReleasesSection";
import { BestGamesSection } from "@/components/homepage/BestGamesSection";
import { LatestReviewsSection } from "@/components/homepage/LatestReviewsSection";

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
