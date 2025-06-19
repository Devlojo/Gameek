import { LatestReleasesSection } from "@/components/homepage/LatestReleasesSection";
import { BestGamesSection } from "@/components/homepage/BestGamesSection";
import { LatestReviewsSection } from "@/components/homepage/LatestReviewsSection";

const Home = (): JSX.Element => {
  return (
    <>
      <h1 className="px-4 text-center text-3xl font-bold text-customWhite">
        Gameek - Tests et critiques de jeux vidéo
      </h1>
      <LatestReleasesSection />
      <BestGamesSection />
      <LatestReviewsSection />
    </>
  );
};

export default Home;
