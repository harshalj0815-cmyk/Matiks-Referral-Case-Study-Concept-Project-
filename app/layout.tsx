import "./globals.css";
import { Figtree } from "next/font/google";
import ScrollSync from "@/components/ScrollSync";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-figtree",
});

export const metadata = {
  title: "Matiks referral · case study",
  description:
    "A 20-25-year-old habitual Matiks user struggles with getting friends to try the game and creating a tracked referral.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${figtree.variable} ${figtree.className}`}>
      <body>
        <ScrollSync />
        {children}
      </body>
    </html>
  );
}
