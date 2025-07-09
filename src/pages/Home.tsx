import { LatestReleasesSection } from "@/components/homepage/LatestReleasesSection";
import { BestGamesSection } from "@/components/homepage/BestGamesSection";
import { LatestReviewsSection } from "@/components/homepage/LatestReviewsSection";

export const Home = (): JSX.Element => {
  return (
    <>
      <h1 className="mt-4 px-4 text-center text-3xl font-bold text-customWhite">
        La plateforme de tests 100% gamers
      </h1>
      <LatestReleasesSection />
      <BestGamesSection />
      <LatestReviewsSection />
    </>
  );
};
