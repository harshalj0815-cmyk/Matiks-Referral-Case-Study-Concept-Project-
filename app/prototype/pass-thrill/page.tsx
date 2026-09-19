import IPhoneFrame from "@/components/prototype/IPhoneFrame";
import PuzzleCompletionScreen from "@/components/prototype/screens/PuzzleCompletionScreen";

/** Same flow as /prototype/puzzle-completion: completion first, invite slides up after 3s. */
export default function PassThrillPage() {
  return (
    <IPhoneFrame>
      <PuzzleCompletionScreen />
    </IPhoneFrame>
  );
}
