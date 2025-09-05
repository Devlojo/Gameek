import { LatestReleasesSection } from "@/components/homepage/LatestReleasesSection";
import { BestGamesSection } from "@/components/homepage/BestGamesSection";
import { LatestReviewsSection } from "@/components/homepage/LatestReviewsSection";
import { AlertModalReview } from "@/components/ui/AlertModalReview";

type THomeProps = {
  alertModalCreatedReview: boolean;
  setAlertModalCreatedReview: React.Dispatch<React.SetStateAction<boolean>>;
};
export const Home = ({
  alertModalCreatedReview,
  setAlertModalCreatedReview,
}: THomeProps): JSX.Element => {
  return (
    <>
      <h1 className="mx-4 mt-4 text-center text-3xl font-bold text-customWhite">
        La plateforme de tests 100% gamers
      </h1>
      {alertModalCreatedReview && (
        <AlertModalReview
          title="En attente de validation"
          description="Ton test a bien été créé ! Il sera visible dès qu’un modérateur l’aura validé."
          buttonLabel="J'ai compris"
          setAlertModalCreatedReview={setAlertModalCreatedReview}
        />
      )}
      <LatestReleasesSection />
      <BestGamesSection />
      <LatestReviewsSection />
    </>
  );
};
