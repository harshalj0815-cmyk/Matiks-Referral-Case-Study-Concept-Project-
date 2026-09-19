import IPhoneFrame from "@/components/prototype/IPhoneFrame";
import TrackReferralScreen from "@/components/prototype/screens/TrackReferralScreen";

type PageProps = {
  searchParams?: Promise<{ empty?: string }>;
};

export default async function TrackReferralPage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : {};
  const empty = params.empty === "1" || params.empty === "true";

  return (
    <IPhoneFrame>
      <TrackReferralScreen empty={empty} />
    </IPhoneFrame>
  );
}
