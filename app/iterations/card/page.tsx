import { redirect } from "next/navigation";

/** Card iterations live on the shared board. */
export default function CardIterationsRedirect() {
  redirect("/iterations");
}
