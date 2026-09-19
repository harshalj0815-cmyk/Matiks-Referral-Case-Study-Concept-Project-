import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Matiks prototype · Puzzle Completion",
  description:
    "Puzzle Complete screen with invite slide-up after 3 seconds.",
};

export default function PassThrillLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
